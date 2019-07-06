const Employee = require('../model/employee.js');

exports.list_all_employees = function (req, res) {
  Employee.getAllEmployees(function (err, employee) {
    // console.log('controller')
    if (err) {
      res.send(err);
    } else {
      // console.log('res', employee);
      res.send(employee);
    }
  });
};

exports.create_an_employee = function (req, res) {
  var new_employee = new Employee(req.body);
  //handles null error 
  if (error) {
    res.status(400).send({
      error: true,
      message: 'Please provide employee/name'
    });  
  } else {
    Employee.createEmployee(new_employee, function (err, employee) {
      if (err) {
        res.send(err);
      } else {
        res.json(employee);
      }
    });
  }
};

exports.read_an_employee = function (req, res) {
  Employee.getEmployeeById(req.params.employeeId, function (err, employee) {
    if (err)
      res.send(err);
    res.json(employee);
  });
};

exports.update_an_employee = function(req, res) {
  Employee.updateById(req.params.employeeId, new Employee(req.body), function(err, employee) {
    if (err)
      res.send(err);
    res.json(employee);
  });
};

exports.delete_an_employee = function (req, res) {
  Employee.remove(req.params.employeeId, function (err, employee) {
    if (err)
      res.send(err);
    res.json({ message: 'Employee successfully deleted' });
  });
};

