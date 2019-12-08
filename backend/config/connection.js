const mysql = require('mysql');
const config = require('./config');

var connection = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password,
  multipleStatements: true
});

connection.connect(function (err) {

  connection.query('SHOW DATABASES LIKE ' + config.database,
    function (err, result) {
      if (err) {
        const createDatabase = `CREATE DATABASE IF NOT EXISTS EmployeeDB`;
        connection.query(createDatabase, function (err, results, fields) {
          if (err) {
            console.log('createDatabase:\n' + err);
          } else {
            const createUsersTable = `
              CREATE TABLE IF NOT EXISTS EmployeeDB.users(
                id varchar(150) primary key,
                name varchar(45) not null,
                email varchar(45) not null unique,
                password varchar(225) not null)`;

            connection.query(createUsersTable, function (err, results, fields) {
              if (err) {
                console.log('UsersTable:\n' + err.message);
              }
            });

            const createDepartmentsTable = `
              CREATE TABLE IF NOT EXISTS EmployeeDB.departments(
                dpID int(11) NOT NULL Primary Key,
                dpName varchar(45) not null)`;

            connection.query(createDepartmentsTable, function (err, results, fields) {
              if (err) {
                console.log('DepartmentsTable:\n' + err.message);
              }
            });

            const insertDataInDep = `
              INSERT INTO EmployeeDB.departments (dpID, dpName) VALUES (1, "HR");
              INSERT INTO EmployeeDB.departments (dpID, dpName) VALUES (2, "Tech");
              INSERT INTO EmployeeDB.departments (dpID, dpName) VALUES (3, "Finance")`;

            connection.query(insertDataInDep, function (err, results, fields) {
              if (err) {
                console.log('insertDataInDep:\n' + err.message);
              }
            });

            const createEmployeesTable = `
              CREATE TABLE IF NOT EXISTS EmployeeDB.employees(
                empID int(11) auto_increment NOT NULL Primary Key,
                empName varchar(45) not null,
                empActive tinyint(1) not null,
                empDepartment int(11) not null,
                creator varchar(45) not null,
                CONSTRAINT fk_empDepartment FOREIGN KEY (empDepartment)
                REFERENCES departments(dpID))`;

            connection.query(createEmployeesTable, function (err, results, fields) {
              if (err) {
                console.log('EmployeesTable:\n' + err.message);
              }
            });
          }
        });
      }
    });
  if (err) {
    console.log(err.message);
  } else {
    console.log('Connected to database!');
  }
});

module.exports = connection;
