<template>
  <div class="font-sans antialiased h-screen flex" v-if="user">
    <!-- Sidebar / channel list -->
    <chat-sidebar 
      :user="user" 
      :channels="channel_list" 
      :directMessages="dMessagesList"
      @setChannelMessages="setChannelMessages"
      @setDirectMessagesContent="setDirectMessagesContent"
      v-if="channel_list && user"
    ></chat-sidebar>

    <!-- Dialog / New Channel Form -->
    <new-channel-dialog v-if="showNewChannelDialog"></new-channel-dialog>

    <!-- Dialog / New Channel Member Form -->
    <add-member-dialog v-if="showNewMemberDialog"></add-member-dialog>

    <!-- Dialog / Search Channel -->
    <search-channel-dialog v-if="showSearchChannelDialog"></search-channel-dialog>

    <!-- Chat content -->
    <div class="flex-1 flex flex-col bg-white overflow-hidden">

      <!-- Top bar -->
      <chat-navbar></chat-navbar>

      <!-- Chat messages -->
      <div class="px-6 py-4 flex-1 overflow-y-scroll">

        <!-- A message -->
        <template v-if="channel_messages.length > 0">
          <message-component
            v-for="(message, index) in channel_messages" :key="index"
            :fullName="`${message.name} ${message.lastName}`"
            :userName="message.userName"
            :messageText="message.content"
            :messageDate="message.date_message"
          ></message-component>
        </template>

        <template v-if="dMessagesContent.length > 0">
          <message-component
            v-for="(message, index) in dMessagesContent" :key="index"
            :fullName="`${message.name} ${message.lastName}`"
            :userName="message.userName"
            :messageText="message.content"
            :messageDate="message.date_message"
          ></message-component>
        </template>
      </div>

      <div class="pb-6 px-6 flex-none">
        <div class="flex rounded-lg border-1 border-dark-blue overflow-hidden">
          <span class="text-3xl text-green-900 border-r-1 border-dark-blue p-2 cursor-pointer" @click="$refs.file.click()">
            <svg
              class="fill-current h-6 w-6 block"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M16 10c0 .553-.048 1-.601 1H11v4.399c0 .552-.447.601-1 .601-.553 0-1-.049-1-.601V11H4.601C4.049 11 4 10.553 4 10c0-.553.049-1 .601-1H9V4.601C9 4.048 9.447 4 10 4c.553 0 1 .048 1 .601V9h4.399c.553 0 .601.447.601 1z"
              />
            </svg>
          </span>
          <input type="file" ref="file" class="hidden" @change="setMedia" />
          <input type="text" class="w-full px-4 font-dark-blue" placeholder="Escribe tu mensaje" v-model="messageText" @keyup.enter="sendMessage" />
        </div>
      </div>
    </div>

    <channel-users-list></channel-users-list>
  </div>
</template>

<script>
const ChatNavbar = () => import('@/components/chat/Navbar.vue');
const ChatSidebar = () => import('@/components/chat/Sidebar.vue');
const ChannelUsersList = () => import('@/components/chat/UserList.vue');
const NewChannelDialog = () => import('@/components/dialogs/NewChannelDialog.vue');
const MessageComponent = () => import('@/components/chat/Message.vue');
const AddMemberDialog = () => import('@/components/dialogs/AddMemberDialog.vue');
const SearchChannelDialog = () => import('@/components/dialogs/SearchChannelDialog.vue');

