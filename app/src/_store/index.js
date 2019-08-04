import Vue from 'vue';
import Vuex from 'vuex';

import { alert } from './alert.module';
import { account } from './account.module';
import { users } from './users.module';
import { dialogs } from './dialogs.module';
import { channel } from './channel.module';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    alert,
    account,
    users,
    dialogs,
    channel
  }
});

export default store;