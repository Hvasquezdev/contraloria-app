import { channelService } from '../_services';

const state = {
  status: {
    registering: false,
    addingMember: false,
    searchingChannel: false
  },
  userChannels: null,
  inInbox: null,
  inChannel: null,
  inChannelMembers: null,
  loadingChannelMembers: false,
  channelFound: [],
  searchedChannel: null,
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
  },

  AddMemberRequest(state) {
    state.status = { addingMember: true };
  },

  addMemberRequestSuccess(state) {
    state.status = { addingMember: false };
  },

  addMemberRequestFailure(state, error) {
    state.status = { addingMember: false };
    console.log(error);
  },

  searchChannelRequest(state, channelName) {
    state.status = { searchingChannel: true };
    state.searchedChannel = channelName;
  },

  searchChannelSuccess(state, channel) {
    state.status = { searchingChannel: false };
    state.channelFound = channel;
  },

  searchChannelFailure(state) {
    state.status = { searchingChannel: false };
  },

  leaveChannelRequest(state) {
    state.status = { leavingChannel: true };
  },

  leaveChannelSuccess(state) {
    state.status = { leavingChannel: false };
  },

  leaveChannelFailure(state) {
    state.status = { leavingChannel: false };
  },

  setChannelFound(state, channel) {
    state.channelFound = channel;
  },

  setSelectedInbox(state, message) {
    state.inInbox = message;
  }
};

const actions = {
  register({ dispatch, commit }, channel) {
    commit('registerRequest', channel);

    return channelService.register(channel)
      .then((response) => {
        commit('registerSuccess', response);
        setTimeout(() => {
          dispatch('alert/success', 'Registration successful', { root: true });
        });
        const dataToReturn = {
          response,
          channel
        };

        return dataToReturn;
      },
      (error) => {
        commit('registerFailure', error);
        dispatch('alert/error', error, { root: true });
        throw error;
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
      (error) => { throw error; });
  },
  getChannelMembersData({ commit }, data) {
    return channelService.getChannelMembersData(data)
      .then((memberData) => {
        commit('setChannelMembers', memberData);
        commit('setLoadingChannelMembers', false);
        return memberData;
      },
      (error) => { throw error; });
  },
  setSelectedChannel({ commit, dispatch }, channel) {
    if(channel) {
      commit('setLoadingChannelMembers', true);
      dispatch('getChannelMembers', channel.channelId);
    }
    commit('setSelectedChannel', channel);
  },
  setSelectedInbox({ commit }, message) {
    commit('setSelectedInbox', message);
    return message;
  },
  addMember({ commit, dispatch }, data) {
    commit('addMemberRequest');

    return channelService.addMember(data)
      .then((result) => {
        dispatch('alert/success', 'Registration successful', { root: true });
        commit('addMemberRequestSuccess');
        return {
          ok: true,
          result,
        };
      },
      (error) => {
        commit('addMemberRequestFailure', error);
        throw error;
      });
  },
  searchChannelByName({ commit }, channelName) {
    commit('searchChannelRequest', channelName);

    return channelService.searchByName(channelName)
      .then((response) => {
        commit('searchChannelSuccess', response);
        return response;
      },
      (error) => {
        commit('searchChannelFailure');
        throw error;
      });
  },
  setChannelFound({ commit }, channel) {
    commit('setChannelFound', channel);
  },
  leaveChannel({ commit }, channelMemberData) {
    commit('leaveChannelRequest');

    return channelService.leaveChannel(channelMemberData)
      .then((response) => {
        commit('leaveChannelSuccess');
        return response;
      })
      .catch((error) => {
        commit('leaveChannelFailure');
        throw error;
      })
  }
};

export const channel = {
  namespaced: true,
  state,
  actions,
  mutations,
};