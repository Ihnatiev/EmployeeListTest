const Employee = require('../services/employee');
const Promise = require('bluebird');
const connection = require('../config/connection');

var queryAsync = Promise.promisify(connection.query.bind(connection));

exports.getAllEmployees = (req, res) => {
  var totalCount;
  var totalPages;
  var numPerPage = +req.query.pagesize;
  var page = +req.query.page;
  var skip = page * numPerPage;
  var end_limit = numPerPage;
  var limit = skip + ',' + end_limit;
  queryAsync('SELECT count(*) as totalCount FROM Employee')
    .then((results) => {
      totalCount = results[0].totalCount;
      totalPages = Math.ceil(totalCount / numPerPage);
    })
    .then(() => queryAsync("SELECT empID, empName, creator, IF(empActive, 'Yes', 'No')\
    empActive, dpName FROM Employee\
    INNER JOIN Department ON empDepartment = dpID LIMIT " + limit))
    .then((results) => {
      let responsePayload = {
        employees: results,
        maxEmployees: totalCount
      };
      if (page < totalPages) {
        responsePayload.pagination = {
          previous: page > 0 ? page - 1 : undefined,
          current: page,
          next: page < totalPages - 1 ? page + 1 : undefined,
          perPage: numPerPage,
          totalPages: totalPages,
          maxEmployees: totalCount
        }
      }
      else responsePayload.pagination = {
        err: 'queried page ' + page + ' is >= to maximum page number ' + totalPages
      }
      res.status(200).json(responsePayload);
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: 'Server error'
      });
    });

};

exports.createAnEmployee = (req, res) => {
  var newEmp = new Employee({
    empName: req.body.empName,
    empActive: req.body.empActive,
    empDepartment: req.body.empDepartment,
    creator: req.userData.userId
  });
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
  Employee.updateEmpById(req.params.employeeId, req.userData.userId,
    new Employee({
      empName: req.body.empName,
      empActive: req.body.empActive,
      empDepartment: req.body.empDepartment,
      creator: req.userData.userId
    }),
    (err, employee) => {
      if (employee.affectedRows > 0) {
        res.status(200).json({
          message: 'Update successful!'
        });
      } else {
        res.status(401).json({
          message: 'Not authorizeted!'
        });
      }
    });
};

exports.deleteEmployeeById = (req, res, next) => {
  Employee.removeEmpById(req.params.employeeId, req.userData.userId,
    (err, result) => {
      try {
        if (result.affectedRows > 0) {
          res.status(200).json({
            message: 'Deletion successful!'
          });
        } else {
          res.status(401).json({
            message: 'Not authorizeted!'
          });
        }
      } catch (error) {
        res.status(500).json({
          message: "You are not authenticated!"
        });
      }
    });
};

