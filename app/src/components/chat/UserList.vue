<template>
  <div class="text-purple-lighter flex-none w-64 pb-6 hidden md:block user-list__container">
    <div class="mb-4 px-4 pb-4 flex justify-center items-center user-list-title__container font-dark-blue">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        width="24" 
        height="24"
        class="mr-2"
      >
        <path class="heroicon-ui" d="M9 12A5 5 0 1 1 9 2a5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm7 11a1 1 0 0 1-2 0v-2a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v2a1 1 0 0 1-2 0v-2a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v2zm1-5a1 1 0 0 1 0-2 5 5 0 0 1 5 5v2a1 1 0 0 1-2 0v-2a3 3 0 0 0-3-3zm-2-4a1 1 0 0 1 0-2 3 3 0 0 0 0-6 1 1 0 0 1 0-2 5 5 0 0 1 0 10z"/>
      </svg>
      <h1 class="font-bold text-xl text-center leading-tight truncate font-dark-blue">
        Integrantes: <span v-if="channelMembersCount && inChannel">{{ channelMembersCount }}</span>
      </h1>
    </div>
    <div class="mb-8">
      <template v-if="channelMembersCount > 0 && channelMembers && !loadingChannelMembers && inChannel">
        <div 
          class="flex items-center py-1 px-4 mb-2 opacity-50 cursor-pointer hover:bg-grey-100 user-item__name" 
          v-for="(member, index) in channelMembers" 
          :key="index"
        >
          <span class="capitalize">{{ member.member_data[0].name }} {{ member.member_data[0].lastName }}</span>
        </div>
      </template>
      <div 
        class="flex items-center py-1 px-4 mb-2 opacity-50 cursor-pointer justify-center" 
        v-if="loadingChannelMembers && inChannel"
      >
        <the-loader></the-loader>
      </div>
      <div 
        class="flex items-center py-1 px-4 mb-2 opacity-50 cursor-pointer justify-center" 
        v-if="channelMembersCount <= 0 || !channelMembers && !loadingChannelMembers || !inChannel"
      >
        <span>Selecciona un canal</span>
      </div>
      <div class="flex button-add-member items-center pb-2 pt-4 px-4 mb-2 opacity-50 cursor-pointer">
        <button 
          class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow w-full"
          :class="{ 'disabled-button': !inChannel || loggedUser && loggedUser.rol.name !== 'admin' }"
          @click="openNewChannelMemberDialog"
        >
          Agregar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
const TheLoader = () => import('@/components/TheLoader.vue');

export default {
  name: 'chat-members-list',
  components: {
    TheLoader,
  },
  mounted() {
    this.$socket.on('addedMemberToChannel', (member) => {
      if(member.channelId === this.inChannel.channelId) {
        const memberData = {
          memberId: member.memberId,
          member_data: [
            {
              name: member.member_data.name,
              lastName: member.member_data.lastName,
              userName: member.member_data.userName,
            }
          ]
        };

        this.channelMembers.push(memberData);
      }
    });
  },
  data() {
    return {
      channelMembers: null,
    }
  },
  watch: {
    'channelMembersList': function(value) {
      this.channelMembers = value;
    }
  },
  methods: {
    openNewChannelMemberDialog() {
      if(!this.inChannel || this.loggedUser && this.loggedUser.rol.name !== 'admin') return;
      this.$store.dispatch('dialogs/toggleNewChanneMemberlDialog', true);
    },
  },
  computed: {
    inChannel() {
      return this.$store.state.channel.inChannel;
    },
    channelMembersList() {
      return this.$store.state.channel.inChannelMembers;
    },
    channelMembersCount() {
      return this.$store.state.channel.inChannelMembers ? this.$store.state.channel.inChannelMembers.length : 0;
    },
    loadingChannelMembers() {
      return this.$store.state.channel.loadingChannelMembers;
    },
    loggedUser() {
      return JSON.parse(localStorage.getItem('user')) || null;
    }
  },
}
</script>

<style>
.user-list__container {
  border-left: 1px solid rgba(29,28,29,.13);
  color: rgb(29, 28, 29);
}
.user-list-title__container {
  background: #f8f8f8;
  margin-top: 0;
  color: rgb(29, 28, 29);
  padding-top: .75rem;
  border-bottom: 1px solid rgba(29,28,29,.13);
}
.user-list-title__container > h1 {
  line-height: 30px;
}
.channel-link:hover {
  opacity: 1;
  transition-duration: .2s;
}
.active-channel {
  opacity: 1;
  background-color: #2a4365;
}
.user-item__name {
  font-weight: 600;
}
.user-item__name:hover {
  background-color: #f8f9fa;
  opacity: .85;
}
.button-add-member {
  border-top: 1px solid rgba(29,28,29,.13);
}
.disabled-button {
  opacity: 0.65; 
  cursor: not-allowed;
}
</style>
