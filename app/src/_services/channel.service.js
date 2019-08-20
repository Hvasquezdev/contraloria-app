import { authHeader } from '../_helpers';

export const channelService = {
  register,
  getAll,
  getById,
  getByUserId,
  getDataByUser,
  getChannelMembers,
  getChannelMembersData,
  addMember
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

function getByUserId(id) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(`http://localhost:3001/channels/user/${id}`, requestOptions).then(handleResponse);
}

async function getDataByUser(data) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  let channel_list = data;
  let result;
  for(let i = 0; i < channel_list.length; i++){
    result = await fetch(`http://localhost:3001/channel/${data[i].channelId}`, requestOptions).then(handleResponse);
    channel_list[i]['channel_data'] = result;
  }

  return channel_list;
}

function getById(id) {
  const requestOptions = {
      method: 'GET',
      headers: authHeader()
  };

  return fetch(`/channel/${id}`, requestOptions).then(handleResponse);
}

function getChannelMembers(channelId) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };
  return fetch(`http://localhost:3001/channel/${channelId}/members`, requestOptions).then(handleResponse);
}

async function getChannelMembersData(data) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  let members_list = data;
  let result;
  for(let i = 0; i < members_list.length; i++){
    result = await fetch(`http://localhost:3001/channel/${data[i].memberId}/member`, requestOptions).then(handleResponse);
    members_list[i]['member_data'] = result;
  }

  return members_list;
}

function addMember(data) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };

  return fetch('http://localhost:3001/channel/member/new', requestOptions).then(handleResponse);
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