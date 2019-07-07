<template>
  <default-layout class="register-page">
    <div class="register-form-container">
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="userName">
            Nombre de usuario
          </label>
          <input 
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
            id="userName" 
            type="text" 
            v-model="user.userName"
            placeholder="Nombre de usuario"
          >
          <p class="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
        </div>
      </div>

      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label for="name" class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Nombre
          </label>
          <input 
            type="text" 
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="name"
            v-model="user.name"
            placeholder="Nombre"  
          >
          <p class="text-red-500 text-xs italic">
            Please fill out this field
          </p>
        </div>
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label for="lastName" class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Apellido
          </label>
          <input 
            type="text" 
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="lastName"
            v-model="user.lastName"
            placeholder="Apellido"  
          >
          <p class="text-red-500 text-xs italic">
            Please fill out this field
          </p>
        </div>
      </div>

      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
            Password
          </label>
          <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="******************">
          <p class="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
        </div>
      </div>

      <div class="flex items-center justify-between">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
          Registrarse
        </button>
        <div class="inline-block align-baseline text-sm">
          ¿Ya tienes una cuenta?
          <router-link to="/login" tag="a" class="font-bold text-blue-500 hover:text-blue-800">Inicia Sesion</router-link>
        </div>
      </div>
    </div>
  </default-layout>
</template>

<script>
import DefaultLayout from "@/layouts/Default.vue";

export default {
  name: 'register-page',
  components: {
    DefaultLayout
  },
  data() {
    return {
      user: {
        name: null,
        lastName: null,
        userName: null,
        password: null,
      }
    }
  },
};
</script>

<style lang="scss">
.register-page {
  height: 100vh;
  background-color: #f8f8f8;

  .register-form-container {
    max-width: 650px;
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
