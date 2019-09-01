import { authHeader } from '../_helpers';

export const userService = {
  login,
  logout,
  register,
  getAll,
  getById,
  getByUserName,
  update,
  delete: _delete
};

function login(userName, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userName, password })
  };

  return fetch(`http://localhost:3001/user/authenticate`, requestOptions)
    .then(handleResponse)
    .then((user) => {
      if(!user.status && user.data.token) {
        localStorage.setItem('user', JSON.stringify(user));
      }

      return user;
    })
    .catch((error) => console.error(error));
}

function logout() {
  localStorage.removeItem('user');
}

function register(user) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  };

  return fetch('http://localhost:3001/users', requestOptions).then(handleResponse);
}

function getAll() {
  const requestOptions = {
      method: 'GET',
      headers: authHeader()
  };

  return fetch(`/users`, requestOptions).then(handleResponse);
}


function getById(id) {
  const requestOptions = {
      method: 'GET',
      headers: authHeader()
  };

  return fetch(`/users/${id}`, requestOptions).then(handleResponse);
}

function getByUserName(userName) {
  const requestOptions = {
      method: 'GET',
      headers: authHeader()
  };

  return fetch(`http://localhost:3001/user/${userName}`, requestOptions).then(handleResponse);
}

function update(user) {
  const requestOptions = {
      method: 'PUT',
      headers: { ...authHeader(), 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
  };

  return fetch(`/users/${user.id}`, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  const requestOptions = {
      method: 'DELETE',
      headers: authHeader()
  };

  return fetch(`/users/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    
    if(!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}