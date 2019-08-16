const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user.controllers');

router.post('/signup', UserController.create_user);
router.post('/login', UserController.user_login);

module.exports = router;