export default {
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.user = JSON.parse(localStorage.getItem('user'));
    });
  },
  name: 'chat-page',
  mounted() {
    const user = JSON.parse(localStorage.getItem('user'));
    this.$store.dispatch('channel/getChannelsByUser', user.data.id)
      .then(channels => {
        this.$store.dispatch('channel/getChannelsDataByUser', channels)
          .then(() => {
            const channels = this.$store.state.channel.userChannels;
            this.channel_list = channels;
          });
      });

    this.$store.dispatch('message/getDirectMessagesByUser', user.data.id)
      .then(messages => {
        this.dMessagesList = messages;
      })
      .catch(error => {
        console.log(error);
      });

    this.listenSentMessageEvent();
    this.listenSentDirectMessageEvent();
    this.listenSentMessageWithMedia();
    this.listenSentMessageMedia();
  },
  components: {
    ChatNavbar,
    ChatSidebar,
    ChannelUsersList,
    NewChannelDialog,
    AddMemberDialog,
    MessageComponent,
    SearchChannelDialog
  },
  data() {
    return {
      user: null,
      channel_list: null,
      channel_messages: [],
      messageText: null,
      messageMedia: null,
      dMessagesList: null,
      dMessagesContent: [],
      channel_message_waiting: null,
    }
  },
  methods: {
    setChannelMessages(messages) {
      this.channel_messages = messages;
    },
    sendMessage() {
      if(!this.inChannel && !this.inInbox) return;

      const destinationId = this.inChannel ? this.inChannel.channelId : this.inInbox.id;
      const hasMedia = this.messageMedia ? 1 : 0;
      const message = {
        userId: this.user.data.id,
        destinationId: destinationId,
        hasMedia,
        hasText: 1,
        media: this.messageMedia,
        text: {
          content: this.messageText,
        }
      };

      if(this.inInbox) {
        this.$store.dispatch('message/sendDirectMessage', message)
          .then(() => {
            this.messageText = null;
          });
      } else {
        this.$store.dispatch('message/sendMessageToChannel', message)
          .then(() => {
            this.messageText = null;
          });
      }

    },
    setDirectMessagesContent(messages) {
      this.dMessagesContent = messages;
    },
    setMedia(e) {
      this.messageMedia = e.target.files[0];
    },
    listenSentMessageEvent() {
      this.$socket.on('sentMessageToChannel', (message) => {
        if(message.destinationId === this.inChannel.channelId) {
          const user = this.user;
          const messageData = {
            name: user.data.name,
            lastName: user.data.lastName,
            userName: user.data.userName,
            content: message.text.content,
            date_message: new Date().toLocaleDateString()
          };

          this.channel_messages.push(messageData);
        }
      });
    },
    listenSentDirectMessageEvent() {
      this.$socket.on('sentDirectMessage', (message) => {
        if(message.destinationId === this.inInbox.id) {
          const user = this.user;
          const messageData = {
            name: user.data.name,
            lastName: user.data.lastName,
            userName: user.data.userName,
            content: message.text.content,
            date_message: new Date().toLocaleDateString()
          };

          this.dMessagesContent.push(messageData);
        }
      });
    },
    listenSentMessageWithMedia() {
      this.$socket.on('sentMessageToChannelWithMedia', (message) => {
        if(message.destinationId === this.inChannel.channelId) {
          const user = this.user;
          const messageData = {
            name: user.data.name,
            lastName: user.data.lastName,
            userName: user.data.userName,
            content: message.text.content,
            date_message: new Date().toLocaleDateString()
          };

          this.channel_message_waiting = messageData;
        }
      });
    },
    listenSentMessageMedia() {
      this.$socket.on('sentMessageToChannelMedia', (message) => {
        console.log(message);
        this.channel_messages.push(this.channel_message_waiting);
      });
    }
  },
  computed: {
    showNewChannelDialog() {
      return this.$store.state.dialogs.isOpen.newChannel;
    },
    showNewMemberDialog() {
      return this.$store.state.dialogs.isOpen.newChannelMember;
    },
    showSearchChannelDialog() {
      return this.$store.state.dialogs.isOpen.searchChannel;
    },
    inChannel() {
      return this.$store.state.channel.inChannel;
    },
    inInbox() {
      return this.$store.state.channel.inInbox;
    }
  },
};
</script>

<style>
.message-container {
  border-bottom: 1px solid #3636362b;
}
.border-dark-blue {
  border-color: #073042;
}
.border-1 {
  border-width: 1px;
}
.border-r-1 {
  border-right-width: 1px;
}
</style>
