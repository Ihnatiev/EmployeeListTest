const EmployeeService = require('../services/employeeService');

module.exports = {
  getEmployeeById: (req, res) => {
    try {
      EmployeeService.find(req.params.employeeId,
        (err, employee) => {
          if (employee == 0) {
            return res.status(404).json({
              success: false,
              message: 'Employee not found!'
            });
          }
          if (employee != 0) {
            return res.status(200).json({
              success: true,
              employee: employee
            });
          };
        });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: 'Server error'
      });
    };
  },

  getAllEmployees: async (req, res) => {
    try {
      const numPerPage = +req.query.pagesize;
      const page = +req.query.page;
      const count = await EmployeeService.getCount();
      const results = await EmployeeService.findAll(numPerPage, page);
      const totalEmployee = count[0].totalCount;
      if (totalEmployee == 0) {
        return res.status(404).json({
          success: false,
          message: 'Employee not found'
        });
      }
      if (count && results) {
        return res.status(200).json({
          employees: results,
          maxEmployees: totalEmployee
        });
      };
    } catch {
      return res.status(500).json({
        success: false,
        message: 'Server error'
      });
    };
  },

  createEmployee: (req, res) => {
    const emp = { empName, empActive, empDepartment } = req.body;
    const creator = req.userData.userId;
    try {
      EmployeeService.create(emp, creator,
        (err, result) => {
          if (err) {
            return res.status(500).json({
              success: false,
              message: 'Adding employee failed!'
            });
          }
          if (result) {
            return res.status(201).json({
              success: true,
              message: 'Employee added successfully!',
              employeeId: result
            });
          };
        });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Adding an employee failed!"
      });
    };
  },

  updateEmployeeById: (req, res) => {
    const employeeId = req.params.employeeId;
    const creator = req.userData.userId;
    const emp = { empName, empActive, empDepartment } = req.body;
    try {
      EmployeeService.update(employeeId, creator, emp,
        (err, result) => {
          if (result.affectedRows > 0) {
            return res.status(200).json({
              success: true,
              message: 'Update successfully!'
            });
          }
          if (result.affectedRows == 0) {
            return res.status(401).json({
              success: false,
              message: 'You are not authorized!'
            });
          };
        });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Updating an employee failed!"
      });
    };
  },

  deleteEmployeeById: (req, res) => {
    const employeeId = req.params.employeeId;
    const creator = req.userData.userId;
    try {
      EmployeeService.delete(employeeId, creator,
        (err, result) => {
          if (result.affectedRows > 0) {
            return res.status(200).json({
              success: true,
              message: 'Deletion successful!'
            });
          }
          if (result.affectedRows == 0) {
            return res.status(401).json({
              success: false,
              message: 'You are not authorized!'
            });
          };
        });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Deleting an employee failed!"
      });
    };
  }
};
