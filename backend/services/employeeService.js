const sql = require('../config/connection');
const Bluebird = require('bluebird');
const EmployeeModel = require('../models/employee.model');

const queryAsync = Bluebird.promisify(sql.query.bind(sql));

EmployeeModel.getCount = async function () {
  const result = queryAsync(`SELECT count(*) as totalCount FROM EmployeeDB.Employees`);
  return result;
}

EmployeeModel.findAll = async function (numPerPage, page) {

  const skip = page * numPerPage;
  const end_limit = numPerPage;
  const limit = skip + ',' + end_limit;

  const queryResults = queryAsync(`SELECT empID, empName, creator,
    IF(empActive, 'Yes', 'No')
    empActive, dpName FROM EmployeeDB.Employees
    INNER JOIN EmployeeDB.Departments ON empDepartment = dpID ORDER BY empID LIMIT ` + limit)
  let results = [];
  results = queryResults.map(m => {
    return m;
  });
  return results;
}

EmployeeModel.create = function (emp, creator, result) {
  const employee = new EmployeeModel({
    empName: emp.empName,
    empActive: emp.empActive,
    empDepartment: emp.empDepartment,
    creator: creator
  });
  sql.query(`INSERT INTO EmployeeDB.Employees SET ?`,
    [employee],
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
    `SELECT empID, empName,
    IF(empActive, 'Yes', 'No')
    empActive, dpName FROM EmployeeDB.Employees
    INNER JOIN EmployeeDB.Departments
    ON empDepartment = dpID WHERE empID = ?`, employeeId,
    (err, res) => {
      if (err) {
        result(err, null);
      }
      else {
        result(null, res);
      }
    });
}

EmployeeModel.update = function (employeeId, creator, emp, result) {
  const employee = new EmployeeModel({
    empName: emp.empName,
    empActive: emp.empActive,
    empDepartment: emp.empDepartment,
    creator: creator
  });
  sql.query(
    `UPDATE EmployeeDB.Employees SET ? where empID = ? AND creator = ?`,
    [employee, employeeId, creator], (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    });
}

EmployeeModel.delete = function (employeeId, creator, result) {
  sql.query(
    `DELETE FROM EmployeeDB.Employees WHERE empID = ? AND creator = ?`,
    [employeeId, creator], (err, res) => {
      if (err) {
        result(null, err);
      } else {
        result(null, res);
      }
    });
}

module.exports = EmployeeModel;