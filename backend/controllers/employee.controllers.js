const Employee = require('../models/employee.model');

exports.displayAllEmployees = function (req, res, next) {
  Employee.getAllEmployees(function (err, employee) {
    if (err) {
      res.send(err);
    } else {
      res.send(employee);
    }
  });
};

exports.createNewEmployee = function (req, res, next) {
  var new_employee = new Employee(req.body);
  Employee.createEmployee(new_employee, function (err, employee) {
    if (err) {
      res.send(err);
    } else {
      res.json(employee);
    }
  });
};

exports.readAnEmployee = function (req, res) {
  Employee.getEmployeeById(req.params.employeeId, function (err, employee) {
    if (err)
      res.send(err);
    res.json(employee);
  });
};

exports.updateAnEmployee = function (req, res) {
  Employee.updateEmployeeById(req.params.employeeId, new Employee(req.body), function (err, employee) {
    if (err)
      res.send(err);
    res.json(employee);
  });
};

exports.deleteAnEmployee = function (req, res) {
  Employee.removeEmployeeById(req.params.employeeId, function (err, employee) {
    if (err)
      res.send(err);
    res.json({ message: 'Employee successfully deleted' });
  });
};

