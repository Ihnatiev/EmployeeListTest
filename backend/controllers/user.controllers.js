const sql = require('../config/connection');
// const atob = require('atob');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// const Cryptr = require('cryptr'),
//   cryptr = new Cryptr('myTotalySecretKey');

const User = require('../models/user.model');

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash
    });
    User.create_user(user, result => {
        res.status(201).json({
          message: 'User created!',
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          message: 'Invalid authentication credentials!'
        });
      });
  });
};

exports.login = (req, res, next) => {
  var email = req.body.email;

  sql.query("SELECT email, password FROM\
  User WHERE email = '"+ email +"' ",
    function (err, results) {
      if (results != "") {

        var data = JSON.stringify(results);
        var secret = 'this_secret_should_be_longer';
        var jwtId = Math.random().toString(36).substring(7);
        var payload = {
          data: data,
          jwtid: jwtId
        };
        var token = jwt.sign(payload, secret, {
          algorithm: 'HS256',
          expiresIn: '1h',
        });
        res.status(200).json({
          // data: results,
          token: token
        });
        res.end();
      } else if (results == "") {
        res.status(500).json({
          message: "Not a user"
        });
      };
    });
};