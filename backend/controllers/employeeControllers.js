const EmployeeService = require('../services/employeeService');
const Employee = require('../models/employee.model');

module.exports = {
  getEmployeeById: (req, res) => {
    EmployeeService.find(req.params.employeeId)
      .then((employee) => {
        if (employee == 0 || '') {
          return res.status(404).json({
            success: false,
            message: 'Employee not found!'
          });
        } else {
          return res.status(200).json({
            success: true,
            employee: employee
          });
        }
      }).catch(err => {
        res.status(404).json({
          success: false,
          message: 'Employee not found!'
        });
      });
  },

  getAllEmployees: (req, res) => {
    let totalCount;
    var numPerPage = +req.query.pagesize;
    var page = +req.query.page;

    EmployeeService.getCount()
      .then((result) => {
        totalCount = result[0].totalCount;
      })
      .then(async () => {
        var results = await EmployeeService.findAll(numPerPage, page);
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
  },

  createEmployee: (req, res) => {
    var employee = new Employee({
      empName: req.body.empName,
      empActive: req.body.empActive,
      empDepartment: req.body.empDepartment,
      creator: req.userData.userId
    });
    try {
      Employee.create(employee,
        result => {
          return res.status(201).json({
            success: true,
            message: 'Employee added successfully!',
            employeeId: result
          });
        });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'Adding employee failed!'
      });
    };
  },

  updateEmployeeById: (req, res, next) => {
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
            res.status(204).json({
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
  },

  deleteEmployeeById: (req, res, next) => {
    var empID = req.params.employeeId;
    var userId = req.userData.userId;
    EmployeeService.delete(empID, userId,
      (err, result) => {
        try {
          if (result.affectedRows > 0) {
            res.status(204).json({
              message: 'Deletion successful!'
            });
          } else {
            res.status(401).json({
              message: 'Not authorized!'
            });
          }
        } catch (error) {
          res.status(500).json({
            message: "Deleting an employee failed!"
          });
        }
      });
  }
}
