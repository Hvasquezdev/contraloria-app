<template>
  <div class="border-b flex px-6 py-2 items-center flex-none">
    <div class="flex flex-col">
      <h3
        @click="openSidebar"
        class="mb-1 font-extrabold capitalize font-dark-blue cursor-pointer"
        v-if="inChannel"
      >
        #{{ inChannel.channel_data[0].name }}
      </h3>
      <h3
        @click="openSidebar"
        class="mb-1 font-extrabold capitalize font-dark-blue cursor-pointer"
        v-else-if="inChannelInbox"
      >
        #{{ inChannelInbox.name }} {{ inChannelInbox.lastName }}
      </h3>
      <h3
        @click="openSidebar"
        class="mb-1 font-extrabold font-dark-blue cursor-pointer"
        v-else
      >
        #Selecciona un canal
      </h3>
      <transition name="fade">
        <div
          class="text-sm truncate user-added-text"
          v-if="userAdded"
        >
          <strong class="capitalize">{{ userAdded }}</strong> fue agregado al canal
        </div>
      </transition>
    </div>
    <div class="ml-auto hidden md:block">
      <div class="relative flex items-center">
        <input
          type="search"
          placeholder="Buscar canal"
          class="appearance-none border border-grey rounded-lg pl-8 pr-4 py-2"
          v-model="channelName"
          @keyup.enter="searchChannel"
        />
        <div class="absolute pin-y pin-l pl-3 flex items-center justify-center">
          <svg
            class="fill-current text-gray-600 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 22 20"
          >
            <path
              d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'chat-navbar',
  data() {
    return {
      userAdded: null,
      channelName: null,
    }
  },
  mounted() {
    this.$socket.on('addedMemberToChannel', (member) => {
      if(this.inChannel !== null) {
        if(member.channelId === this.inChannel.channelId) {
          const fullName = `${member.member_data.name} ${member.member_data.lastName}`;
  
          this.userAdded = fullName;
  
          setTimeout(() => {
            this.userAdded = null;
          }, 5000);
        }
      } 
    });
  },
  computed: {
    inChannel() {
      return this.$store.state.channel.inChannel;
    },
    inChannelInbox() {
      return this.$store.state.channel.inInbox;
    }
  },
  methods: {
    searchChannel() {
      this.$store.dispatch('channel/searchChannelByName', this.channelName)
        .then(() => {
          this.$store.dispatch('dialogs/toggleSearchChannelDialog', true);
          this.channelName = null;
        })
    },
    openSidebar() {
      this.$emit('open-sidebar');
    }
  },
}
</script>

<style lang="css" scoped>
.user-added-text {
  background: #3ddc84;
  padding: 0 12px;
  border-radius: 14px;
  color: #fff;
}
.fade-enter-active, .fade-leave-active {
  transition: all .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translate(-100%);
}
</style>