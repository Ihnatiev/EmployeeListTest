const express = require('express');
const router = express.Router();
const swagger = require('../swagger/user/validator');
const {checkUserCreate, checkUserLogin} = require('../middleware/checkUser');
const userController = require('../controllers/userControllers');

router.post('/signup', swagger.validateBody('new-user'), checkUserCreate, userController.signup);
router.post('/login', swagger.validateBody('user-login'), checkUserLogin, userController.login);

module.exports = router;

