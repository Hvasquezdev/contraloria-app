const User = require('../model/index');

exports.auth_user = function(req, res) {
  const { userName, password } = req.body;
  console.log('Controller auth');

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
    User.newUser(newUser, function(err, user) {
      if(err) {
        res.send(err);
      } else {
        res.json(user);
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