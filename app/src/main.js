import Vue from 'vue';
import App from './App.vue';
import { router } from './_helpers';
import store from './_store';
import '@/assets/scss/tailwind.scss';
import VueParticles from 'vue-particles';
import VueSocketIO from 'vue-socket-io';
import vClickOutside from 'v-click-outside';
import Vuelidate from 'vuelidate';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(Vuelidate);
Vue.use(VueSocketIO, 'http://localhost:3001');
Vue.use(VueParticles);

Vue.config.productionTip = false;
Vue.use(vClickOutside);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
