import { userService } from '../_services';

const state = {
  all: {},
  user: {}
};

const mutations = {
  getAllRequest(state) {
    state.all = { loading: true };
  },

  getAllSuccess(state, users) {
    state.all = { items: users };
  },

  getAllFailure(state, error) {
    state.all = { error };
  },

  deleteRequest(state, id) {
    state.all.items = state.all.items.map((user) => user.id === id ? { ...user, deleting: true } : user);
  },

  deleteSuccess(state, id) {
    state.all.items = state.all.items.filter((user) => user.id !== id);
  },

  deleteFailure(state, { id, error }) {
    state.all.items = state.all.items.map((user) => {
      if(user.id === id) {
        // eslint-disable-next-line
        const { deleting, ...userCopy } = user;
        return { ...userCopy, deleteError: error };
      }

      return user;
    });
  },

  getUserRequest(state, value) {
    state.user = { getting: value }
  },

  getUserSuccess(state, user) {
    state.user = { data: user };
  },

  getUserFailure(state, error) {
    state.user = { error };
  },

  editUserStatusRequest(state) {
    state.rol = { editing: false }
  },

  editUserStatusSuccess(state) {
    state.rol = { editing: false };
  },

  editUserStatusFailure(state, error) {
    state.rol = { error, editing: false };
  },
};

const actions = {
  getAll({ commit }) {
    commit('getAllRequest');

    userService.getAll()
      .then((user) => {
        commit('getAllSuccess', user);
      },
      (error) => {
        commit('getAllFailure', error);
      });
  },

  delete({ commit }, id) {
    commit('deleteRequest', id);

    userService.delete(id)
      .then(() => {
        commit('deleteSuccess', id);
      },
      (error) => {
        commit('deleteFailure', { id, error: error.toString() });
      });
  },

  getByUserName({ commit }, userName) {
    commit('getUserRequest', true);
    
    return userService.getByUserName(userName)
      .then((user) => {
        commit('getUserSuccess', user);
        commit('getUserRequest', false);
        return user;
      },
      (error) => {
        commit('getUserFailure', error);
        commit('getUserRequest', false);
      });
  },

  editUserStatus({ commit }, data) {
    commit('editUserStatusRequest');
console.log(data)
    return userService.updateStatus(data)
      .then((response) => {
        commit('editUserStatusSuccess');
        return response;
      },
      (error) => {
        commit('editUserStatusFailure', error);
        throw error;
      });
  }
};

export const users = {
  namespaced: true,
  state,
  mutations,
  actions
};