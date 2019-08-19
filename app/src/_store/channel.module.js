import { channelService } from '../_services';

const state = {
  status: {
    registering: false
  },
  userChannels: null,
  inChannel: null,
  inChannelMembers: null,
  loadingChannelMembers: false
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
  },

  setUserChannels(state, channelData) {
    state.userChannels = channelData;
  },

  setSelectedChannel(state, channel) {
    state.inChannel = channel;
  },

  setChannelMembers(state, channelMembers) {
    state.inChannelMembers = channelMembers;
  },
  
  setLoadingChannelMembers(state, value) {
    state.loadingChannelMembers = value;
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
  },
  getChannelsByUser(context, userId) {
    return channelService.getByUserId(userId)
      .then((channels) => {
        return channels;
      },
      (error) => console.log(error));
  },
  getChannelsDataByUser({ commit }, data) {
    return channelService.getDataByUser(data)
      .then((channelData) => {
        commit('setUserChannels', channelData);
        return channelData;
      },
      (error) => console.log(error));
  },
  getChannelMembers({ dispatch } , channelId) {
    return channelService.getChannelMembers(channelId)
      .then((channelMembers) => {
        dispatch('getChannelMembersData', channelMembers);
      },
      (error) => console.log(error));
  },
  getChannelMembersData({ commit }, data) {
    return channelService.getChannelMembersData(data)
      .then((memberData) => {
        commit('setChannelMembers', memberData);
        commit('setLoadingChannelMembers', false);
        return memberData;
      },
      (error) => console.log(error));
  },
  setSelectedChannel({ commit, dispatch }, channel) {
    commit('setLoadingChannelMembers', true);
    dispatch('getChannelMembers', channel.channelId);
    commit('setSelectedChannel', channel);
  }
};

export const channel = {
  namespaced: true,
  state,
  actions,
  mutations,
};