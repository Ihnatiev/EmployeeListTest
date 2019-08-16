const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');

exports.create_user = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hash
      });
      User.createUser(user, function (err, insertId) {
        if (err) {
          res.status(500).json({
            message: 'Invalid authentication credentials!'
          });
        } else {
          res.status(201).json({
            message: 'User created!',
            result: 'Id: ' + insertId
          });
        };
      });
    }).catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.user_login = (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: 'Auth failed'
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: 'Auth failed'
        });
      }
      const token = jwt.sign(
        {
          name: fetchedUser.name,
          email: fetchedUser.email,
          id: fetchedUser._id
        },
        'secret_this_should_be_longer',
        { expiresIn: '1h' }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        id: fetchedUser._id
      });
    })
    .catch(err => {
      return res.status(500).json({
        message: 'Invalid authentication credentials!',
        error: err
      });
    });
}