<template>
  <div class="font-sans antialiased h-screen flex" v-if="user">
    <!-- Sidebar / channel list -->
    <chat-sidebar :user="user" :channels="channel_list" v-if="channel_list && user"></chat-sidebar>

    <!-- Dialog / New Channel Form -->
    <new-channel-dialog v-if="showNewChannelDialog"></new-channel-dialog>

    <!-- Chat content -->
    <div class="flex-1 flex flex-col bg-white overflow-hidden">
      <!-- Top bar -->
      <chat-navbar></chat-navbar>
      <!-- Chat messages -->
      <div class="px-6 py-4 flex-1 overflow-y-scroll">
        <!-- A message -->
        <div class="flex items-start mb-2 text-sm pb-2 message-container">
          <img
            src="https://colewest.com/wp-content/uploads/2016/12/user-placeholder.jpg"
            class="w-10 h-10 rounded mr-3"
          />
          <div class="flex-1 overflow-hidden">
            <div class="flex justify-between">
              <span class="font-bold">
                Hector Vasquez
                <span class="font-normal">
                  (hector398)
                </span>  
              </span>
              <span class="text-grey text-xs">11:46</span>
            </div>
            <p class="text-black leading-normal">mensaje de prueba asdasdas</p>
          </div>
        </div>
        <!-- A message -->
        <div class="flex items-start mb-2 text-sm pb-2 message-container">
          <img
            src="https://colewest.com/wp-content/uploads/2016/12/user-placeholder.jpg"
            class="w-10 h-10 rounded mr-3"
          />
          <div class="flex-1 overflow-hidden">
            <div class="flex justify-between">
              <span class="font-bold">
                Hector Vasquez
                <span class="font-normal">
                  (hector398)
                </span>  
              </span>
              <span class="text-grey text-xs">12:45</span>
            </div>
            <p
              class="text-black leading-normal"
            >Prueba prueba prueba</p>
          </div>
        </div>
        <!-- A message -->
        <div class="flex items-start mb-2 text-sm pb-2 message-container">
          <img
            src="https://colewest.com/wp-content/uploads/2016/12/user-placeholder.jpg"
            class="w-10 h-10 rounded mr-3"
          />
          <div class="flex-1 overflow-hidden">
            <div class="flex justify-between">
              <span class="font-bold">
                Ronaldo Cardenas
                <span class="font-normal">
                  (ronaldo2019)
                </span> 
              </span>
              <span class="text-grey text-xs">15:23</span>
            </div>
            <p class="text-black leading-normal">
              <a href="#" class="inline-block bg-blue-lightest text-blue no-underline"><strong>Hector398</strong></a> Probando mención de usuario
            </p>
          </div>
        </div>
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
          <input type="text" class="w-full px-4 text-gray-900" placeholder="Escribe tu mensaje" />
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
const NewChannelDialog = () => import('@/components/base-components/BaseDialog.vue');

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
  },
  components: {
    ChatNavbar,
    ChatSidebar,
    ChannelUsersList,
    NewChannelDialog
  },
  data() {
    return {
      user: null,
      channel_list: null,
    }
  },
  computed: {
    showNewChannelDialog() {
      return this.$store.state.dialogs.isOpen.newChannel
    }
  },
};
</script>

<style>
.message-container {
  border-bottom: 1px solid #3636362b;
}
</style>
