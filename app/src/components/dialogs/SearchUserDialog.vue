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

    <div class="w-full mb-4 mt-6" v-if="foundUserData && !searchingUser">
      <div class="flex items-center capitalize text-gray-700 found-user__text font-normal">
        Usuario: 
        <strong class="font-bold mr-2 ml-1 capitalize">
          <small>({{ searchedUsername }}): </small>
          {{ foundUserData.name }} {{ foundUserData.lastName }}
        </strong> 
        <check-icon></check-icon>
      </div>
    </div>

    <div class="w-full mb-4 mt-4" v-if="foundUserData && !searchingUser && hasActiveConversation">
      <div class="flex flex-col items-start capitalize text-gray-700 found-user__text font-normal">
        Ya estas en una conversacion con:
        <strong class="font-bold mr-2 ml-1 capitalize">
          ({{ searchedUsername }}): 
          {{ foundUserData.name }} {{ foundUserData.lastName }}
        </strong> 
      </div>
    </div>

    <div class="w-full mb-4 mt-6" v-if="!foundUserData && !searchingUser && searchedUsername">
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
        v-if="foundUserData && !searchingUser && !hasActiveConversation"
        @click="startChat"
      >
        Iniciar conversación
      </button>
    </div>
    <div
      class="flex justify-end pt-4"
      v-if="user.rol.name === 'admin' && (foundUserData && !searchingUser)"
    >
      <button 
        class="shadow bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded flex-1"
        :class="{ 'opacity-75 pointer-events-none': requestMessage }"
        v-if="foundUserData.status === 'active'"
        @click="editUserStatus('inactive')"
      >
        {{ requestMessage || 'Inhabilitar Usuario' }}
      </button>
      <button 
        class="shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded flex-1"
        :class="{ 'opacity-75 pointer-events-none': requestMessage }"
        v-else
        @click="editUserStatus('active')"
      >
        {{ requestMessage || 'Habilitar Usuario' }}
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
  name: 'search-user-modal',
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
      message: null,
      requestMessage: null
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
      if(!this.foundUserData || this.hasActiveConversation) return;

      const data = {
        author: {
          id: this.user.data.id,
          name: this.user.data.name,
          lastName: this.user.data.lastName,
          userName: this.user.data.userName
        },
        destination: {
          id: this.foundUserData.id,
          name: this.foundUserData.name,
          lastName: this.foundUserData.lastName,
          userName: this.foundUserData.userName
        },
        message: this.message
      };

      this.$store.dispatch('message/startDirectMessage', data);
    },
    editUserStatus(status) {
      if(this.requestMessage) return;
      const data = {
        userId: this.foundUserData.id,
        status
      };

      this.$store.dispatch('users/editUserStatus', data)
        .then((response) => {
          if(response.responseStatus == 200) {
            if(response.status === 'active') {
              this.requestMessage = 'Usuario habilitado';
            } else {
              this.requestMessage = 'Usuario inhabilitado';
            }
            setTimeout(() => {
              this.closeDialog();
            }, 1000);
          }
        })
        .catch((error) => console.log(error));
    }
  },
  computed: {
    searchingUser() {
      return this.$store.state.users.user.getting || false;
    },
    inChannel() {
      return this.$store.state.channel.inChannel;
    },
    hasActiveConversation() {
      if(!this.foundUserData) return false;

      const hasConversation = this.messagesList.find((message) => message.userName === this.foundUserData.userName) || null;
      if(hasConversation) {
        return true;
      } else {
        return false;
      }
    }
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