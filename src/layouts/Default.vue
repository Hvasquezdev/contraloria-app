<template>
  <div class="default-layout">
    <the-navbar />
    <slot></slot>
  </div>
</template>

<script>
import TheNavbar from '@/components/TheNavbar.vue';

export default {
  name: 'default-layout',
  components: {
    TheNavbar
  }
}
</script>
