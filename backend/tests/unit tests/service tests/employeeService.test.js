jest.mock('mysql');
jest.mock('../../../models/employee.model')
const mysql = require('mysql');
const Bluebird = require('bluebird');
const service = require('../../../services/employeeService');
const employeeModel = require('../../../models/employee.model');

const mockOptions = {
  host: '127.0.0.1',
  user: 'root',
  password: '159357',
  database: 'EmployeeDB',
  multipleStatements: true
}

const thms = 124;

describe('Testing how Mocking works', () => {
  test('Can mock createConnection', () => {
    mysql.createConnection.mockImplementation(() => mysql.createConnection(mockOptions));
    // getData().then((data) => {
    //   expect(data).toBe(thms);
    // })
    const query = "SELECT count(*) as totalCount FROM Employee";
    const spyQuery = jest.spyOn(Bluebird, "promisify").mockImplementation(query);

    
  })
})

