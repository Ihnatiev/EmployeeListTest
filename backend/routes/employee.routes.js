const express = require('express');
const router = express.Router();

const EmployeeController = require('../controllers/employee.controllers');

const checkAuth = require('../middleware/check-auth');

router.get('/', EmployeeController.getAllEmployees);

router.post('/', checkAuth, EmployeeController.createAnEmployee);

router.get('/:employeeId', EmployeeController.getEmployeeById);

router.put('/:employeeId', checkAuth, EmployeeController.updateEmployeeById);

router.delete('/:employeeId', checkAuth, EmployeeController.deleteEmployeeById);


module.exports = router;
