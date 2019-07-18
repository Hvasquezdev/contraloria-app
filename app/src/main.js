import Vue from 'vue';
import App from './App.vue';
import { router } from './_helpers';
import store from './_store';
import '@/assets/scss/tailwind.scss';
import VueParticles from 'vue-particles';

Vue.use(VueParticles);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
