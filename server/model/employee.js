const sql = require('../db.js');

//Employee object constructor
const Employee = function (emp) {
  this.empName = emp.empName;
  this.empActive = emp.empActive;
  this.empDepartment = emp.empDepartment;
};


Employee.createEmployee = function createEmployee(newEmployee, result) {  
  sql.query("INSERT INTO Employee SET ?", newEmployee, function (err, res) {

    if (err) {
      console.log("error: ", err);
      result(err, null);
    }
    else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};

Employee.getAllEmployees = function getAllEmployees(result) {
  sql.query("SELECT empID, empName, IF(empActive, 'Yes', 'No') empActive, dpName FROM Employee INNER JOIN Department ON empDepartment = dpID", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    }
    else {
      result(null, res);
    }
  });
};

Employee.getEmployeeById = function createUser(employeeId, result) {
  sql.query("SELECT empID, empName, IF(empActive, 'Yes', 'No') empActive, dpName FROM Employee INNER JOIN Department ON empDepartment = dpID WHERE empID = ? ", employeeId, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    }
    else {
      result(null, res);
    }
  });
};

Employee.updateById = function (id, employee, result) {
  sql.query("UPDATE Employee SET empName = 'Monika', empActive = 0, empDepartment = 1 WHERE empID = 6", [employee, id], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err);
    } else {
      result(res);
    }
  });
};

Employee.remove = function (id, result) {
  sql.query("DELETE FROM Employee WHERE empID = ?", [id], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = Employee;
