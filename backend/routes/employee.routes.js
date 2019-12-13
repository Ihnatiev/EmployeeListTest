const router = require('express').Router();
const Controller = require('../controllers/employeeControllers');
const swagger = require('../swagger/employees/validator');
const checkAuth = require('../middleware/check-auth');

router.get('/', swagger.validateQuery('emp-all'), Controller.getAllEmployees);
router.get('/:employeeId', swagger.validateId('emp-id'), Controller.getEmployeeById);

router.post('/', swagger.validateBody('emp-create'), checkAuth, Controller.createEmployee);
router.put('/:employeeId', swagger.validateBody('emp-create'), checkAuth, Controller.updateEmployeeById);
router.delete('/:employeeId', swagger.validateId('emp-id'), checkAuth, Controller.deleteEmployeeById);

module.exports = router;
