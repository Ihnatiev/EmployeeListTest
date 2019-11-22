const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secret = require('../config/secret');
const UserService = require('../services/userService');
const UserModel = require('../models/user.model');

module.exports = {
  signup: (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
      return res.status(400).json({
        success: false,
        message: 'Please pass name, email and password.'
      });
    } else {
      try {
        const cryptPass = bcrypt.hashSync(req.body.password, 10);
        const userObj = new UserModel({
          name: req.body.name,
          email: req.body.email,
          password: cryptPass
        });
        UserService.save(userObj,
          (err, userId) => {
            if (err) {
              return res.status(500).json({
                success: false,
                message: 'Database error',
                error: err.code
              });
            }
            return res.status(201).json({
              success: true,
              message: 'User created!',
              userId: userId
            });
          });
      } catch (error) {
        res.status(500).json({
          message: 'Invalid authentication credentials!'
        });
      };
    };
  },

  login: async (req, res) => {
    let fetchedUser;
    var email = req.body.email;
    var password = req.body.password;
    await UserService.find(email,
      async (error, user) => {
        fetchedUser = user[0];
        if (user.length > 0) {
          const result = await bcrypt.compare(password, fetchedUser.password);
          if (!result) {
            res.status(401).json({
              success: false,
              message: 'Email and password does not match'
            });
          } else {
            const token = jwt.sign({
              userId: fetchedUser.id,
              email: fetchedUser.email
            },
              secret.jwtSecret, {
              algorithm: 'HS256',
              expiresIn: '1h'
            });
            return res.status(200).json({
              token: token,
              expiresIn: 3600,
              userId: fetchedUser.id,
              userName: fetchedUser.name
            });
          };
        } else {
          res.status(500).json({
            success: false,
            message: "Authentication failed."
          });
        };
      }
    );
  }
};

