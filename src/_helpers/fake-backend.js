const users = JSON.parse(localStorage.getItem('users')) || []; // Array in the localStorage for the registered users

export default function configureFakeBackend() {

  const realFetch = window.fetch;

  window.fetch = function (url, opts) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        
        // Auth
        if(url.endsWith('/users/authenticate') && opts.method === 'POST') {
          const params = JSON.parse(opts.body);
          const filteredUsers = users.filter((user) => {
            return user.username === params.username && user.password === params.password;
          });

          if(filteredUsers.length) {
            const user = filteredUsers[0];
            const responseJson = {
              id: user.id,
              username: user.username,
              firstName: user.firstName,
              lastName: user.lastName,
              token: 'fake-jwt-token',
            };

            resolve({
              ok: true,
              text: () => Promise.resolve(JSON.stringify(responseJson)),
            });
          } else {
            reject('Username or password is incorrect');
          }

          return;
        }

        // Get users
        if(url.endsWith('/users') && opts.method === 'GET') {
          if(opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
            resolve({
              ok: true,
              text: () => Promise.resolve(JSON.stringify(users))
            });
          } else {
            reject('unauthorized');
          }

          return;
        }

        // Get user by id
        if(url.match(/\/users\/\d+$/) && opts.method === 'GET') {
          if(opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
            const urlParts = url.split('/');
            const id = parseInt(urlParts[urlParts.length - 1]);
            const matchedUsers = users.filter((user) => user.id === id);
            const user = matchedUsers.length ? matchedUsers[0] : null;

            resolve({
              ok: true,
              text: () => Promise.resolve(user),
            });
          } else {
            reject('unauthorized')
          }

          return;
        }

        // Register new user
        if(url.endsWith('/users/register') && opts.method === 'POST') {
          const newUser = JSON.parse(opts.body);

          // Validating user
          const isDuplicatedUser = users.filter((user) => user.username === newUser.username).length;
          if(isDuplicatedUser) {
            reject(`Username ${newUser.username} is already taken`);
            return;
          }

          // Saving user if not duplicated
          newUser.id = (new Date().getTime()).toString(36);
          users.push(newUser);
          localStorage.setItem('users', JSON.stringify(users));

          resolve({
            ok: true,
            text: () => Promise.resolve()
          });

          return;
        }

        if(url.match(/\/users\/\d+$/) && opts.method === 'DELETE') {
          if(opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
            const urlParts = url.split('/');
            const id = parseInt(urlParts[urlParts.length - 1]);
            for (let i = 0; i < users.length; i++) {
              let user = users[i];
              if (user.id === id) {
                  // delete user
                  users.splice(i, 1);
                  localStorage.setItem('users', JSON.stringify(users));
                  break;
              }
            }

            resolve({
              ok: true,
              text: () => Promise.resolve()
            });
          } else {
            reject('Unauthorized');
          }

          return;
        }

        // pass through any requests not handled above
        realFetch(url, opts).then((response) => resolve(response));
      }, 500);
    })
  }
}