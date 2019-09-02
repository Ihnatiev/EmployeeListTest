const Employee = require('../services/employee');

exports.getAllEmployees = (req, res) => {
  Employee.displayEmployees((err, employees) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: 'Fetching employees failed!'
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'Employees fetched successfully!',
        employees: employees
      });
    };
  });
};

exports.createAnEmployee = (req, res) => {
  var newEmp = new Employee(req.body);
  Employee.newEmployee(newEmp,
    (err, employee) => {
      if (err) {
        res.status(500).json({
          success: false,
          message: 'Adding employee failed!'
        });
      } else {
        res.status(201).json({
          success: true,
          message: 'Employee added successfully!',
          employee: employee
        });
      };
    });
};

exports.getEmployeeById = (req, res) => {
  Employee.getEmpById(req.params.employeeId,
    (err, employee) => {
      if (err) {
        res.status(404).json({
          success: false,
          message: 'Employee not found!'
        });
      } else {
        res.status(200).json({
          success: true,
          employee: employee
        });
      };
    });
};

exports.updateEmployeeById = (req, res, next) => {
  Employee.updateEmpById(req.params.employeeId,
    new Employee(req.body),
    (err, employee) => {
      if (err) {
        res.status(404).json({
          success: false,
          message: 'Employee not found!'
        });
      } else {
        res.status(200).json({
          success: true,
          message: 'Update successful!',
          employee: employee
        });
      };
    });
};

exports.deleteEmployeeById = (req, res) => {
  Employee.removeEmpById(req.params.employeeId,
    (err, result) => {
      if (err) {
        res.status(500).json({
          success: false,
          message: 'Deleting posts failed!'
        });
      } else if (result)
        res.status(200).json({
          success: true,
          message: 'Deletion successful!'
        });
    });
};

