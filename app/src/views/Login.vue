<template>
  <default-layout class="login-page">
    <h1 class="mb-6">
      Ingresa tus datos para iniciar sesion
    </h1>
    <div class="login-form-container">
      <div class="flex flex-wrap -mx-3 mb-4">
        <div class="w-full px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-left" for="userName">
            Nombre de usuario
          </label>
          <input 
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
            id="userName" 
            type="text" 
            v-model="user.userName"
            placeholder="Nombre de usuario"
            @keyup.enter="handleSubmit"
          >
        </div>
      </div>

      <div class="flex flex-wrap -mx-3 mb-4">
        <div class="w-full px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-left" for="grid-password">
            Password
          </label>
          <input 
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
            id="grid-password" 
            type="password" 
            v-model="user.password"
            placeholder="******************"
            @keyup.enter="handleSubmit"
          >
        </div>
      </div>

      <div class="flex items-center justify-between">
        <button 
          @click="handleSubmit" 
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          :class="{ 'is-disabled': isCheckingUser }"
          type="button"
        >
          Iniciar Sesion
        </button>
        <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#" :class="{ 'is-disabled': isCheckingUser }">
          ¿Olvidaste tu contraseña?
        </a>
      </div>
      <p class="text-red-600 text-xs italic pt-6" v-if="this.errors">{{ errors }}</p>
    </div>
  </default-layout>
</template>

<script>
import DefaultLayout from "@/layouts/Default.vue";
import { mapActions } from 'vuex';

export default {
  name: 'login-page',
  components: {
    DefaultLayout
  },
  data() {
    return {
      user: {
        userName: null,
        password: null,
      },
      errors: null,
    }
  },
  methods: {
    ...mapActions('account', ['login']),
    handleSubmit() {
      if(this.isCheckingUser) return;
      const { userName, password } = this.user;
      if(userName && password) {
        this.errors = null;
        this.login({ userName, password })
          .then((response) => {
            if(response.status && response.status === 401) {
              this.errors = response.message;
            } else {
              this.errors = null;
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.errors = 'Por favor rellene todos los campos'
      }
    }
  },
  computed: {
    isCheckingUser() {
      return this.$store.state.account.status.checkingUser || false;
    }
  },
};
</script>

<style lang="scss">
.login-page {
  height: 100vh;
  background-color: #f8f8f8;

  .login-form-container {
    width: 100%;
    max-width: 450px;
    background: #fff;
    border-radius: 14px;
    border: 1px solid #ddd;
    padding: 32px;
    box-shadow: 0 4px 6px -1px rgba(0,0,0,.1),0 2px 4px -1px rgba(0,0,0,.06);
  }
}

.is-disabled {
  opacity: .8;
  pointer-events: none;
  user-select: none;
}
</style>
