const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const secret = require('../config/secret');
const userService = require('../services/userService');
const { ErrorHandler } = require('../middleware/errorHandler');

module.exports = {
  signup: (req, res) => {
    try {
      const userObj = { name, email, password } = req.body;
      userService.save(userObj,
        (newUser, error) => {
          if (newUser) {
            return res.status(201).json({
              success: true,
              message: 'User created!',
              userId: newUser
            });
          }
          if (error) {
            return res.status(500).json({
              success: false,
              message: 'This email already exists.'
            });
          };
        });
    } catch (error) {
      throw new ErrorHandler(500, 'An error occurred trying to process your request');
    };
  },

  login: async (req, res) => {
    await userService.findOne(req.body.email,
      async (error, user) => {
        if (user.length > 0) {
          const fetchedUser = user[0];
          const result = await bcrypt.compare(req.body.password, fetchedUser.password);
          if (result) {
            const token = jwt.sign({ userId: fetchedUser.id, email: fetchedUser.email },
              secret.jwtSecret, { algorithm: 'HS256', expiresIn: '1h' });
            return res.status(200).json({
              token: token,
              expiresIn: 3600,
              userId: fetchedUser.id,
              userName: fetchedUser.name
            });
          }
          if (!result) {
            return res.status(401).json({
              success: false,
              message: 'Email and password does not match'
            });
          };
        } else {
          return res.status(500).json({
            status: 'error',
            message: "Authentication failed."
          });
        };
      }
    );
  }
};

