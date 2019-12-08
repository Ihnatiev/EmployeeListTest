const router = require('express').Router();
const EmployeeController = require('../controllers/employeeControllers');
const checkAuth = require('../middleware/check-auth');

router.route('/')
  .post(checkAuth, EmployeeController.createEmployee);

router.route('/')
  .get(EmployeeController.getAllEmployees);

router.route('/:employeeId')
  .get(EmployeeController.getEmployeeById)
  .put(checkAuth, EmployeeController.updateEmployeeById)
  .delete(checkAuth, EmployeeController.deleteEmployeeById);

module.exports = router;
