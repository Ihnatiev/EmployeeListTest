const sql = require('../app.js');

const User = function (user) {
  this.name = user.name;
  this.email = user.email;
  this.password = user.password;
};

User.createUser = function createUser(newUser, result) {
  sql.query("INSERT INTO User SET ?",
    newUser, (err, res) => {
      if (err) {
        result(err, null);
      }
      else {
        result(null, res.insertId);
      }
    });
};

module.exports = User;