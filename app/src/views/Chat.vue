<template>
  <div class="font-sans antialiased h-screen flex" v-if="user">
    <!-- Sidebar / channel list -->
    <chat-sidebar 
      :user="user" 
      :channels="channel_list" 
      :directMessages="dMessagesList"
      :showSidebar="showSidebar"
      @setChannelMessages="setChannelMessages"
      @setDirectMessagesContent="setDirectMessagesContent"
      @close-sidebar="closeSidebar"
      v-if="channel_list && user"
    ></chat-sidebar>

    <!-- Dialog / New Channel Form -->
    <new-channel-dialog v-if="showNewChannelDialog"></new-channel-dialog>

    <!-- Dialog / New Channel Member Form -->
    <add-member-dialog v-if="showNewMemberDialog"></add-member-dialog>

    <!-- Dialog / Search Channel -->
    <search-channel-dialog v-if="showSearchChannelDialog"></search-channel-dialog>

    <!-- Dialog / Edit user info -->
    <edit-user-dialog v-if="showEditUserDialog"></edit-user-dialog>

    <!-- Dialog / Search user -->
    <search-user-dialog
      v-if="showSearchUserDialog"
      :messages-list="dMessagesList"
      :user="user"
    ></search-user-dialog>

    <!-- Dialog / Leave channel -->
    <leave-channel-dialog
      :leaveChannelData="leaveChannelData"
      v-if="showLeaveChannelDialog"
    ></leave-channel-dialog>

    <!-- Dialog / Upload File -->
    <upload-file-dialog
      v-model="messageText"
      v-if="showUploadFileDialog"
      @setMediaFile="setMediaFile"
      @sendMessage="sendMessage"
    ></upload-file-dialog>

    <!-- Chat content -->
    <div class="flex-1 flex flex-col bg-white overflow-hidden">

      <!-- Top bar -->
      <chat-navbar
        @open-sidebar="openSidebar"
      ></chat-navbar>

      <!-- Chat messages -->
      <div class="px-6 py-4 flex-1 overflow-y-scroll chat-messages--container flex flex-col">

      <button
        v-if="channel_messages.length > 0"
        class="bg-transparent hover:bg-blue-500 text-blue-700 ml-auto mr-auto mb-4 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        @click="loadMoreMessages"
      >
        Cargar mas mensajes
      </button>

        <!-- A message -->
        <template v-if="channel_messages.length > 0">
          <message-component
            v-for="message in channel_messages" :key="message.id"
            :fullName="`${message.name} ${message.lastName}`"
            :userName="message.userName"
            :messageText="message.content"
            :messageDate="message.date_message"
            :hasMedia="message.hasMedia"
            :hasText="message.hasText"
            :channelMessageId="message.id"
            messageType="channel"
          ></message-component>
        </template>

        <template v-if="dMessagesContent.length > 0">
          <message-component
            v-for="(message, index) in dMessagesContent" :key="index"
            :fullName="`${message.name} ${message.lastName}`"
            :userName="message.userName"
            :messageText="message.content"
            :hasMedia="message.hasMedia"
            :hasText="message.hasText"
            :messageDate="message.date_message"
            :messageContentId="message.id"
            messageType="inbox"
          ></message-component>
        </template>
      </div>

      <div class="pb-6 px-6 flex-none">
        <div class="flex rounded-lg border-1 border-dark-blue overflow-hidden">
          <span class="text-3xl text-green-900 border-r-1 border-dark-blue p-2 cursor-pointer" @click="openUploadFile">
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
          <input
            type="text"
            class="w-full px-4 font-dark-blue"
            placeholder="Escribe tu mensaje"
            v-model.trim="messageText"
            @keyup.enter="sendMessage"
          />
        </div>
      </div>
    </div>

    <channel-users-list
      :user="user"
      @setLeaveChannelDialogData="setLeaveChannelDialogData"
    ></channel-users-list>
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
const EditUserDialog = () => import('@/components/dialogs/EditUserDialog.vue');
const searchUserDialog = () => import('@/components/dialogs/SearchUserDialog.vue');
const LeaveChannelDialog = () => import('@/components/dialogs/LeaveChannelDialog.vue');
const UploadFileDialog = () => import('@/components/dialogs/UploadFileDialog.vue');

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
    this.listenSentMessageWithMedia();
    this.listenSentMessageMedia();
    this.listenSentDirectMessageEvent();
    this.listenSentDirectMessageWithMedia();
    this.listenSentDirectMessageMedia();
    this.listenLeaveChannelEvent();
  },
  components: {
    ChatNavbar,
    ChatSidebar,
    ChannelUsersList,
    NewChannelDialog,
    AddMemberDialog,
    MessageComponent,
    SearchChannelDialog,
    EditUserDialog,
    searchUserDialog,
    LeaveChannelDialog,
    UploadFileDialog
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
      direct_message_waiting: null,
      showSidebar: false,
      leaveChannelData: {}
    }
  },
  methods: {
    setChannelMessages(messages) {
      this.channel_messages = messages.reverse();
    },
    setMediaFile(file) {
      this.messageMedia = file;
    },
    sendMessage(messageFromModal) {
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
          content: this.messageText || messageFromModal,
        }
      };

      if(this.inInbox) {
        this.$store.dispatch('message/sendDirectMessage', message)
          .then(() => {
            this.messageText = null;
            this.messageMedia = null;
            if(this.showUploadFileDialog) {
              this.$store.dispatch('dialogs/toggleUploadFileDialog', false);
            }
          });
      } else {
        this.$store.dispatch('message/sendMessageToChannel', message)
          .then(() => {
            this.messageText = null;
            this.messageMedia = null;
            if(this.showUploadFileDialog) {
              this.$store.dispatch('dialogs/toggleUploadFileDialog', false);
            }
          });
      }
    },
    setDirectMessagesContent(messages) {
      this.dMessagesContent = messages;
    },
    openUploadFile() {
      if(!this.inChannel && !this.inInbox) return;
      this.$store.dispatch('dialogs/toggleUploadFileDialog', true);
    },
    loadMoreMessages() {
      this.$store.commit('message/setCurrentPage', 10);
      
      const currentPage = this.$store.state.message.currentPage;
      this.$store.dispatch('message/getMessagesByChannel', { channelId: this.inChannel.channelId, page: currentPage })
        .then((messages) => {
          const channelMessages = this.channel_messages;
          const newMessagesList = [...messages, ...channelMessages];
          this.channel_messages = newMessagesList;
        })
        .catch((error) => console.log(error))
    },
    listenSentMessageEvent() {
      this.$socket.on('sentMessageToChannel', (message) => {
        if(message.destinationId === this.inChannel.channelId) {
          const user = this.user;
          const messageData = this.setMessageData(user, message);

          this.channel_messages.push(messageData);
        }
      });
    },
    listenSentMessageWithMedia() {
      this.$socket.on('sentMessageToChannelWithMedia', (message) => {
        if(message.destinationId === this.inChannel.channelId) {
          const user = this.user;
          console.log(message);
          const messageData = this.setMessageData(user, message);

          this.channel_message_waiting = messageData;
        }
      });
    },
    listenSentMessageMedia() {
      this.$socket.on('sentMessageToChannelMedia', () => {
        this.messageText = null;
        this.messageMedia = null;
        this.channel_messages.push(this.channel_message_waiting);
      });
    },
    listenSentDirectMessageEvent() {
      this.$socket.on('sentDirectMessage', (message) => {
        if(message.destinationId === this.inInbox.id) {
          const user = this.user;
          const messageData = this.setMessageData(user, message);

          this.dMessagesContent.push(messageData);
        }
      });
    },
    listenSentDirectMessageWithMedia() {
      this.$socket.on('sentDirectMessageWithMedia', (message) => {
        if(message.destinationId === this.inInbox.id) {
          const user = this.user;
          const messageData = this.setMessageData(user, message);

          this.direct_message_waiting = messageData;
        }
      });
    },
    listenSentDirectMessageMedia() {
      this.$socket.on('sentDirectMessageMedia', () => {
        this.messageText = null;
        this.messageMedia = null;
        this.dMessagesContent.push(this.direct_message_waiting);
      });
    },
    listenLeaveChannelEvent() {
      this.$socket.on('leavedChannel', (data) => {
        if(this.user.data.id === data.memberId) {
          const channelToLeave = this.channel_list.find((channel) => channel.channelId === data.channelId);
          const channelToLeaveIndex = this.channel_list.indexOf(channelToLeave);

          this.channel_list.splice(channelToLeaveIndex, 1);
          this.channel_messages = [];
          this.$store.dispatch("channel/setSelectedChannel", null);
        }
        return;
      });
    },
    setMessageData(user, message) {
      return {
        id: message.insertId,
        name: user.data.name,
        lastName: user.data.lastName,
        userName: user.data.userName,
        content: message.text.content,
        hasText: message.hasText,
        hasMedia: message.hasMedia,
        date_message: new Date().toLocaleDateString()
      };
    },
    openSidebar() {
      this.showSidebar = true;
    },
    closeSidebar() {
      this.showSidebar = false;
    },
    setLeaveChannelDialogData(data) {
      this.leaveChannelData = data;
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
    showEditUserDialog() {
      return this.$store.state.dialogs.isOpen.editUser;
    },
    showSearchUserDialog() {
      return this.$store.state.dialogs.isOpen.searchUser;
    },
    showLeaveChannelDialog() {
      return this.$store.state.dialogs.isOpen.leaveChannel;
    },
    showUploadFileDialog() {
      return this.$store.state.dialogs.isOpen.uploadFile;
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
