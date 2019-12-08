jest.mock('mysql');
//jest.mock('../../../models/employee.model');
const mysql = require('mysql');
const service = require('../../../services/employeeService');
const employeeModel = require('../../../models/employee.model');

const mockOptions = {
  host: '127.0.0.1',
  user: 'root',
  password: '159357',
  database: 'EmployeeDB',
  multipleStatements: true
};

describe('EmployeeService', () => {
  test('Can mock createConnection', () => {
    mysql.createConnection.mockImplementation(() => mysql.createConnection(mockOptions));
    
    const query = "SELECT count(*) FROM Employee"

    
    
  });
});

