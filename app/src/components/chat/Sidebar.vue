<template>
  <div>
    <div class="sidebar-overlay" v-if="showSidebar"></div>
    <div
      class="sidebar-container text-purple-lighter flex-none w-64 pb-6 block"
      :class="{ 'sidebar-is-open': showSidebar }"
      v-click-outside="onClickOutside"
    >
      <div class="text-white mb-4 px-4 pb-4 flex justify-between user-data__container">
        <div class="flex-auto">
          <h1
            class="font-semibold text-xl leading-tight mb-1 truncate capitalize"
          >{{ user.data.name }} {{ user.data.lastName }}</h1>
          <div class="flex items-center">
            <span class="text-white opacity-50 text-sm">@{{ user.data.userName }}</span>
          </div>
        </div>
        <div class="flex flex-col h-full">
          <font-awesome-icon
            :icon="signOutIcon"
            class="sign-out-icon"
            @click="logOut"
          />
          <font-awesome-icon
            :icon="userEditIcon"
            class="user-edit-icon cursor-pointer"
            @click="openEditUserDialog"
          />
        </div>
      </div>
      <div class="mb-8">
        <div class="px-4 mb-2 text-white flex justify-between items-center">
          <div class="opacity-75 font-semibold">Canales Privados</div>
          <div
            class="add-channel-btn"
            @click="openNewChannelDialog"
            v-if="user.rol.name !== 'user'"
          >
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
          <div
            class="pt-1 pb-2 px-4 text-white cursor-pointer opacity-75 hover:bg-blue-900 channel-link private-channel-link relative"
            :class="{ 'active-channel': inChannel && inChannel.channelId === channel.channelId }"
            v-for="(channel, index) in privateChannels"
            :key="index"
            @click="setSelectedChannel(channel)"
          >
            {{ channel.channel_data[0].name }}
          </div>
        </template>
        <template v-else>
          <div class="py-1 px-4 text-white text-sm">No estas en ningun canal privado</div>
        </template>
      </div>
      <div class="mb-8">
        <div class="px-4 mb-2 text-white flex justify-between items-center">
          <div class="opacity-75 font-semibold">Canales Publicos</div>
          <div
            class="add-channel-btn"
            @click="openNewChannelDialog"
            v-if="user.rol.name !== 'user'"
          >
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
          >{{ channel.channel_data[0].name }}</div>
        </template>
        <template v-else>
          <div class="py-1 px-4 text-white text-sm">No estas en ningun canal publico</div>
        </template>
      </div>
      <div class="mb-8">
        <div class="px-4 mb-2 text-white flex justify-between items-center">
          <div class="opacity-75">Mensajes directos</div>
          <div
            class="add-channel-btn"
            @click="openSearchUserDialog"
          >
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
        <template v-if="directMessages.length > 0">
          <div
            class="pt-1 pb-2 px-4 text-white cursor-pointer opacity-50 channel-link capitalize"
            :class="{ 'active-channel': inInbox && inInbox.id === message.id }"
            v-for="(message, index) in directMessages"
            :key="index"
            @click="setSelectedInbox(message)"
          >{{ message.name }} {{ message.lastName }}</div>
        </template>
        <template v-else>
          <div class="py-1 px-4 text-white text-sm">No tienes mensajes privados</div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import vClickOutside from 'v-click-outside';
import { faSignOutAlt, faUserEdit } from '@fortawesome/free-solid-svg-icons';

