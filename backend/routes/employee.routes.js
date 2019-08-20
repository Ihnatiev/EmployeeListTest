const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const EmployeeController = require('../controllers/employee.controllers');

router.get('', EmployeeController.displayAllEmployees);
router.post('', checkAuth, EmployeeController.createNewEmployee);

router.get('/:employeeId', EmployeeController.readAnEmployee);
router.put('/:employeeId', checkAuth, EmployeeController.updateAnEmployee);  
router.delete('/:employeeId', checkAuth, EmployeeController.deleteAnEmployee);

module.exports = router;
