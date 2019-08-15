const express = require('express');

const UserController = require('../controllers/user.controllers');

const router = express.Router();

router.post('/signup', UserController.create_user);
router.post('/login', UserController.user_login);

module.exports = router;
