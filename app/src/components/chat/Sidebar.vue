<template>
  <div class="sidebar-container text-purple-lighter flex-none w-64 pb-6 hidden md:block">
    <div class="text-white mb-4 px-4 pb-4 flex justify-between user-data__container">
      <div class="flex-auto">
        <h1 class="font-semibold text-xl leading-tight mb-1 truncate capitalize">{{ user.data.name }} {{ user.data.lastName }}</h1>
        <div class="flex items-center">
          <span class="text-white opacity-50 text-sm">@{{ user.data.userName }}</span>
        </div>
      </div>
      <div>
        <svg
          class="fill-current h-6 w-6 opacity-50 cursor-pointer"
          @click="logOut"
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 20 20"
        >
          <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zM11.4 10l2.83-2.83-1.41-1.41L10 8.59 7.17 5.76 5.76 7.17 8.59 10l-2.83 2.83 1.41 1.41L10 11.41l2.83 2.83 1.41-1.41L11.41 10z"/>
        </svg>
      </div>
    </div>
    <div class="mb-8">
      <div class="px-4 mb-2 text-white flex justify-between items-center">
        <div class="opacity-75 font-semibold">Canales Privados</div>
        <div class="add-channel-btn" @click="openNewChannelDialog">
          <svg
            class="fill-current h-4 w-4 opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M11 9h4v2h-4v4H9v-4H5V9h4V5h2v4zm-1 11a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"
            />
          </svg>
        </div>
      </div>
      <template v-if="privateChannels.length > 0">
        <div class="pt-1 pb-2 px-4 text-white cursor-pointer opacity-75 hover:bg-blue-900 channel-link" v-for="(channel, index) in privateChannels" :key="index">
          {{ channel.channel_data[0].name }}
        </div>
      </template>
      <template v-else>
        <div class="py-1 px-4 text-white text-sm">
          No estas en ningun canal privado
        </div>
      </template>
    </div>
    <div class="mb-8">
      <div class="px-4 mb-2 text-white flex justify-between items-center">
        <div class="opacity-75 font-semibold">Canales Publicos</div>
        <div class="add-channel-btn" @click="openNewChannelDialog">
          <svg
            class="fill-current h-4 w-4 opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M11 9h4v2h-4v4H9v-4H5V9h4V5h2v4zm-1 11a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"
            />
          </svg>
        </div>
      </div>
      <template v-if="publicChannels.length > 0">
        <div 
          class="pt-1 pb-2 px-4 text-white cursor-pointer opacity-75 channel-link capitalize"
          :class="{ 'active-channel': inChannel && inChannel.channelId === channel.channelId }"
          v-for="(channel, index) in publicChannels" 
          :key="index"
          @click="setSelectedChannel(channel)"
        >
          {{ channel.channel_data[0].name }}
        </div>
      </template>
      <template v-else>
        <div class="py-1 px-4 text-white text-sm">
          No estas en ningun canal publico
        </div>
      </template>
    </div>
    <div class="mb-8">
      <div class="px-4 mb-2 text-white flex justify-between items-center">
        <div class="opacity-75">Mensajes directos</div>
        <div class="add-channel-btn">
          <svg
            class="fill-current h-4 w-4 opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M11 9h4v2h-4v4H9v-4H5V9h4V5h2v4zm-1 11a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"
            />
          </svg>
        </div>
      </div>
      <div class="flex items-center px-4 mb-6 opacity-50">
        <span class="text-white">Ronaldo Cardenas</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'chat-sidebar',
  props: {
    user: {
      type: Object,
      required: true
    },
    channels: {
      type: Array,
      required: true
    }
  },
  mounted() {
    this.getPublicChannels();
    this.getPrivateChannels();
    this.$socket.on('reloadSidebar', (member) => {
      const channelFound = this.$store.state.channel.channelFound;

      const dataToPush = {
        channelId: channelFound[0].id,
        channel_data: [
          channelFound[0],
        ],
        memberId: member.memberId,
      }

      if(channelFound[0].type === 'privado') {
        this.privateChannels.push(dataToPush);
      } else {
        this.publicChannels.push(dataToPush);
      }
    });
  },
  data() {
    return {
      publicChannels: [],
      privateChannels: [],
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('account/logout');
    },
    openNewChannelDialog() {
      this.$store.dispatch('dialogs/toggleNewChannelDialog', true);
    },
    prueba() {
      this.privateChannels.push({ channel_data: [ {name: 'asdasd'} ] })
    },
    setSelectedChannel(channel) {
      if(this.inChannel && channel.channelId === this.inChannel.channelId) return;

      this.$store.dispatch('channel/setSelectedChannel', channel);
      this.getChannelMessages(channel.channelId);
    },
    getChannelMessages(channelId) {
      this.channelMessage = [];
      this.$store.dispatch('message/getMessagesByChannel', channelId)
        .then(messages => {
          this.$emit('setChannelMessages', messages);
        })
        .catch((error) => console.log(error));
    },
    getPublicChannels() {
      this.publicChannels = this.channels.filter(channel => channel.channel_data[0].type === 'publico') || [];
    },
    getPrivateChannels() {
      this.privateChannels = this.channels.filter(channel => channel.channel_data[0].type === 'privado') || [];
    }
  },
  computed: {
    inChannel() {
      return this.$store.state.channel.inChannel;
    }
  },
}
</script>

<style>
.sidebar-container {
  background-color: #073042;
}
.user-data__container {
  background: hsl(0, 0%, 14%);
  margin-top: 0;
  padding-top: .75rem;
  box-shadow: 0 6px 6px rgba(0,0,0,.16);
}
.add-channel-btn {
  cursor: pointer;
  padding: 0 10px;
}
.channel-link {
  transition: all .2s;
}
.channel-link:hover {
  opacity: 1;
  background: #3ddc84;
  font-weight: 600;
}
.active-channel {
  opacity: 1;
  background: #3ddc84;
  font-weight: 600;
}
</style>
