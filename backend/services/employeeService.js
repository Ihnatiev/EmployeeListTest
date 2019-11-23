const sql = require('../config/connection');
const Bluebird = require('bluebird');
const EmployeeModel = require('../models/employee.model');

var queryAsync = Bluebird.promisify(sql.query.bind(sql));

EmployeeModel.getCount = async function () {
  var result = queryAsync("SELECT count(*) as totalCount FROM Employee");
  return result;
}

EmployeeModel.findAll = async function (numPerPage, page) {

  var skip = page * numPerPage;
  var end_limit = numPerPage;
  var limit = skip + ',' + end_limit;

  var queryResults = queryAsync("SELECT empID, empName, creator,\
    IF(empActive, 'Yes', 'No')\
    empActive, dpName FROM Employee\
    INNER JOIN Department ON empDepartment = dpID LIMIT " + limit)
  let results = [];
  results = queryResults.map(m => {
    return m;
  });
  return results;
}

EmployeeModel.create = function (employee, result) {
  sql.query("INSERT INTO Employee SET empName = ?,\
  empActive = ?, empDepartment = ?, creator = ?",
    [
      employee.empName,
      employee.empActive,
      employee.empDepartment,
      employee.creator
    ],
    (err, res) => {
      if (err) {
        result(err, null);
      }
      else {
        result(null, res.insertId);
      }
    });
}

EmployeeModel.find = function (employeeId, result) {
  sql.query(
    "SELECT empID, empName,\
    IF(empActive, 'Yes', 'No')\
    empActive, dpName FROM Employee\
    INNER JOIN Department\
    ON empDepartment = dpID WHERE empID = ? ", employeeId,
    (err, res) => {
      if (err) {
        result(err, null);
      }
      else {
        result(null, res);
      }
    });
}

EmployeeModel.update = function (employeeId, userId, employee, result) {
  sql.query(
    "UPDATE Employee SET ? where empID = ? AND creator = ?",
    [employee, employeeId, userId], (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    });
}

EmployeeModel.delete = function (employeeId, creator, result) {
  sql.query(
    "DELETE FROM Employee WHERE empID = ? AND creator = ?",
    [employeeId, creator], (err, res) => {
      if (err) {
        result(null, err);
      } else {
        result(null, res);
      }
    });
}

module.exports = EmployeeModel;