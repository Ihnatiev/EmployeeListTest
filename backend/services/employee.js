const sql = require('../config/connection');
const Employee = require('../models/employee.model');

Employee.displayEmployees = function (employees, result) {
  sql.query("SELECT empID, empName, IF(empActive, 'Yes', 'No')\
  empActive, dpName FROM Employee\
  INNER JOIN Department ON empDepartment = dpID", employees, (err, res) => {
    if (err) {
      result(err, null);
    }
    else {
      result(null, res);
    }
  });
}

Employee.newEmployee = function createEmployee(newEmployee, result) {
  sql.query("INSERT INTO Employee SET ?",
    newEmployee, (err, res) => {
      if (err) {
        result(err, null);
      }
      else {
        result(null, res.insertId);
      }
    });
};

Employee.getEmpById = function getEmployee(employeeId, result) {
  sql.query(
    "SELECT empID, empName,\
    IF(empActive, 'Yes', 'No')\
    empActive, dpName FROM Employee\
    INNER JOIN Department\
    ON empDepartment = dpID WHERE empID = ? ",
    employeeId, (err, res) => {
      if (err) {
        result(err, null);
      }
      else {
        result(null, res);
      }
    });
};

Employee.updateEmpById= function updateEmployee(id, employee, result) {
  sql.query(
    "UPDATE Employee SET ? where empID = ?",
    [employee, id], (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    });
};

Employee.removeEmpById = function removeEmployee(id, result) {
  sql.query(
    "DELETE FROM Employee WHERE empID = ?",
    [id], (err, res) => {
      if (err) {
        result(null, err);
      } else {
        result(null, res);
      }
    });
};

module.exports = Employee;