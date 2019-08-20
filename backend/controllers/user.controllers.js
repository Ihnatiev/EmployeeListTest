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
  var password = req.body.password;
  var dec_password = atob(password);
  var encrypted_password = cryptr.encrypt(dec_password);

  sql.query("SELECT email, password FROM\
  `user` WHERE email = '"+ email + "'",
    function (err, results) {
      if (results != "") {
        var data = JSON.stringify(results);
        var jwtId = Math.random().toString(36).substring(7);
        var payload = {
          jwtid: jwtId,
          audience: 'TEST',
          data: data
        };
        jwt.sign(payload, 'secret_this_should_be_longer', { 
          algorithm: 'HS256', 
          expiresIn: '1h' 
        },
          function (err, token) {
            if (err) {
              res.json({
                "results":
                {
                  "status": false,
                  "msg": 'Error occurred while generating token'
                }
              });
            } else {
              if (token != false) {
                res.header();
                res.json({
                  "results":
                  {
                    "status": true,
                    "token": token,
                    "user": results[0]
                  }
                });
                res.end();
              }
              else {
                res.json({
                  "results":
                    { "status": false, "msg": 'Could not create token' },
                });
                res.end();
              }
            }
          });
      }
      else if (results == "") {
        res.json({
          "results":
            { "status": false, "msg": 'Not found User!' }
        });
        res.end();
      }
    });
};