export default {
  name: "chat-sidebar",
  props: {
    user: {
      type: Object,
      required: true
    },
    channels: {
      type: Array,
      required: true
    },
    directMessages: {
      type: [Array, Object],
      required: true
    },
    showSidebar: {
      type: Boolean,
      default: false
    }
  },
  directives: {
    clickOutside: vClickOutside.directive
  },
  mounted() {
    this.getPublicChannels();
    this.getPrivateChannels();
    this.$socket.on("reloadSidebar", member => {
      const channelFound = this.$store.state.channel.channelFound;

      const dataToPush = {
        channelId: channelFound[0].id,
        channel_data: [channelFound[0]],
        memberId: member.memberId
      };

      if (channelFound[0].type === "privado") {
        this.privateChannels.push(dataToPush);
      } else {
        this.publicChannels.push(dataToPush);
      }
    });

    this.$socket.on("startedInbox", data => {
      const inboxData = this.getParsedData(data);
      
      this.directMessages.push(inboxData);
      this.setSelectedInbox(inboxData);
      this.$store.dispatch('dialogs/toggleSearchUserDialog', false);
    });

    this.$socket.on('deletedChannel', channel => {
      console.log(channel)

      if(channel[0].type === 'public') {
        const channelToDelete = this.publicChannels.find((item) => {
          return item.channelId === channel[0].id;
        });
        const channelIndex = this.channels.indexOf(channelToDelete);

        this.channels.splice(channelIndex, 1);
        this.setSelectedInbox(null);
        this.setSelectedChannel(null);
      } else {
        const channelToDelete = this.privateChannels.find((item) => {
          return item.channelId === channel[0].id;
        });
        const channelIndex = this.channels.indexOf(channelToDelete);

        this.channels.splice(channelIndex, 1);
        this.setSelectedInbox(null);
        this.setSelectedChannel(null);
      }
    });
  },
  data() {
    return {
      publicChannels: [],
      privateChannels: []
    };
  },
  watch: {
    channels() {
      this.getPrivateChannels();
      this.getPublicChannels();
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch("account/logout");
    },
    openNewChannelDialog() {
      this.$store.dispatch("dialogs/toggleNewChannelDialog", true);
    },
    openEditUserDialog() {
      this.$store.dispatch("dialogs/toggleEditUserDialog", true);
    },
    openSearchUserDialog() {
      this.$store.dispatch("dialogs/toggleSearchUserDialog", true);
    },
    prueba() {
      this.privateChannels.push({ channel_data: [{ name: "asdasd" }] });
    },
    setSelectedChannel(channel) {
      if (this.inChannel && channel.channelId === this.inChannel.channelId)
        return;

      this.$store.commit("message/resetCurrentPage");

      if (this.inInbox) {
        this.$store.dispatch("channel/setSelectedInbox", null);
        this.$emit("setDirectMessagesContent", []);
      }

      this.$store.dispatch("channel/setSelectedChannel", channel);
      this.getChannelMessages(channel.channelId);
    },
    setSelectedInbox(message) {
      if (this.inInbox && message.id === this.inInbox.id) return;

      if (this.inChannel) {
        this.$store.dispatch("channel/setSelectedChannel", null);
        this.$emit("setChannelMessages", []);
      }

      this.$store
        .dispatch("channel/setSelectedInbox", message)
        .then(() => {
          this.$store
            .dispatch("message/getDirectMessagesContent", message)
            .then(messages => {
              this.$emit("setDirectMessagesContent", messages);
            })
            .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
    },
    getChannelMessages(channelId, page = 0) {
      this.channelMessage = [];
      this.$store
        .dispatch("message/getMessagesByChannel", { channelId, page })
        .then(messages => {
          this.$emit("setChannelMessages", messages);
        })
        .catch(error => console.log(error));
    },
    getPublicChannels() {
      this.publicChannels =
        this.channels.filter(
          channel => channel.channel_data[0].type === "publico"
        ) || [];
    },
    getPrivateChannels() {
      this.privateChannels =
        this.channels.filter(
          channel => channel.channel_data[0].type === "privado"
        ) || [];
    },
    getScreenSize() {
      return window.innerWidth;
    },
    onClickOutside() {
      if(!this.showSidebar || this.getScreenSize() >= 1024) return;
      this.$emit('close-sidebar');
    },
    validateMessageData(data) {
      console.log(data);
      return data
    },
    getParsedData(data) {
      const inboxData = {
        destinationId: data.destination.id,
        userId: data.author.id,
        name: this.user.data.name === data.destination.name ? data.author.name : data.destination.name,
        lastName: this.user.data.lastName === data.destination.lastName ? data.author.lastName : data.destination.lastName,
        userName: this.user.data.userName === data.destination.userName ? data.author.userName : data.destination.userName,
        id: data.id,
        message: data.message
      };
      return inboxData;
    }
  },
  computed: {
    inChannel() {
      return this.$store.state.channel.inChannel;
    },
    inInbox() {
      return this.$store.state.channel.inInbox;
    },
    signOutIcon() {
      return faSignOutAlt;
    },
    userEditIcon() {
      return faUserEdit;
    }
  }
};
</script>

<style>
.sidebar-container {
  background-color: #073042;
  transition: all 0.3s;
  transform: translateX(-110%);
  top: 0;
  left: 0;
  bottom: 0;
  position: absolute;
  z-index: 99;
}
.sidebar-container.sidebar-is-open {
  transform: translateX(0);
  opacity: 1;
}
.sidebar-container .sign-out-icon {
  width: 20px;
  height: 20px;
  color: #f56565;
  margin-bottom: 10px;
  cursor: pointer;
}
.sidebar-overlay {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 95;
  background: #484848;
  opacity: .2;
}
.user-data__container {
  background: hsl(0, 0%, 14%);
  margin-top: 0;
  padding-top: 0.75rem;
  box-shadow: 0 6px 6px rgba(0, 0, 0, 0.16);
}
.add-channel-btn {
  cursor: pointer;
  padding: 0 10px;
}
.channel-link {
  transition: all 0.2s;
}
.channel-link.private-channel-link {
  padding-right: 50px;
}
.channel-link.private-channel-link .remove-channel-btn {
  position: absolute;
  right: 26px;
  top: 10px;
  transform: rotate(45deg);
  display: none;
}
.channel-link.private-channel-link:hover .remove-channel-btn {
  display: block;
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
@media screen and (min-width: 1024px) {
  .sidebar-container {
    position: relative !important;
    height: 100% !important;
    transform: translateX(0) !important;
  }
  .sidebar-overlay {
    display: none;
  }
}
</style>
