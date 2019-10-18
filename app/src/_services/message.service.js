import { authHeader } from '../_helpers';

export const messageService = {
  getAllByChannel,
  sendMessageToChannel,
  getByUserId,
  getDirectMessageContent,
  sendDirectMessage,
  startDirectMessage
};

function getAllByChannel(channelId, page) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(`http://localhost:3001/messages/${channelId}/${page}`, requestOptions).then(handleResponse);
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
  const { id } = message;

  return fetch(`http://localhost:3001/inbox/content/${id}`, requestOptions).then(handleResponse);
}

function sendMessageToChannel(message) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(message),
  };

  if(message.hasMedia) {
    return fetch('http://localhost:3001/message', requestOptions).then((response) => response.json())
      .then((data) => {
        let formData  = new FormData();
    
        formData.append('file', message.media);
        formData.append('channel_message_id', parseInt(data.message.insertId));
    
        const requestMediaOptions = {
          method: 'POST',
          body: formData,
        };
    
        return fetch('http://localhost:3001/message/media', requestMediaOptions).then(handleResponse);
      });
  } else {
    return fetch('http://localhost:3001/message', requestOptions).then(handleResponse);
  }
}

function sendDirectMessage(message) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(message),
  };

  if(message.hasMedia) {
    return fetch('http://localhost:3001/inbox', requestOptions).then((response) => response.json())
      .then((data) => {
        console.log(data)
        let formData  = new FormData();
    
        formData.append('file', message.media);
        formData.append('messageContentId', parseInt(data.message.insertId));
    
        const requestMediaOptions = {
          method: 'POST',
          body: formData,
        };
    
        return fetch('http://localhost:3001/inbox/media', requestMediaOptions).then(handleResponse);
      });
  } else {
    return fetch('http://localhost:3001/inbox', requestOptions).then(handleResponse);
  }

}

function startDirectMessage(data) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };

  return fetch('http://localhost:3001/inbox/new', requestOptions).then(handleResponse);
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