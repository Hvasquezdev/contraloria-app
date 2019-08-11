<template>
  <div class="text-purple-lighter flex-none w-64 pb-6 hidden md:block user-list__container">
    <div class="mb-4 px-4 pb-4 flex justify-center items-center user-list-title__container">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        width="24" 
        height="24"
        class="mr-2"
      >
        <path class="heroicon-ui" d="M9 12A5 5 0 1 1 9 2a5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm7 11a1 1 0 0 1-2 0v-2a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v2a1 1 0 0 1-2 0v-2a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v2zm1-5a1 1 0 0 1 0-2 5 5 0 0 1 5 5v2a1 1 0 0 1-2 0v-2a3 3 0 0 0-3-3zm-2-4a1 1 0 0 1 0-2 3 3 0 0 0 0-6 1 1 0 0 1 0-2 5 5 0 0 1 0 10z"/>
      </svg>
      <h1 class="font-bold text-xl text-center leading-tight truncate">
        Integrantes: <span v-if="channelMembersCount">{{ channelMembersCount }}</span>
      </h1>
    </div>
    <div class="mb-8">
      <template v-if="channelMembersCount > 0 && channelMembers && !loadingChannelMembers">
        <div 
          class="flex items-center py-1 px-4 mb-2 opacity-50 cursor-pointer hover:bg-grey-100 user-item__name" 
          v-for="(member, index) in channelMembers" 
          :key="index"
        >
          <span class="capitalize">{{ member.member_data[0].name }} {{ member.member_data[0].lastName }}</span>
        </div>
      </template>
      <div 
        class="flex items-center py-1 px-4 mb-2 opacity-50 cursor-pointer" 
        v-if="loadingChannelMembers"
      >
        <span>Cargando lista de usuarios</span>
      </div>
      <div 
        class="flex items-center py-1 px-4 mb-2 opacity-50 cursor-pointer" 
        v-if="channelMembersCount <= 0 || !channelMembers && !loadingChannelMembers"
      >
        <span>Selecciona un canal</span>
      </div>
      <div class="flex button-add-member items-center pb-2 pt-4 px-4 mb-2 opacity-50 cursor-pointer">
        <button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow w-full">
          Agregar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'chat-members-list',
  computed: {
    channelMembers() {
      return this.$store.state.channel.inChannelMembers;
    },
    channelMembersCount() {
      return this.$store.state.channel.inChannelMembers ? this.$store.state.channel.inChannelMembers.length : 0;
    },
    loadingChannelMembers() {
      return this.$store.state.channel.loadingChannelMembers;
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
</style>