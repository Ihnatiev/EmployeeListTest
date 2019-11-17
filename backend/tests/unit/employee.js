/*const request = require('../../__mocks__/employee');
exports.getEmployeeById = (req, res) => {
  request()
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
}*/