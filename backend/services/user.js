const sql = require('../config/connection');
const User = require('../models/user.model');

User.save = function signup(user, result) {
  sql.query("INSERT INTO Users SET ?", user,
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
  sql.query("SELECT * FROM Users WHERE email = ?", [email],
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