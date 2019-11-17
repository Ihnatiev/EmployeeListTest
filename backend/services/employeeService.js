const sql = require('../config/connection');
const Promise = require('bluebird');
const connection = require('../config/connection');
const Employee = require('../models/employee.model');

var queryAsync = Promise.promisify(connection.query.bind(connection));

Employee.getCount = async function () {
  var result = queryAsync("SELECT count(*) as totalCount FROM Employee");
  return result;
}

Employee.findAll = async function (numPerPage, page) {

  var skip = page * numPerPage;
  var end_limit = numPerPage;
  var limit = skip + ',' + end_limit;

  var queryResults = queryAsync("SELECT empID, empName, creator, IF(empActive, 'Yes', 'No')\
    empActive, dpName FROM Employee\
    INNER JOIN Department ON empDepartment = dpID LIMIT " + limit)
  let results = [];
  results = queryResults.map(m => {
    return m;
  });
  return results;
}

Employee.create = function (employee, result) {
  sql.query("INSERT INTO Employee SET empName = ?,\
  empActive = ?, empDepartment = ?, creator = ?",
    [
      employee.empName,
      employee.empActive,
      employee.empDepartment,
      employee.creator
    ],
    (err, res) => {
      if (err) throw err;
      result(res.insertId);
    });
  return employee
}

Employee.find = async function (employeeId) {
  var result = queryAsync(
    "SELECT empID, empName,\
    IF(empActive, 'Yes', 'No')\
    empActive, dpName FROM Employee\
    INNER JOIN Department\
    ON empDepartment = dpID WHERE empID = ? ",
    employeeId);
  return result;
}

Employee.update = function (id, creator, employee, result) {
  sql.query(
    "UPDATE Employee SET ? where empID = ? AND creator = ?",
    [employee, id, creator], (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    });
}

Employee.delete = function (id, creator, result) {
  sql.query(
    "DELETE FROM Employee WHERE empID = ? AND creator = ?",
    [id, creator], (err, res) => {
      if (err) {
        result(null, err);
      } else {
        result(null, res);
      }
    });
}

module.exports = Employee;