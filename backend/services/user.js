const sql = require('../config/connection');
const User = require('../models/user.model');

User.save = function signup(user, result) {
  sql.query("INSERT INTO User SET ?", user,
    (err, res) => {
      if (err) {
        result(err, null);
      }
      else {
        result(null, res);
      }
    });
};

User.find = function login(email, result) {
  sql.query("SELECT * FROM User WHERE email = ?", [email],
    (err, res) => {
      if (err) {
        result(err, null);
      }
      else {
        result(null, res);
      }
    });
};

module.exports = User;