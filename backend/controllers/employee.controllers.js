const Employee = require('../services/employee');

exports.getAllEmployees = function (req, res, next) {
  Employee.displayEmployees(function (err, employee) {
    if (err) {
      res.send(err);
    } else {
      res.send(employee);
    }
  });
};

exports.createAnEmployee = function (req, res, next) {
  var new_employee = new Employee(req.body);
  Employee.newEmployee(new_employee, function (err, employee) {
    if (err) {
      res.send(err);
    } else {
      res.json(employee);
    }
  });
};

exports.getEmployeeById = function (req, res) {
  Employee.getEmpById(req.params.employeeId, function (err, employee) {
    if (err)
      res.send(err);
    res.json(employee);
  });
};

exports.updateEmployeeById = function (req, res) {
  Employee.updateEmpById(req.params.employeeId, new Employee(req.body), function (err, employee) {
    if (err)
      res.send(err);
    res.json(employee);
  });
};

exports.deleteEmployeeById = function (req, res) {
  Employee.removeEmpById(req.params.employeeId, function (err, employee) {
    if (err)
      res.send(err);
    res.json({ message: 'Employee successfully deleted' });
  });
};

