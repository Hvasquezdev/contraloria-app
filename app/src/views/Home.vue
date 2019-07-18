<template>
  <default-layout class="home-page">
    <h1 class="mb-4">
      Contraloria Municipal de Heres <br>
      <strong>Intranet</strong>
    </h1>
    <p>
      <router-link to="/login" tag="a" class="btn btn-primary btn-outline-white px-5 py-3">Iniciar Sesion</router-link>
    </p>
  </default-layout>
</template>

<script>
import DefaultLayout from "@/layouts/Default.vue";

export default {
  name: "home",
  components: {
    DefaultLayout
  },
};
</script>
