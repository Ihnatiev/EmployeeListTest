const sql = require('../config/connection');

const Employee = function (emp) {
  this.empName = emp.empName;
  this.empActive = emp.empActive;
  this.empDepartment = emp.empDepartment;
};

Employee.createEmployee = function createEmployee(newEmployee, result) {
  sql.query("INSERT INTO Employee SET ?",
    newEmployee, function (err, res) {
      if (err) {
        result(err, null);
      }
      else {
        result(null, res.insertId);
      }
    });
};

Employee.getAllEmployees = function getAllEmployees(result) {
  sql.query(
    "SELECT empID, empName,\
    IF(empActive, 'Yes', 'No')\
    empActive, dpName FROM Employee\
    INNER JOIN Department\
    ON empDepartment = dpID",
    function (err, res) {
      if (err) {
        result(null, err);
      }
      else {
        result(null, res);
      }
    });
};

Employee.getEmployeeById = function getEmployee(employeeId, result) {
  sql.query(
    "SELECT empID, empName,\
    IF(empActive, 'Yes', 'No')\
    empActive, dpName FROM Employee\
    INNER JOIN Department\
    ON empDepartment = dpID WHERE empID = ? ",
    employeeId, function (err, res) {
      if (err) {
        result(err, null);
      }
      else {
        result(null, res);
      }
    });
};

Employee.updateEmployeeById = function updateEmployee(id, employee, result) {
  sql.query(
    "UPDATE Employee SET ? where empID = ?",
    [employee, id], function (err, res) {
      if (err) {
        result(err);
      } else {
        result(res);
      }
    });
};

Employee.removeEmployeeById = function removeEmployee(id, result) {
  sql.query(
    "DELETE FROM Employee WHERE empID = ?",
    [id], function (err, res) {
      if (err) {
        result(null, err);
      } else {
        result(null, res);
      }
    });
};

module.exports = Employee;