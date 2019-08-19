const { User, Rol } = require('../model/index');

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

  if(!newUser.name || !newUser.lastName || !newUser.userName || !newUser.password) {
    res.status(400).send({ error: true, message: 'Please provide the complete user data' });
  } else {

    // Checking if the username isn't taken
    User.checkUserName(newUser.userName, function(err, user) {
      if(err) {
        res.send(err);
      } else {
        if(user.length >= 1) return res.status(400).send({ error: true, message: 'Username is already registered' });
        
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
                res.status(200).send({ error: false, message: 'User registered correctly', rol });
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