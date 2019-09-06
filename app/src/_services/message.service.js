import { authHeader } from '../_helpers';

export const messageService = {
  getAllByChannel,
  sendMessageToChannel,
  getByUserId,
  getDirectMessageContent
};

function getAllByChannel(channelId) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(`http://localhost:3001/messages/${channelId}`, requestOptions).then(handleResponse);
}

function getByUserId(userId) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(`http://localhost:3001/inbox/${userId}`, requestOptions).then(handleResponse);
}

function getDirectMessageContent(message) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };
  const { userId, destinationId } = message;

  return fetch(`http://localhost:3001/inbox/${userId}/${destinationId}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    
    if(!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}

function sendMessageToChannel(message) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(message),
  };

  return fetch('http://localhost:3001/message', requestOptions).then(handleResponse);
}