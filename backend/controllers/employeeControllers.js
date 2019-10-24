const EmployeeService = require('../services/employeeService');
const Employee = require('../models/employee.model');

exports.getAllEmployees = (req, res) => {
  let totalCount;
  var numPerPage = +req.query.pagesize;
  var page = +req.query.page;
  var skip = page * numPerPage;
  var end_limit = numPerPage;
  var limit = skip + ',' + end_limit;
  EmployeeService.findCount()
    .then((result) => {
      totalCount = result[0].totalCount;
    })
    .then(async () => {
      var results = await EmployeeService.findAll(limit);
      return res.status(200).json({
        employees: results,
        maxEmployees: totalCount
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: 'Server error'
      });
    });
}

exports.createEmployee = (req, res) => {
  var employee = new Employee({
    empName: req.body.empName,
    empActive: req.body.empActive,
    empDepartment: req.body.empDepartment,
    creator: req.userData.userId
  });
  try {
    var result = Employee.create(employee);
    return res.status(201).json({
      success: true,
      message: 'Employee added successfully!',
      employee: result
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Adding employee failed!'
    });
  };
};

exports.getEmployeeById = (req, res) => {
  var empID = req.params.employeeId;
  EmployeeService.find(empID,
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
}

exports.updateEmployeeById = (req, res, next) => {
  var empID = req.params.employeeId;
  var userId = req.userData.userId;
  EmployeeService.update(empID, userId,
    new Employee({
      empName: req.body.empName,
      empActive: req.body.empActive,
      empDepartment: req.body.empDepartment,
      creator: userId
    }),
    (err, employee) => {
      try {
        if (employee.affectedRows > 0) {
          res.status(200).json({
            message: 'Update successful!'
          });
        } else {
          res.status(401).json({
            message: 'Not authorized!'
          });
        }
      } catch (error) {
        res.status(500).json({
          message: "Updating an employee failed!"
        });
      }
    });
}

exports.deleteEmployeeById = (req, res, next) => {
  var empID = req.params.employeeId;
  var userId = req.userData.userId;
  EmployeeService.delete(empID, userId,
    (err, result) => {
      try {
        if (result.affectedRows > 0) {
          res.status(200).json({
            message: 'Deletion successful!'
          });
        } else {
          res.status(401).json({
            message: 'Not authorized!'
          });
        }
      } catch (error) {
        res.status(500).json({
          message: "You are not authenticated!"
        });
      }
    });
}

