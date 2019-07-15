<template>
  <div class="bg-indigo-900 text-purple-lighter flex-none w-64 pb-6 hidden md:block">
    <div class="text-white mb-2 mt-3 px-4 flex justify-between">
      <div class="flex-auto">
        <h1 class="font-semibold text-xl leading-tight mb-1 truncate capitalize">{{ user.data.name }} {{ user.data.lastName }}</h1>
        <div class="flex items-center mb-6">
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
        <div class="opacity-75">Departamentos</div>
        <div>
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
      <div class="bg-teal-dark py-1 px-4 text-white"># Nombre dep</div>
    </div>
    <div class="mb-8">
      <div class="px-4 mb-2 text-white flex justify-between items-center">
        <div class="opacity-75">Canales</div>
        <div>
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
      <div class="bg-teal-dark py-1 px-4 text-white"># Nombre Canal</div>
    </div>
    <div class="mb-8">
      <div class="px-4 mb-2 text-white flex justify-between items-center">
        <div class="opacity-75">Mensajes directos</div>
        <div>
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
      <div class="flex items-center mb-3 px-4">
        <span class="bg-green-500 rounded-full block w-2 h-2 mr-2"></span>
        <span class="text-white opacity-75">
          Hector Vasquez
          <span class="text-grey text-sm">(Tu)</span>
        </span>
      </div>
      <div class="flex items-center px-4 mb-6 opacity-50">
        <span class="border border-white rounded-full w-2 h-2 mr-2"></span>
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
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('account/logout');
    }
  },
}
</script>