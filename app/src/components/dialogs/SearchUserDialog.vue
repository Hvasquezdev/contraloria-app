<template>
  <base-dialog @closeDialog="closeDialog">
    <!--Title-->
    <div class="flex justify-between items-center pb-4">
      <p class="text-2xl font-bold">Busca un usuario para chatear</p>
    </div>

    <!--Body-->
    <div class="flex flex-wrap -mx-3">
      <div class="w-full px-3">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-left" for="channelName">
          Nombre de usuario
        </label>
        <input 
          class="shadow appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
          id="userName" 
          type="text" 
          placeholder="Nombre de usuario"
          v-model.trim="userName"
          @keyup.enter="searchUser"
          :disabled="searchingUser || userAdded"
        >
      </div>
    </div>

    <div class="w-full mb-4 searching-user__text" v-if="searchingUser">
      <div class="flex items-center uppercase text-gray-700 font-normal">
        Buscando: <strong class="font-bold mr-2 ml-1 capitalize">{{ userName }}</strong> 
        <the-loader></the-loader>
      </div>
    </div>

    <div class="w-full mb-4 mt-6" v-if="foundUserData && !searchingUser && !memberInChannel && !userAdded">
      <div class="flex items-center capitalize text-gray-700 found-user__text font-normal">
        Usuario: 
        <strong class="font-bold mr-2 ml-1 capitalize">
          <small>({{ searchedUsername }}): </small>
          {{ foundUserData.name }} {{ foundUserData.lastName }}
        </strong> 
        <check-icon></check-icon>
      </div>
    </div>

    <!-- <div
      class="flex flex-wrap -mx-3 mb-4 mt-4"
      v-if="foundUserData && !searchingUser"
    >
      <div class="w-full px-3">
        <label class="block tracking-wide text-gray-700 text-xs font-semibold uppercase mb-2 text-left" for="channelName">
          Escribe un mensaje para inciar una conversación
        </label>
        <input 
          class="shadow appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
          id="message" 
          type="text" 
          placeholder="Mensaje"
          v-model.trim="message"
          :disabled="searchingUser"
          @keyup.enter="startChat"
        >
      </div>
    </div> -->

    <div class="w-full mb-4 mt-6" v-if="!foundUserData && !searchingUser && searchedUsername && !memberInChannel && !userAdded">
      <div class="flex items-center capitalize text-gray-700 found-user__text font-normal">
        No se encontró: <strong class="font-bold mr-2 ml-1 capitalize">{{ searchedUsername }}</strong> 
        <cross-icon></cross-icon>
      </div>
    </div>

    <!--Footer-->
    <div class="flex justify-end pt-2" :class="{ 'mt-4': !searchingUser && !foundUserData }">
      <button 
        class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mr-2"
        :class="{ 'disabled-button': searchingUser || userAdded }"
        @click="closeDialog" 
      >
        Cancelar
      </button>
      <button 
        class="shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" 
        :class="{ 'mr-2': foundUserData && !searchingUser, 'disabled-button': searchingUser || userAdded }"
        @click="searchUser" 
      >
        <span>Buscar</span>
      </button>
      <button 
        class="shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
        v-if="foundUserData && !searchingUser"
        @click="startChat"
      >
        Iniciar conversación
      </button>
    </div>
  </base-dialog>
</template>

<script>
import { mapActions } from 'vuex';
import BaseDialog from '@/components/base-components/BaseDialog.vue';
import TheLoader from '@/components/TheLoader.vue';
import CheckIcon from '@/components/CheckIcon.vue';
import CrossIcon from '@/components/CrossIcon.vue';

export default {
  props: {
    messagesList: {
      type: Array,
      default: () => []
    },
    user: {
      type: Object,
      default: () => {}
    }
  },
  name: 'add-member-modal',
  components: {
    BaseDialog,
    TheLoader,
    CheckIcon,
    CrossIcon
  },
  data() {
    return {
      userName: null,
      errors: null,
      foundUserData: null,
      searchedUsername: null,
      memberInChannel: false,
      userAdded: false,
      message: null
    }
  },
  methods: {
    ...mapActions('users', ['getByUserName']),
    closeDialog() {
      this.$store.dispatch('dialogs/toggleSearchUserDialog', false)
    },
    searchUser() {
      if(this.searchingUser || this.userAdded) return;
      const userName = this.userName.toLowerCase();
      this.searchedUsername = null;
      this.message = null;

      if(userName) {
        this.errors = null;
        this.foundUserData = null;
        this.memberInChannel = false;

        this.getByUserName(userName)
          .then((user) => {
            this.searchedUsername = userName;
            this.foundUserData = user[0] || false;
          })
          .catch(error => console.log(error));
      } else {
        this.errors = 'Por favor ingrese un nombre de usuario'
      }
    },
    startChat() {
      const data = {
        author: this.user.data.id,
        destinationId: this.foundUserData.id,
        message: this.message,
        name: this.foundUserData.name,
        lastName: this.foundUserData.lastName,
        userName: this.foundUserData.userName
      };

      this.$store.dispatch('message/startDirectMessage', data);
    }
  },
  computed: {
    searchingUser() {
      return this.$store.state.users.user.getting || false;
    },
    inChannel() {
      return this.$store.state.channel.inChannel;
    },
  },
}
</script>

<style lang="scss">
.found-user__text,
.searching-user__text {
  font-size: 16px;
}
.disabled-button {
  opacity: 0.65; 
  cursor: not-allowed;
}
</style>