const mysqlConnection = require('../database');

const User = function(user) {
  this.name = user.name;
  this.lastName = user.lastName;
  this.userName = user.userName;
  this.password = user.password;
};

const Rol = function(data) {
  this.name = data.name;
  this.status = data.status;
  this.userId = data.userId;
}

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
            data: {
              id: data[0].id,
              name: data[0].name,
              lastName: data[0].lastName,
              userName: data[0].userName,
              token: 'fake-jwt-token'
            },
            rol: {
              id: rol[0].id,
              name: rol[0].name,
              status: rol[0].status
            }
          };
          console.log(user)
  
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
      const userId = res.insertId;
      mysqlConnection.query("INSERT INTO rol set ?", [userId], function(err, res) {
        if(err) {
          console.log(err);
          result(err, null);
        } else {
          result(null, res.insertId);
        }
      });
    }
  });
};

User.checkUserName = function(userName, result) {
  mysqlConnection.query("SELECT id FROM users WHERE userName = ?", [userName], function(err, res) {
    if(err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, res);
    }
  })
}

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

User.getByUserName = function(userName, result) {
  mysqlConnection.query("SELECT id, name, lastName, userName FROM users WHERE userName = ?", [userName], function(err, res) {
    if(err) {
      console.log('error: ', err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Rol.newRol = function(data, result) {
  mysqlConnection.query("INSERT INTO rol set ?", [data], function(err, res) {
    if(err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, res.insertId);
    }
  });
}

module.exports = {
  User,
  Rol
};