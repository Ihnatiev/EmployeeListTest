const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user.controllers');

router.post('/signup', UserController.create_user);
router.post('/login', UserController.user_login);

// "name": "John Smith",
// 	"email": "smith@test.com",
// 	"password": "test1smith"

// "name": "Bob Marley",
// "email": "bob_marley@test.com",
// "password": "bobbyMar123"
module.exports = router;
