<template>
  <default-layout class="login-page">
    <template v-if="step === 'one' && !isLoading">
      <h1 class="mb-6">
        Ingresa tu nombre de usuario
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
            >
          </div>
        </div>

        <div class="flex items-center justify-between">
          <button
            @click="getUser"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Enviar
          </button>
          <a
            @click="$router.push('/login')"
            class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 cursor-pointer"
          >
            Iniciar Sesión
          </a>
        </div>
        <p class="text-red-600 text-xs italic pt-6" v-if="this.errors">{{ errors }}</p>
      </div>
    </template>
    <template v-if="step === 'two' && !isLoading">
      <h1 class="mb-6 capitalize">
        Usuario: {{ questionContent.userName }}
      </h1>
      <div class="login-form-container">
        <p
          class="text-gray-700 text-left"
          :style="{ 'font-size': '18px' }"
        >
          <strong>Pregunta secreta:</strong> {{ questionContent.question }}
        </p>
        <div class="flex flex-wrap -mx-3 mt-4 mb-4">
          <div class="w-full px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-left" for="userName">
              Respuesta
            </label>
            <input 
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
              id="questionAnswer" 
              type="text" 
              v-model="answer"
              placeholder="Respuesta"
            >
          </div>
        </div>

        <div class="flex items-center justify-between">
          <button
            @click="recoveryPassword"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Enviar
          </button>
          <a
            class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 cursor-pointer"
          >
            Cancelar
          </a>
        </div>
      </div>
    </template>
    <template v-if="step === 'three' && !isLoading">
      <h1 class="mb-6 capitalize">
        Usuario: {{ recoveryContent.userName }}
      </h1>
      <div class="login-form-container">
        <p
          class="text-gray-700 text-left mb-4"
          :style="{ 'font-size': '18px' }"
        >
          <strong>Contraseña:</strong> {{ recoveryContent.password }}
        </p>

        <div class="flex items-center justify-between">
          <button
            @click="$router.push('/login')"
            class="bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Iniciar Sesión
          </button>
        </div>
      </div>
    </template>
    <template v-if="isLoading">
      <h1 class="mb-6">
        Verificando datos
      </h1>
      <div class="login-form-container">
        <the-loader></the-loader>
      </div>
    </template>
  </default-layout>
</template>

<script>
import DefaultLayout from "@/layouts/Default.vue";
import { required } from 'vuelidate/lib/validators';

export default {
  name: 'recovery-page',
  components: {
    DefaultLayout,
    TheLoader: () => import('@/components/TheLoader.vue')
  },
  data() {
    return {
      user: {
        userName: null,
      },
      errors: null,
      step: 'one',
      isLoading: false,
      questionContent: {},
      answer: null,
      recoveryContent: {}
    }
  },
  validations: {
    user: {
      userName: {
        required,
      }
    }
  },
  computed: {
    questionFetched() {
      return this.questionContent.hasOwnProperty('userName');
    },
    recoveryFetched() {
      return this.recoveryContent.hasOwnProperty('id');
    }
  },
  methods: {
    getUser() {
      if(!this.user.userName) return;

      this.toggleLoading(true);
      const url = `http://localhost:3001/user/${this.user.userName}/secret/question`
      console.log(url)
      fetch(url)
        .then(response => response.json())
        .then(data => {
          if(data.length > 0) {
            this.questionContent = data[0];
            this.step = 'two';
            setTimeout(() => {
              this.toggleLoading(false);
            }, 1000);
          }
        })
        .catch(error => console.log(error));
    },
    toggleLoading(value) {
      this.isLoading = value;
    },
    recoveryPassword() {
      if(!this.answer || !this.questionFetched) return;

      this.toggleLoading(true);
      const url = `http://localhost:3001/user/pass/recovery`;
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName: this.questionContent.userName, answer: this.answer })
      };
      fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => {
          if(data.length > 0) {
            this.recoveryContent = data[0];
            this.step = 'three';
            setTimeout(() => {
              this.toggleLoading(false);
            }, 1000);
          }
        })
        .catch(error => console.log(error));
    }
  }
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
