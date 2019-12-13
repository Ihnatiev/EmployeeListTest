const EmployeeService = require('../services/employeeService');

module.exports = {
  getEmployeeById: (req, res) => {
    try {
      EmployeeService.find(req.params.employeeId,
        (err, employee) => {
          (employee == 0 || '') ?
            res.status(404).json({
              success: false,
              message: 'Employee not found!'
            }) :
            res.status(200).json({
              success: true,
              employee: employee
            });
        });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'Server error'
      });
    };
  },

  getAllEmployees: async (req, res) => {
    try {
      var numPerPage = +req.query.pagesize;
      var page = +req.query.page;
      var count = await EmployeeService.getCount();
      var results = await EmployeeService.findAll(numPerPage, page);
      var totalEmployee = count[0].totalCount;
      if (totalEmployee === 0) {
        res.status(404).json({
          success: false,
          message: 'Employee not found'
        });
      } else if (count && results) {
        res.status(200).json({
          employees: results,
          maxEmployees: totalEmployee
        });
      };
    } catch {
      res.status(500).json({
        success: false,
        message: 'Server error'
      });
    };
  },

  createEmployee: (req, res) => {
    var emp = { empName, empActive, empDepartment } = req.body;
    var creator = req.userData.userId;
    EmployeeService.create(emp, creator,
      (err, result) => {
        (err) ?
          res.status(500).json({
            success: false,
            message: 'Adding employee failed!'
          }) :
          res.status(201).json({
            success: true,
            message: 'Employee added successfully!',
            employeeId: result
          });
      });
  },

  updateEmployeeById: (req, res) => {
    var employeeId = req.params.employeeId;
    var creator = req.userData.userId;
    var emp = { empName, empActive, empDepartment } = req.body;
    EmployeeService.update(employeeId, creator, emp,
      (err, result) => {
        try {
          (result.affectedRows > 0) ?
            res.status(200).json({
              success: true,
              message: 'Update successfully!'
            }) :
            res.status(401).json({
              success: false,
              message: 'You are not authorized!'
            });
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
          (result.affectedRows > 0) ?
            res.status(200).json({
              success: true,
              message: 'Deletion successful!'
            }) :
            res.status(401).json({
              success: false,
              message: 'You are not authorized!'
            });
        } catch (error) {
          res.status(500).json({
            success: false,
            message: "Deleting an employee failed!"
          });
        };
      });
  }
}
