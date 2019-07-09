<template>
  <default-layout class="login-page">
    <div class="login-form-container">
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="userName">
            Nombre de usuario
          </label>
          <input 
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
            id="userName" 
            type="text" 
            v-model="user.username"
            placeholder="Nombre de usuario"
            @keyup.enter="handleSubmit"
          >
          <p class="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
        </div>
      </div>

      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
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
          <p class="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
        </div>
      </div>

      <div class="flex items-center justify-between">
        <button @click="handleSubmit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
          Iniciar Sesion
        </button>
        <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
          ¿Olvidaste tu contraseña?
        </a>
      </div>
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
        username: null,
        password: null,
      }
    }
  },
  methods: {
    ...mapActions('account', ['login']),
    handleSubmit() {
      const { username, password } = this.user;
      if(username && password) {
        this.login({ username, password });
      }
    }
  },
};
</script>

<style lang="scss">
.login-page {
  height: 100vh;
  background-color: #f8f8f8;

  .login-form-container {
    max-width: 450px;
    margin: auto;
    margin-top: 50px;
    background: #fff;
    border-radius: 14px;
    border: 1px solid #ddd;
    padding: 32px;
    box-shadow: 0 4px 6px -1px rgba(0,0,0,.1),0 2px 4px -1px rgba(0,0,0,.06);
  }
}
</style>
