import { authHeader } from '../_helpers';

export const channelService = {
  register,
  getAll,
  getById,
};

function register(channel) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(channel),
  };

  return fetch('http://localhost:3001/channel', requestOptions).then(handleResponse);
}

function getAll() {
  const requestOptions = {
      method: 'GET',
      headers: authHeader()
  };

  return fetch(`/channel`, requestOptions).then(handleResponse);
}


function getById(id) {
  const requestOptions = {
      method: 'GET',
      headers: authHeader()
  };

  return fetch(`/channel/${id}`, requestOptions).then(handleResponse);
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