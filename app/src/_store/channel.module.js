import { channelService } from '../_services';

const state = {
  status: {
    registering: false
  }
}

const mutations = {
  registerRequest(state) {
    state.status = { registering: true };
  },

  registerSuccess(state) {
    state.status = { registering: false };
  },

  registerFailure(state) {
    state.status = { registering: false };
  }
};

const actions = {
  register({ dispatch, commit }, channel) {
    commit('registerRequest', channel);
    console.log(channel)

    channelService.register(channel)
      .then((channel) => {
        commit('registerSuccess', channel);
        setTimeout(() => {
          dispatch('alert/success', 'Registration successful', { root: true });
        });
      },
      (error) => {
        commit('registerFailure', error);
        dispatch('alert/error', error, { root: true });
      });
  }
};

export const channel = {
  namespaced: true,
  state,
  actions,
  mutations,
};