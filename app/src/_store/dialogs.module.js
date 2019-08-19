const state = {
  isOpen: {
    newChannel: false,
    newChannelMember: false
  }
};

const mutations = {
  toggleNewChannelDialog(state, value) {
    state.isOpen.newChannel = value;
  },
  toggleNewChanneMemberlDialog(state, value) {
    state.isOpen.newChannelMember = value;
  },
};

const actions = {
  toggleNewChannelDialog({ commit }, value) {
    commit('toggleNewChannelDialog', value);
  },
  toggleNewChanneMemberlDialog({ commit }, value) {
    commit('toggleNewChanneMemberlDialog', value);
  },
};

export const dialogs = {
  namespaced: true,
  state,
  mutations,
  actions
};