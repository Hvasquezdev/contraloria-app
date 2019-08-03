const state = {
  isOpen: {
    newChannel: false,
  }
};

const mutations = {
  toggleNewChannelDialog(state, value) {
    state.isOpen.newChannel = value;
  },
};

const actions = {
  toggleNewChannelDialog({ commit }, value) {
    commit('toggleNewChannelDialog', value);
  }
};

export const dialogs = {
  namespaced: true,
  state,
  mutations,
  actions
};