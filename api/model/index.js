const mysqlConnection = require('../database');

const User = function(user) {
  this.name = user.name;
  this.lastName = user.lastName;
  this.userName = user.userName;
  this.password = user.password;
};

User.auth = function(user, result) {
  const { userName, password } = user;
  mysqlConnection.query("SELECT * FROM users WHERE userName = ? AND password = ?", [userName, password], function(err, userData) {
    if(err) {
      console.log(err);
      result(err, null);
    } else {
      const userId = userData[0].id;
      const data = userData;

      mysqlConnection.query("SELECT * FROM rol WHERE userId = ?", [userId], function(err, rol) {
        if(err) {
          console.log(err);
          result(err, null);
        } else {
          const user = {
            data: data,
            rol: rol
          };
  
          console.log('res', user);
          result(null, user);
        }
      });
    }
  });
};

User.newUser = function(newUser, result) {
  mysqlConnection.query("INSERT INTO users set ?", newUser, function(err, res) {
    if(err) {
      console.log(err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};

User.getAll = function(result) {
  mysqlConnection.query("SELECT * FROM users", function(err, res) {
    if(err) {
      console.log('error: ', err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

module.exports = User;