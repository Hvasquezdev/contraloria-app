const state = {
  isOpen: {
    newChannel: false,
    newChannelMember: false,
    searchChannel: false,
    editUser: false
  }
};

const mutations = {
  toggleNewChannelDialog(state, value) {
    state.isOpen.newChannel = value;
  },
  toggleNewChanneMemberlDialog(state, value) {
    state.isOpen.newChannelMember = value;
  },
  toggleSearchChannelDialog(state, value) {
    state.isOpen.searchChannel = value;
  },
  toggleEditUserDialog(state, value) {
    state.isOpen.editUser = value;
  }
};

const actions = {
  toggleNewChannelDialog({ commit }, value) {
    commit('toggleNewChannelDialog', value);
  },
  toggleNewChanneMemberlDialog({ commit }, value) {
    commit('toggleNewChanneMemberlDialog', value);
  },
  toggleSearchChannelDialog({ commit }, value) {
    commit('toggleSearchChannelDialog', value);
  },
  toggleEditUserDialog({ commit }, value) {
    commit('toggleEditUserDialog', value);
  }
};

export const dialogs = {
  namespaced: true,
  state,
  mutations,
  actions
};