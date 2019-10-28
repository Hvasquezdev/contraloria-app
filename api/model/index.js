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
      if(userData[0] && userData[0].id) {
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
    
            result(null, user);
          }
        });
      } else {
        result(null, { message: 'usuario o contraseña incorrecta', status: 401 });
      }
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
  mysqlConnection.query("SELECT T1.id, T1.name, lastName, userName, T2.status FROM users T1 INNER JOIN rol T2 ON T2.userId = T1.id WHERE userName = ?", [userName], function(err, res) {
    if(err) {
      console.log('error: ', err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

User.editUserFirstName = function(data, result) {
  const { name, userName } = data;
  mysqlConnection.query("UPDATE users SET name = ? WHERE userName = ?", [name, userName], function(err, res) {
    if(err) {
      console.log('error: ', err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
}

User.editUserLastName = function(data, result) {
  const { lastName, userName } = data;
  mysqlConnection.query("UPDATE users SET lastName = ? WHERE userName = ?", [lastName, userName], function(err, res) {
    if(err) {
      console.log('error: ', err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
}

User.editUser = function(data, result) {
  const { name, lastName, userName } = data;
  mysqlConnection.query("UPDATE users SET name = ?, lastName = ? WHERE userName = ?", [name, lastName, userName], function(err, res) {
    if(err) {
      console.log('error: ', err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
}

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

Rol.changeStatus = function(data, result) {
  mysqlConnection.query('UPDATE rol SET status = ? WHERE userId = ?', [data.status, data.userId], function(err, res) {
    if(err) {
      result(err, null);
    } else {
      result(null, { res, userId: data.userId, status: data.status, responseStatus: 200 });
    }
  })
}

module.exports = {
  User,
  Rol
};