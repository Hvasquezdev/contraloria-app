const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'contraloria-app'
});

mysqlConnection.connect( err => {
  if(err) {
    console.error(err);
    return;
  } else {
    console.log('Connected');
  }
});

module.exports = mysqlConnection;