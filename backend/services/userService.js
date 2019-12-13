const uuid = require('uuid');
const bcrypt = require('bcryptjs');
const sql = require('../config/connection');
const UserModel = require('../models/user.model');

UserModel.save = function (userObj, result) {
  const user = new UserModel({
    id: uuid(),
    name: userObj.name,
    email: userObj.email,
    password: bcrypt.hashSync(userObj.password, 10)
  });
  sql.query("INSERT INTO EmployeeDB.Users SET ?", [user],
    (err, res) => {
      if (err) {
        result(null, err);
      }
      else {
        result(user.id, null);
      }
    });
}

UserModel.findOne = function (email, result) {
  sql.query("SELECT * FROM EmployeeDB.Users WHERE email = ?", [email],
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

