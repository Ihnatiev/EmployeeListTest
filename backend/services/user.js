const sql = require('../config/connection');
const User = require('../models/user.model');

User.create_user = function createUser(user, result) {
  sql.query("INSERT INTO User SET ?", user,
    (err, res) => {
      if (err) {
        result(err, null);
      }
      else {
        result(res);
      }
    });
};

module.exports = User;