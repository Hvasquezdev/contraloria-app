import { userService } from '../_services';
import { router } from '../_helpers';

const user = JSON.parse(localStorage.getItem('user'));
const state = user 
            ? { status: { loggedIn: true }, user }
            : { status: {}, user: null };

const mutations = {
  loginRequest(state, user) {
    state.status = { loggedIn: true, checkingUser: true };
    state.user = user;
  },

  loginSuccess(state, user) {
    state.status = { loggedIn: true, checkingUser: false };
    state.user = user;
  },

  loginFailure(state, error) {
    state.status = { loginError: error };
    state.user = null;
  },

  logout(state) {
    state.status = {};
    state.user = null;
  },

  registerRequest(state) {
    state.status = { registering: true, checkingUser: true };
  },

  registerSuccess(state) {
    state.status = {};
  },

  registerFailure(state) {
    state.status = {};
  }
};

const actions = {
  login({ dispatch, commit }, { userName, password }) {
    commit('loginRequest', { userName });

    return userService.login(userName, password)
      .then((user) => {
        if(user.status && user.status === 401) {
          commit('loginFailure', user.message);
        } else if(user.rol.status === 'inactive') {
          commit('loginFailure', 'user is inactive');
          return {
            status: 401,
            message: 'El usuario esta inhabilitado'
          };
        } else {
          commit('loginSuccess', user);
          router.push('/chat');
        }

        return user;
      },
      (error) => {
        commit('loginFailure', error);
        dispatch('alert/error', error, { root: true });
        throw error;
      });
  },

  logout({ commit }) {
    userService.logout();
    commit('logout');
    router.push('/');
  },

  register({ dispatch, commit }, user) {
    commit('registerRequest', user);

    return userService.register(user)
      .then((user) => {
        if(user.status && user.status === 409) {
          commit('registerFailure', user.message);
        } else {
          commit('registerSuccess', user);
          router.push('/login');
          setTimeout(() => {
            dispatch('alert/success', 'Registration successful', { root: true });
          });
        }

        return user;
      },
      (error) => {
        commit('registerFailure', error);
        dispatch('alert/error', error, { root: true });
      });
  },

  editUser(context, user) {
    return userService.editUser(user)
      .then((user) => {
        return user;
      })
      .catch((error) => {
        throw error;
      });
  }
};

export const account = {
  namespaced: true,
  state,
  actions,
  mutations,
};