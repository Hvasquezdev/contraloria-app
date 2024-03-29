const { User, Rol, SecretQuestion } = require('../model/index');

exports.auth_user = function(req, res) {
  const { userName, password } = req.body;
  console.log('Controller auth', req.body);

  if (!userName || !password) {
    res.status(400).send({ error: true, message: 'Please provide the username and password' });
  } else {
    User.auth({ userName, password }, function(err, user) {
      if(err) {
        res.send(err);
      } else {
        res.json(user);
      }
    });
  }
};

exports.new_user = function(req, res) {
  const newUser = new User(req.body);
  console.log('Controller creating user');

  if(!newUser.name || !newUser.lastName || !newUser.userName || !newUser.password || !req.body.question || !req.body.answer) {
    res.status(400).send({ error: true, message: 'Please provide the complete user data' });
  } else {

    // Checking if the username isn't taken
    User.checkUserName(newUser.userName, function(err, user) {
      if(err) {
        res.send(err);
      } else {
        if(user.length >= 1) return res.send({ error: true, message: 'El nombre de usuario ya existe', status: 409 });
        
        // If username is not taken then save the user
        User.newUser(newUser, function(err, user) {
          if(err) {
            res.send(err);
          } else {
            
            const rolData = {
              name: 'user',
              status: 'active',
              userId: user
            };

            // Saving rol of the user with the registered user ID
            Rol.newRol(rolData, function(err, rol) {
              if(err) {
                res.send(err);
              } else {

                const recoveryData = new SecretQuestion({
                  question: req.body.question,
                  answer: req.body.answer,
                  userId: user
                });
                console.log(recoveryData)
                SecretQuestion.setSecretQuestion(recoveryData, function(err, response) {
                  if(err) {
                    res.send(err);
                  } else {
                    res.status(200).send({ error: false, message: 'User registered correctly', response });
                  }
                });
              }
            });

          }
        });

      }
    });

  }
};

exports.get_all_users = function(req, res) {
  User.getAll(function(err, users) {
    console.log('Controller get all users');

    if(err) {
      res.send(err);
      console.log('error:', err, users);
    } else {
      res.send(users);
    }
  });
};

exports.get_by_username = function(req, res) {
  const { userName } = req.params;

  if (!userName) {
    res.status(400).send({ error: true, message: 'Please provide the username' });
  } else {
    User.getByUserName(userName, function(err, user) {
      if(err) {
        res.send(err);
      } else {
        res.json(user);
      }
    });
  }
}

exports.edit_user = function(req, res) {
  const { userName } = req.params;
  const { name, lastName } = req.body;

  if(!name && !lastName) {
    res.status(400).send({ error: true, message: 'There are no changes' });
  } else {
    if(name && !lastName) {
      User.editUserFirstName({ name, userName }, function(err, user) {
        if(err) {
          res.send(err);
        } else {
          res.json(user);
        }
      });
    } else if (!name && lastName) {
      User.editUserLastName({ lastName, userName }, function(err, user) {
        if(err) {
          res.send(err);
        } else {
          res.json(user);
        }
      });
    } else if (name && lastName) {
      User.editUser({ name, lastName, userName }, function(err, user) {
        if(err) {
          res.send(err);
        } else {
          res.json(user);
        }
      });
    }
  }
}

exports.change_status = function(req, res, io) {
  const { userId, status } = req.body;

  if(userId === null || !status || userId === undefined) {
    res.status(400).send({ error: true, message: 'Provide the userId and status' });
  } else {
    Rol.changeStatus({ userId, status }, function(err, response) {
      if(err) {
        res.send(err);
      } else {
        io.sockets.emit('userStatusChanged', { userId, status });
        res.json(response);
      }
    });
  }
}

exports.get_secret_question = function(req, res) {
  const { userName } = req.params;

  if(!userName) {
    res.status(400).send({ error: true, message: 'Provide the user name' });
  } else {
    User.getSecretQuestion({ userName }, function(err, response) {
      if(err) {
        res.send(err);
      } else {
        res.json(response);
      }
    });
  }
}

exports.recovery_password = function(req, res) {
  const { userName, answer } = req.body;
  console.log(req.body)

  if(!userName) {
    res.status(400).send({ error: true, message: 'Provide the username' });
  } else {
    User.recoveryPassword({ userName, answer }, function(err, response) {
      if(err) {
        res.send(err);
      } else {
        res.json(response);
      }
    });
  }
}