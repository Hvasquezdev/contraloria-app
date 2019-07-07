import Vue from 'vue';
import App from './App.vue';
import { router } from './_helpers';
import store from './store';
import '@/assets/scss/tailwind.scss';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
