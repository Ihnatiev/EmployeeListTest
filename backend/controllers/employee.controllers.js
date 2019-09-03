const Employee = require('../services/employee');
const Promise = require('bluebird');
const connection = require('../config/connection');

var queryAsync = Promise.promisify(connection.query.bind(connection));

exports.getAllEmployees = (req, res) => {
  var numRows;
  var numPages;
  var numPerPage = parseInt(req.query.npp, 10) || 5;
  var page = parseInt(req.query.page, 10) || 0;
  var skip = page * numPerPage;
  var end_limit = numPerPage;
  var limit = skip + ',' + end_limit;
  queryAsync('SELECT count(*) as numRows FROM Employee')
    .then((results) => {
      numRows = results[0].numRows;
      numPages = Math.ceil(numRows / numPerPage);
    })
    .then(() => queryAsync("SELECT empID, empName, IF(empActive, 'Yes', 'No')\
  empActive, dpName FROM Employee\
  INNER JOIN Department ON empDepartment = dpID  LIMIT " + limit))
    .then((results) => {
      var responsePayload = {
        results: results
      };
      if (page < numPages) {
        responsePayload.pagination = {
          previous: page > 0 ? page - 1 : undefined,
          current: page,
          perPage: numPerPage,
          next: page < numPages - 1 ? page + 1 : undefined
        }
      }
      else responsePayload.pagination = {
        err: 'queried page ' + page + ' is >= to maximum page number ' + numPages
      }
      res.status(200).json(responsePayload);
    })
    .catch((err) => {
      res.status(500).json({ err: err });
    });
};

exports.createAnEmployee = (req, res) => {
  var newEmp = new Employee(req.body);
  Employee.newEmployee(newEmp,
    (err, employee) => {
      if (err) {
        res.status(500).json({
          success: false,
          message: 'Adding employee failed!'
        });
      } else {
        res.status(201).json({
          success: true,
          message: 'Employee added successfully!',
          employee: employee
        });
      };
    });
};

exports.getEmployeeById = (req, res) => {
  Employee.getEmpById(req.params.employeeId,
    (err, employee) => {
      if (err) {
        res.status(404).json({
          success: false,
          message: 'Employee not found!'
        });
      } else {
        res.status(200).json({
          success: true,
          employee: employee
        });
      };
    });
};

exports.updateEmployeeById = (req, res, next) => {
  Employee.updateEmpById(req.params.employeeId,
    new Employee(req.body),
    (err, employee) => {
      if (err) {
        res.status(404).json({
          success: false,
          message: 'Employee not found!'
        });
      } else {
        res.status(200).json({
          success: true,
          message: 'Update successful!',
          employee: employee
        });
      };
    });
};

exports.deleteEmployeeById = (req, res) => {
  Employee.removeEmpById(req.params.employeeId,
    (err, result) => {
      if (err) {
        res.status(500).json({
          success: false,
          message: 'Deleting posts failed!'
        });
      } else if (result)
        res.status(200).json({
          success: true,
          message: 'Deletion successful!'
        });
    });
};

