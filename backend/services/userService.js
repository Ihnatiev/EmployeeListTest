const sql = require('../config/connection');
const UserModel = require('../models/user.model');

UserModel.save = function signup(userId, result) {
  sql.query("INSERT INTO Users SET ?", userId,
    (err, res) => {
      if (err) {
        result(err, null);
      }
      else {
        result(null, res.insertId);
      }
    });
};

UserModel.find = function login(email, result) {
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

module.exports = UserModel;

