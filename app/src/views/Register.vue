<template>
  <default-layout class="register-page">
    <h1 class="mb-6">
      Registrate para ingresar a la intranet
    </h1>
    <div class="register-form-container">
      <div class="flex flex-wrap -mx-3 mb-4">
        <div class="w-full px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-left" for="userName">
            Nombre de usuario
          </label>
          <input 
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
            id="userName" 
            type="text" 
            v-model.trim="user.userName"
            @keyup.enter="handleSubmit"
            placeholder="Nombre de usuario"
          >
        </div>
      </div>

      <div class="flex flex-wrap -mx-3 mb-4">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label for="name" class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-left">
            Nombre
          </label>
          <input 
            type="text" 
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="name"
            v-model.trim="user.name"
            @keyup.enter="handleSubmit"
            placeholder="Nombre"  
          >
        </div>
        <div class="w-full md:w-1/2 px-3 mb-4 md:mb-0">
          <label for="lastName" class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-left">
            Apellido
          </label>
          <input 
            type="text" 
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="lastName"
            v-model.trim="user.lastName"
            @keyup.enter="handleSubmit"
            placeholder="Apellido"  
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
            v-model.trim="user.password"
            @keyup.enter="handleSubmit"
            placeholder="******************"
          >
        </div>
      </div>

      <div class="flex items-center justify-between">
        <button 
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
          :class="{ 'is-disabled': isCheckingUser || isInvalid }"
          type="button" 
          @click="handleSubmit"
        >
          Registrarse
        </button>
        <div class="inline-block align-baseline text-sm" :class="{ 'is-disabled': isCheckingUser }">
          ¿Ya tienes una cuenta?
          <router-link to="/login" tag="a" class="font-bold text-blue-500 hover:text-blue-800">Inicia Sesion</router-link>
        </div>
      </div>
      <p class="text-red-600 text-xs italic pt-6" v-if="this.errors">{{ errors }}</p>
    </div>
  </default-layout>
</template>

<script>
import DefaultLayout from "@/layouts/Default.vue";
import { mapActions } from 'vuex';
import { required, alphaNum, minLength } from 'vuelidate/lib/validators';

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
      },
      errors: null
    }
  },
  validations: {
    user: {
      userName: {
        required,
        alphaNum,
        minLength: minLength(5)
      },
      name: {
        required,
        alphaNum
      },
      lastName: {
        required,
        alphaNum
      },
      password: {
        required,
        alphaNum,
        minLength: minLength(8)
      }
    }
  },
  methods: {
    ...mapActions('account', ['register']),
    handleSubmit() {
      if(this.isCheckingUser || this.isInvalid) return;
      const userData = {
        name: this.user.name,
        lastName: this.user.lastName,
        userName: this.user.userName,
        password: this.user.password
      };

      if(this.user.name && this.user.lastName && this.user.userName && this.user.password) {
        this.errors = null;
        this.register(userData)
          .then((response) => {
            if(response.error && response.status === 409) {
              this.errors = response.message;
            } else {
              this.errors = null;
            }
          });
      } else {
        this.errors = 'Por favor rellene todos los campos'
      }
    }
  },
  computed: {
    isCheckingUser() {
      return this.$store.state.account.status.checkingUser || false;
    },
    isInvalid() {
      return this.$v.user.userName.$invalid || this.$v.user.password.$invalid || this.$v.user.name.$invalid || this.$v.user.lastName.$invalid;
    }
  },
};
</script>

<style lang="scss">
.register-page {
  height: 100vh;
  background-color: #f8f8f8;

  .register-form-container {
    width: 100%;
    max-width: 650px;
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
