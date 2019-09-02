const mysql = require('mysql');

var connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '159357',
  database: 'EmployeeDB',
  multipleStatements: true
});

module.exports = connection;
