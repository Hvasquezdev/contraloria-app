import { messageService } from '../_services';

const state = {
  status: {
    fetchingMessages: false,
    fetchingMessageText: false,
    sendingMessage: false,
    fetchingDirectMessages: false
  },
  channelMessages: [],
}

const mutations = {
  sendMessageRequest(state) {
    state.status = { sendingMessage: true };
  },

  sendMessageSuccess(state) {
    state.status = { sendingMessage: false };
  },

  sendMessageFailure(state) {
    state.status = { sendingMessage: false };
  },

  getMessagesRequest(state) {
    state.status = { fetchingMessages: true };
  },

  getMessagesSuccess(state) {
    state.status = { fetchingMessages: false };
  },

  getMessagesFailure(state) {
    state.status = { fetchingMessages: false };
  },

  getDirectMessageRequest(state) {
    state.status = { fetchingDirectMessages: true };
  },

  getDirectMessageSuccess(state) {
    state.status = { fetchingDirectMessages: false };
  },

  getDirectMessageFailure(state) {
    state.status = { fetchingDirectMessages: false };
  },

  getMessagesTextRequest(state) {
    state.status = { fetchingMessageText: true };
  },

  getMessagesTextSuccess(state) {
    state.status = { fetchingMessageText: false };
  },

  getMessagesTextFailure(state) {
    state.status = { fetchingMessageText: false };
  },

  setChannelMessageTextContent(state, channelMessages) {
    state.channelMessage = channelMessages;
  },

  addMessageToArray(state, message) {
    state.channelMessages.push(message);
  }
};

const actions = { // TODO: get message author data, check if the message has media and get the media, add send message function
  getMessagesByChannel({ commit }, channelId) {
    commit('getMessagesRequest');

    return messageService.getAllByChannel(channelId)
      .then((messages) => {
        commit('getMessagesSuccess');
        return messages;
      },
      (error) => {
        commit('getMessagesFailure');
        throw error;
      });
  },

  sendMessageToChannel({ commit }, message) {
    commit('sendMessageRequest');

    return messageService.sendMessageToChannel(message)
      .then((response) => {
        commit('sendMessageSuccess');
        return response;
      },
      (error) => {
        commit('sendMessageFailure');
        throw error;
      });
  },

  getDirectMessagesByUser({ commit }, userId) {
    commit('getDirectMessageRequest');

    return messageService.getByUserId(userId)
      .then((messages) => {
        commit('getDirectMessageSuccess');
        return messages;
      },
      (error) => {
        commit('getDirectMessageFailure');
        throw error;
      });
  },
};

export const message = {
  namespaced: true,
  state,
  actions,
  mutations,
};