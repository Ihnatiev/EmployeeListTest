const Task = require('../models/employee.model');

exports.list_all_employees = function (req, res, next) {
  Task.getAllEmployees(function (err, employee) {
    if (err) {
      res.send(err);
    } else {
      res.send(employee);
    }
  });
};

exports.create_employee = function (req, res, next) {
  var new_employee = new Task(req.body);
  Task.createEmployee(new_employee, function (err, employee) {
    if (err) {
      res.send(err);
    } else {
      res.json(employee);
    }
  });
};

exports.read_employee = function (req, res) {
  Task.getEmployeeById(req.params.employeeId, function (err, employee) {
    if (err)
      res.send(err);
    res.json(employee);
  });
};

exports.update_employee = function (req, res) {
  Task.updateEmployeeById(req.params.employeeId, new Task(req.body), function (err, employee) {
    if (err)
      res.send(err);
    res.json(employee);
  });
};

exports.delete_employee = function (req, res) {
  Task.removeEmployeeById(req.params.employeeId, function (err, employee) {
    if (err)
      res.send(err);
    res.json({ message: 'Employee successfully deleted' });
  });
};

