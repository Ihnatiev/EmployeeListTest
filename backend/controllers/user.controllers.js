const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../services/user');

exports.signup = (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.json({
      success: false,
      message: 'Please pass email and password.'
    });
  } else {
    bcrypt.hash(req.body.password, 12).then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      User.save(user,
        err => {
          if (err) {
            return res.status(500).json({
              success: false,
              message: 'Email already exists.'
            });
          }
          res.status(201).json({
            success: true,
            message: 'Successful created new user.'
          });
        });
    });
  };
};

exports.login = (req, res) => {
  var password = req.body.password;
  User.find(req.body.email,
    function (error, results) {
      var data = JSON.stringify(results);
      var secret = 'this_secret_should_be_longer';
      var jwtId = Math.random().toString(36).substring(7);
      var payload = {
        jwtId: jwtId,
        data: data
      };
      if (error) {
        res.status(404).json({
          success: false,
          message: 'There are some error with query'
        });
      } else {
        if (results.length > 0) {
          bcrypt.compare(password, results[0].password, function (err, ress) {
            if (!ress) {
              res.status(500).json({
                success: false,
                message: "Email and password does not match"
              });
            } else {
              const token = jwt.sign(payload, secret, {
                algorithm: 'HS256',
                expiresIn: '1h'
              });
              res.status(200).json({
                success: true,
                message: "Successfully Login",
                token: token
              });
            };
          });
        }
        else {
          res.status(400).json({
            success: false,
            message: "Authentication failed. User not found."
          });
        }
      }
    });
};