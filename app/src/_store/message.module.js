import { messageService } from '../_services';

const state = {
  status: {
    fetchingMessages: false,
    fetchingMessageText: false,
    sendingMessage: false,
    fetchingDirectMessages: false,
    fetchingDirectMessagesContent: false
  },
  currentPage: 0,
  channelMessages: []
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

  getDirectMessageContentRequest(state) {
    state.status = { fetchingDirectMessagesContent: true };
  },

  getDirectMessageContentSuccess(state) {
    state.status = { fetchingDirectMessagesContent: false };
  },

  getDirectMessageContentFailure(state) {
    state.status = { fetchingDirectMessagesContent: false };
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
  },

  setCurrentPage(state, value) {
    state.currentPage += value;
  },

  resetCurrentPage(state) {
    state.currentPage = 0;
  }
};

const actions = { // TODO: get message author data, check if the message has media and get the media, add send message function
  getMessagesByChannel({ commit }, data) {
    commit('getMessagesRequest');
    const { channelId, page } = data;
    console.log(channelId, page);
    return messageService.getAllByChannel(channelId, page)
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

  sendDirectMessage({ commit }, message) {
    commit('sendMessageRequest');

    return messageService.sendDirectMessage(message)
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

  getDirectMessagesContent({ commit }, message) {
    commit('getDirectMessageContentRequest');

    return messageService.getDirectMessageContent(message)
      .then((messages) => {
        commit('getDirectMessageContentSuccess');
        return messages;
      },
      (error) => {
        commit('getDirectMessageContentFailure');
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