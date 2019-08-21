const sql = require('../config/connection');
const atob = require('atob');
const jwt = require('jsonwebtoken');
const Cryptr = require('cryptr'),
  cryptr = new Cryptr('myTotalySecretKey');

exports.signup = (req, res, next) => {
  var email = req.body.email;
  var password = req.body.password;
  var dec_password = atob(password);
  var encrypted_password = cryptr.encrypt(dec_password);

  sql.query("INSERT INTO User(`email`,`password`) \
    VALUES ('" + email + "','" + encrypted_password + "')",
    function (err) {
      if (err) {
        res.status(500).json({
          error: 'An error occurred'
        });
      } else {
        res.status(201).json({
          message: 'User created!'
        });
      };
    });
};

exports.login = (req, res, next) => {
  var email = req.body.email;

  sql.query("SELECT email, password FROM\
  User WHERE email = '"+ email + "'",
    function (err, results) {

      if (results == "") {
        res.status(500).json({
          message: "Not a user"
        });
      } else if (results != "") {

        var data = JSON.stringify(results);
        var secret = 'secret_this_should_be_longer';
        var jwtId = Math.random().toString(36).substring(7);
        var payload = {
          jwtid: jwtId,
          data: data
        };

        jwt.sign(payload, secret, {
          algorithm: 'HS256',
          expiresIn: '1h'
        }, function (err, token) {

          if (err) {
            return false;

          } else if (token != false) {
            res.status(200).json({
              "results":
                { status: "true" },
              token: token
            });
            // res.end();
          } else {
            res.send("Could not create token");
            res.end();
          }
        });
      }
    });
};