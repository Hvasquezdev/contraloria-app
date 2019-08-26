<template>
  <component :is="layout">
    <vue-particles
      v-if="$route.name !== 'chat'"
      color="#dedede"
      :particleOpacity="0.5"
      :particlesNumber="80"
      shapeType="circle"
      :particleSize="4"
      linesColor="#dedede"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="false"
      hoverMode="grab"
      :clickEffect="false"
      clickMode="repulse"
    >
    </vue-particles>
    <router-view/>
  </component>
</template>

<script>
export default {
  name: `App`,
  data() {
    return {
      layout: `div`,
    };
  },
};
</script>

<style lang="scss">
#particles-js {
  z-index: 5;
  width: 100%;
  height: 100vh;
}
.font-dark-blue {
  color: #073042;
}
</style>
