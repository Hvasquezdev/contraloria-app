<template>
  <default-layout class="home-page">
    <main class="w-full">
      <div class="border-t-2 border-gray-300">
          <div class="container mx-auto py-6 pt-20">
              <div class="flex mt-6">
                  <div class="w-1/2 bg-grey flex items-center justify-center">
                    <img :src="require('@/assets/logo-contraloria.png')" alt="Logo contraloria">
                  </div>
                  <div class="w-1/2">
                      <h1 class="text-5xl font-bold">Envia y recibe información</h1>
                      <p class="text-gray-700 py-4 text-lg leading-normal font-serif">Lorem ipsum dolor sit amet, consectetur adipisicing elit. A accusamus accusantium consequatur cumque ea error esse, est id illo nemo nostrum obcaecati odio pariatur perferendis porro quo quos ut velit.</p>
                      <div class="block flex py-4 mr-6">
                          <input class="w-2/3 py-6 px-4 mr-2 border border-gray-400 rounded text-gray-700 text-sm" type="text" placeholder="Nombre de usuario" />
                          <button class="w-1/3 font-sans py-4 px-4 border-transparent bg-green-500 text-white rounded uppercase font-bold text-sm">Registrarse</button>
                      </div>
                      <span class="text-sm text-medium text-gray-700 leading-normal">¿Ya tienes una cuenta? <a href="#" class="text-blue-600 hover:text-blue-700">Inicia Sesion</a>.</span>
                  </div>
              </div>
          </div>
      </div>
    </main>
  </default-layout>
</template>

<script>
import DefaultLayout from '@/layouts/Default.vue';

export default {
  name: 'home',
  components: {
    DefaultLayout
  }
}
</script>
