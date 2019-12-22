const mysql = require('mysql');
const config = require('./config');

const connection = mysql.createConnection({
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
            console.log('Connected to Database');
          }
        });
      }
    });
  connection.query('SHOW TABLES LIKE EmployeeDB.Users',
    (err, result) => {
      if (err) {
        const createUsersTable = `CREATE TABLE IF NOT EXISTS EmployeeDB.Users(
                id varchar(150) primary key,
                name varchar(45) not null,
                email varchar(45) not null unique,
                password varchar(225) not null);
                INSERT INTO EmployeeDB.users (id, name, email, password) VALUES (
                "f6f7dd58-0b07-494e-85d6-c0c03b902256", "Test User", "testUser@test.com",
                "$2b$10$8UbnMHU9mvmwzyNKl/kCFeG3yBA1MOEiBProvq98.aBEPGWdxVnJC");`;
        // tslint:disable-next-line: no-shadowed-variable
        connection.query(createUsersTable, (err, results, fields) => {
          if (err) {
            console.log('createUsersTable error:\n' + err);
          } else {
            console.log('Connected to Users');
          }
        });
      }
    });
  connection.query('SHOW TABLES LIKE EmployeeDB.Departments',
    (err, result) => {
      if (err) {
        const createDepartmentsTable = `CREATE TABLE IF NOT EXISTS EmployeeDB.Departments(
                dpID int(11) NOT NULL Primary Key,
                dpName varchar(45) not null);
              INSERT INTO EmployeeDB.departments (dpID, dpName) VALUES (1, "HR");
              INSERT INTO EmployeeDB.departments (dpID, dpName) VALUES (2, "Tech");
              INSERT INTO EmployeeDB.departments (dpID, dpName) VALUES (3, "Finance");`;
        // tslint:disable-next-line: no-shadowed-variable
        connection.query(createDepartmentsTable, (err, results, fields) => {
          if (err) {
            console.log('createDepartmentsTable error:\n' + err);
          } else {
            console.log('Connected to Departments');
          }
        });
      }
    });
  connection.query('SHOW TABLES LIKE EmployeeDB.Employees',
    (err, result) => {
      if (err) {
        const createEmployeesTable = `CREATE TABLE IF NOT EXISTS EmployeeDB.Employees(
                empID int(11) auto_increment NOT NULL Primary Key,
                empName varchar(45) not null,
                empActive tinyint(1) not null,
                empDepartment int(11) not null,
                creator varchar(45) not null,
                CONSTRAINT fk_empDepartment FOREIGN KEY (empDepartment)
                REFERENCES departments(dpID));
              INSERT INTO EmployeeDB.employees (empID, empName, empActive, empDepartment, creator)
              VALUES (1, "Lisa", true, 1, "f6f7dd58-0b07-494e-85d6-c0c03b902256");
              INSERT INTO EmployeeDB.employees (empID, empName, empActive, empDepartment, creator)
              VALUES (2, "Bart", false, 2, "f6f7dd58-0b07-494e-85d6-c0c03b902256");
              INSERT INTO EmployeeDB.employees (empID, empName, empActive, empDepartment, creator)
              VALUES (3, "Tina", false, 2, "f6f7dd58-0b07-494e-85d6-c0c03b902256");
              INSERT INTO EmployeeDB.employees (empID, empName, empActive, empDepartment, creator)
              VALUES (4, "Homer", true, 3, "f6f7dd58-0b07-494e-85d6-c0c03b902256");`;
        // tslint:disable-next-line: no-shadowed-variable
        connection.query(createEmployeesTable, (err, results, fields) => {
          if (err) {
            console.log('createEmployeesTable error:\n' + err);
          } else {
            console.log('Connected to Employees');
          }
        });
      }
    });
});

module.exports = connection;
