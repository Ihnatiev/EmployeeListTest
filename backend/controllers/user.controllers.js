const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');

exports.create_user = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    var new_user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hash
    });
    User.createUser(new_user, function (err, user) {
      if (err) {
        res.status(500).json({
          message: 'Invalid authentication credentials!'
        });
      } else {
        res.status(201).json({
          message: 'User created!',
          result: user
        });
      };
    });
  });
};

exports.user_login = (req, res, next) => {}