const mysql = require('mysql');
// const Promise = require('bluebird');

//local mysql db connection
var connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '159357',
  database: 'EmployeeDB',
  multipleStatements: true
});

// const queryAsync = Promise.promisify(connection.query.bind(connection));
// connection.connect();

// process.stdin.resume()
// process.on('exit', exitHandler.bind(null, { shutdownDb: true } ));

connection.connect((err) => {
  if (!err) {
    console.log('DB connection succeded.');
  } else {
    console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
  }
});

// app.get('http://localhost:3002/api/employees', function (req, res) {
//   var numRows;
//   var queryPagination;
//   var numPerPage = parseInt(req.query.npp, 10) || 1;
//   var page = parseInt(req.query.page, 10) || 0;
//   var numPages;
//   var skip = page * numPerPage;
// // console.log(req.query);  
// // console.log(page)
// // console.log(numPerPage);
// // console.log(skip);
// // Here we compute the LIMIT parameter for MySQL query
// var end_limit = numPerPage; 
//  var limit = skip + ',' + end_limit;
// console.log(limit);
// console.log("SELECT * FROM Employee DESC LIMIT " + limit);
//   queryAsync('SELECT count(*) as numRows FROM Employee')
//   .then(function(results) {
//     numRows = results[0].numRows;
//     numPages = Math.ceil(numRows / numPerPage);
//     console.log('number of pages:', numPages);
//   })
//   .then(() => queryAsync('SELECT * FROM Employee DESC LIMIT ' + limit))
//   .then(function(results) {
//     var responsePayload = {
//       results: results
//     };
//     if (page < numPages) {
//       responsePayload.pagination = {
//         current: page,
//         perPage: numPerPage,
//         previous: page > 0 ? page - 1 : undefined,
//         next: page < numPages - 1 ? page + 1 : undefined
//       }
//     }
//     else responsePayload.pagination = {
//       err: 'queried page ' + page + ' is >= to maximum page number ' + numPages
//     }
//     res.json(responsePayload);
//   })
//   .catch(function(err) {
//     console.error(err);
//     res.json({ err: err });
//   });
// });

// function exitHandler(options, err) {
//   if (options.shutdownDb) {
//     console.log('shutdown mysql connection');
//     connection.end();
//   }
//   if (err) console.log(err.stack);
//   if (options.exit) process.exit();
// }

module.exports = connection;
