<template>
  <div class="font-sans antialiased h-screen flex" v-if="user">
    <!-- Sidebar / channel list -->
    <chat-sidebar 
      :user="user" 
      :channels="channel_list" 
      @setChannelMessages="setChannelMessages"
      v-if="channel_list && user"
    ></chat-sidebar>

    <!-- Dialog / New Channel Form -->
    <new-channel-dialog v-if="showNewChannelDialog"></new-channel-dialog>

    <!-- Dialog / New Channel Member Form -->
    <add-member-dialog v-if="showNewMemberDialog"></add-member-dialog>

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
            fullName="Ronaldo Cardenas"
            userName="ronaldo2019"
            :messageText="message.message_text[0].content || message.text.content"
            :messageDate="message.message_text[0].date_message || new Date().toLocaleString()"
          ></message-component>
        </template>

      </div>

      <div class="pb-6 px-6 flex-none">
        <div class="flex rounded-lg border-2 border-gray-600 overflow-hidden">
          <span class="text-3xl text-green-900 border-r-2 border-gray-600 p-2 cursor-pointer">
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
          <input type="text" class="w-full px-4 text-gray-900" placeholder="Escribe tu mensaje" v-model="messageText" @keyup.enter="sendMessage" />
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
const AddMemberDialog = () => import('@/components/dialogs/AddMemberDialog.vue');
const MessageComponent = () => import('@/components/chat/Message.vue');

export default {
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.user = JSON.parse(localStorage.getItem('user'));
    });
  },
  name: 'chat-page',
  mounted() {
    this.$store.dispatch('channel/getChannelsByUser', 1)
      .then(channels => {
        this.$store.dispatch('channel/getChannelsDataByUser', channels)
          .then(() => {
            const channels = this.$store.state.channel.userChannels;
            this.channel_list = channels;
          });
      });
    this.$socket.on('sentMessageToChannel', (message) => {
      if(message.destinationId === this.inChannel.channelId) {
        const messageData = {
          userId: message.userId,
          destinationId: message.destinationId,
          hasMedia: message.hasMedia,
          hasText: message.hasText,
          message_text: [
            {
              channel_message_id: message.text.channel_message_id,
              content: message.text.content
            }
          ]
        };

        this.channel_messages.push(messageData);
      }
    })
  },
  components: {
    ChatNavbar,
    ChatSidebar,
    ChannelUsersList,
    NewChannelDialog,
    AddMemberDialog,
    MessageComponent
  },
  data() {
    return {
      user: null,
      channel_list: null,
      channel_messages: [],
      messageText: null,
    }
  },
  methods: {
    setChannelMessages(messages) {
      this.channel_messages = messages;
    },
    sendMessage() {
      if(!this.inChannel) return;

      const message = {
        userId: this.user.data.id,
        destinationId: this.inChannel.channelId,
        hasMedia: 0,
        hasText: 1,
        media: {},
        text: {
          content: this.messageText,
        }
      };

      this.$store.dispatch('message/sendMessageToChannel', message)
        .then(() => {
          this.messageText = null;
        });
    }
  },
  computed: {
    showNewChannelDialog() {
      return this.$store.state.dialogs.isOpen.newChannel
    },
    showNewMemberDialog() {
      return this.$store.state.dialogs.isOpen.newChannelMember
    },
    inChannel() {
      return this.$store.state.channel.inChannel;
    }
  },
};
</script>

<style>
.message-container {
  border-bottom: 1px solid #3636362b;
}
</style>
