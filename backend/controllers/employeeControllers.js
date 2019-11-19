const EmployeeService = require('../services/employeeService');
const EmployeeModel = require('../models/employee.model');

module.exports = {
  getEmployeeById: (req, res) => {
    try {
      EmployeeService.find(req.params.employeeId,
        (err, employee) => {
          if (employee == 0 || '') {
            res.status(404).json({
              success: false,
              message: 'Employee not found!'
            });
          } else {
            res.status(200).json({
              success: true,
              employee: employee
            });
          }
        });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'Server error'
      });
    };
  },

  getAllEmployees: async (req, res) => {
    let totalCount;
    var numPerPage = +req.query.pagesize;
    var page = +req.query.page;

    EmployeeService.getCount((err, result) => {
      totalCount = result[0].totalCount;
    }).then(async () => {
      var results = await EmployeeService.findAll(numPerPage, page);
      return res.status(200).json({
        employees: results,
        maxEmployees: totalCount
      });
    }).catch((err) => {
      res.status(500).json({
        success: false,
        message: 'Server error'
      });
    });
  },

  createEmployee: (req, res) => {
    var employee = new EmployeeModel({
      empName: req.body.empName,
      empActive: req.body.empActive,
      empDepartment: req.body.empDepartment,
      creator: req.userData.userId
    });
    EmployeeService.create(employee,
      (err, result) => {
        if (err) {
          res.status(500).json({
            success: false,
            message: 'Adding employee failed!'
          });
        } else {
          res.status(201).json({
            success: true,
            message: 'Employee added successfully!',
            employeeId: result
          });
        };
      });
  },

  updateEmployeeById: (req, res) => {
    var employeeId = req.params.employeeId;
    var userId = req.userData.userId;
    var employee = new EmployeeModel({
      empName: req.body.empName,
      empActive: req.body.empActive,
      empDepartment: req.body.empDepartment,
      creator: userId
    });
    EmployeeService.update(employeeId, userId, employee,
      (err, result) => {
        try {
          if (result.affectedRows > 0) {
            res.status(200).json({
              success: true,
              message: 'Update successful!'
            });
          } else {
            res.status(401).json({
              success: false,
              message: 'You are not authorized!'
            });
          };
        } catch (error) {
          res.status(500).json({
            success: false,
            message: "Updating an employee failed!"
          });
        };
      });
  },

  deleteEmployeeById: (req, res) => {
    var employeeId = req.params.employeeId;
    var creator = req.userData.userId;
    EmployeeService.delete(employeeId, creator,
      (err, result) => {
        try {
          if (result.affectedRows > 0) {
            res.status(200).json({
              success: true,
              message: 'Deletion successful!'
            });
          } else {
            res.status(401).json({
              success: false,
              message: 'You are not authorized!'
            });
          };
        } catch (error) {
          res.status(500).json({
            success: false,
            message: "Deleting an employee failed!"
          });
        };
      });
  }
}
