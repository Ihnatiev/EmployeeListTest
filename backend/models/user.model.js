const sql = require('../config/connection');

const User = function (user) {
  this.email = user.email;
  this.password = user.password;
};

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