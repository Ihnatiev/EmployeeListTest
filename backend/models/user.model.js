const sql = require('../config/connection');

const User = function (user) {
  this.email = user.email;
  this.password = user.password;
};

// User.create_user = function createUser(user, result) {
//   sql.query("INSERT INTO User(`email`,`password`) \
//   VALUES ('" + email + "','" + encrypted_password + "')", user,
//     (err, res) => {
//       if (err) {
//         result(err, null);
//       }
//       else {
//         result(null, res);
//       }
//     });
// };

// User.findOne = function findUser(email, password, result) {
//   sql.query("SELECT `email`, `password` FROM User WHERE `email` = ?",
//     email, password,
//     function (err, res) {
//       if (err) {
//         throw err;
//       } else {
//         result(null, res);
//       }
//     });
// };

module.exports = User;