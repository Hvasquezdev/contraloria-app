<template>
  <header class="w-full font-sans">
    <nav class="container mx-auto flex items-center justify-between flex-wrap py-3">
      <div class="flex items-center flex-no-shrink text-white mr-6">
        <h1 class="text-black text-2xl p-2 align-middle font-sans relative pl-8">
          <router-link to="/" tag="a" class="no-underline text-black flex items-center">
            <span class="pl-1">Contraloria del Municipio Heres</span>
          </router-link>
        </h1>
      </div>
      <div class="block lg:hidden">
        <button
          class="flex items-center px-3 py-2 border rounded text-grey-dark border-grey-darker hover:text-grey hover:border-grey-dark"
        >
          <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div class="w-full block text-right flex-grow lg:flex lg:items-center lg:w-auto">
        <ul class="flex lg:flex-grow justify-end items-baseline">
          <li class="mr-3">
            <router-link
              tag="a"
              to="/login"
              class="inline-block bg-white hover:bg-gray-100 text-gray-800 font-semibold px-4 py-2 border border-gray-400 rounded"
            >Iniciar Sesion</router-link>
          </li>
          <li class="mr-3">
            <router-link
              tag="a"
              to="/register"
              class="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded"
            >Registrarse</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'the-navbar',
}
</script>


<style lang="scss">
header {
  background: #fff;
}
</style>
