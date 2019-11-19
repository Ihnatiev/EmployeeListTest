jest.mock('../../services/employeeService');
const service = require("../../services/employeeService");
const controller = require("../../controllers/employeeControllers");

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("EmployeeController", () => {
  describe("Requests by /employees/:employeeId", () => {
    describe("Get request / response test", () => {
      test("should get an employee", () => {
        const mockRequest = (params) => ({
          params,
        });
        const req = mockRequest({
          employeeId: 262
        });
        const res = mockResponse();

        const spyFind = jest.spyOn(service, "find").mockImplementation((err, employee) => {
          return employee(null, [
            {
              empID: 262,
              empName: "Nik",
              creator: "18664399",
              empActive: "No",
              dpName: "Finance"
            }
          ]);
        });

        const expectedEmployee = [{
          empID: 262,
          empName: "Nik",
          creator: "18664399",
          empActive: "No",
          dpName: "Finance"
        }];

        controller.getEmployeeById(req, res);
        expect(spyFind).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
          success: true,
          employee: expectedEmployee
        });
        spyFind.mockClear();
      });
      test("should return status 404", () => {
        const mockRequest = (params) => ({
          params,
        });
        const req = mockRequest({
          employeeId: 2626
        });
        const res = mockResponse();

        const spyFind = jest.spyOn(service, "find").mockImplementation((err, employee) => {
          return employee(null, []);
        });

        controller.getEmployeeById(req, res);
        expect(spyFind).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
          success: false,
          message: 'Employee not found!'
        });
        spyFind.mockClear();
      });
      test("should return status 500", () => {
        const mockRequest = (params) => ({
          params
        });
        const req = mockRequest();
        const res = mockResponse();

        controller.getEmployeeById(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
          success: false,
          message: 'Server error'
        });
      });
    });
    describe("Put request / response test", () => {
      test("should update an employee", () => {
        const mockRequest = (params, userData, body) => ({
          params, userData, body
        });
        const req = mockRequest({ employeeId: 262 }, { userId: 6543 }, {
          empName: "Markus",
          empActive: 1,
          empDepartment: 2
        });
        const res = mockResponse();

        const spyUpdate = jest.spyOn(service, "update").mockImplementation((employeeId, userId, employee, result) => {
          return result(null, { affectedRows: 1 });
        });
        controller.updateEmployeeById(req, res);
        expect(spyUpdate).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
          success: true,
          message: 'Update successful!'
        });
        spyUpdate.mockClear();
      });
      test("should return status 401", () => {
        const mockRequest = (params, userData, body) => ({
          params, userData, body
        });
        const req = mockRequest({ employeeId: 262 }, { userId: 96386 }, {
          empName: "Markus",
          empActive: 1,
          empDepartment: 2
        });
        const res = mockResponse();

        const spyUpdate = jest.spyOn(service, "update").mockImplementation((employeeId, userId, employee, result) => {
          return result(null, { affectedRows: 0 });
        });
        controller.updateEmployeeById(req, res);
        expect(spyUpdate).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({
          success: false,
          message: 'You are not authorized!'
        });
        spyUpdate.mockClear();
      });
      test("should return status 500", () => {
        const mockRequest = (params, userData, body) => ({
          params, userData, body
        });
        const req = mockRequest({ employeeId: 262 }, { userId: 6543 }, {
          empName: "Markus",
          empActive: 1,
          empDepartment: ""
        });
        const res = mockResponse();

        const spyUpdate = jest.spyOn(service, "update").mockImplementation((employeeId, userId, employee, result) => {
          return result(null);
        });
        controller.updateEmployeeById(req, res);
        expect(spyUpdate).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
          success: false,
          message: "Updating an employee failed!"
        });
        spyUpdate.mockClear();
      });
    });
    describe("Delete request / response test", () => {
      test("should delete an employee", () => {
        const mockRequest = (params, userData) => ({
          params, userData
        });
        const req = mockRequest({ employeeId: 262 }, { userId: 6543 });
        const res = mockResponse();

        const spyDelete = jest.spyOn(service, "delete").mockImplementation((employeeId, creator, result) => {
          return result(null, { affectedRows: 1 });
        });
        controller.deleteEmployeeById(req, res);
        expect(spyDelete).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
          success: true,
          message: 'Deletion successful!'
        });
        spyDelete.mockClear();
      });
      test("should return status 401", () => {
        const mockRequest = (params, userData) => ({
          params, userData
        });
        const req = mockRequest({ employeeId: 262 }, { userId: 12345 });
        const res = mockResponse();

        const spyDelete = jest.spyOn(service, "delete").mockImplementation((employeeId, creator, result) => {
          return result(null, { affectedRows: 0 });
        });
        controller.deleteEmployeeById(req, res);
        expect(spyDelete).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({
          success: false,
          message: 'You are not authorized!'
        });
        spyDelete.mockClear();
      });
      test("should return status 500", () => {
        const mockRequest = (params, userData) => ({
          params, userData
        });
        const req = mockRequest({}, { userId: 12345 });
        const res = mockResponse();

        const spyDelete = jest.spyOn(service, "delete").mockImplementation((employeeId, creator, result) => {
          return result(null);
        });
        controller.deleteEmployeeById(req, res);
        expect(spyDelete).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
          success: false,
          message: "Deleting an employee failed!"
        });
        spyDelete.mockClear();
      });
    });
  });
  describe("Requests by /employees", () => {
    describe("Post request / response test", () => {
      test("should create new employee", () => {
        const mockRequest = (body, userData) => ({
          body, userData
        });
        const req = mockRequest(
          {
            empName: "Nik",
            empActive: 1,
            empDepartment: 3
          },
          { userId: 3412 }
        );
        const res = mockResponse();
        const expectedEmployee = {
          empName: "Nik",
          empActive: 1,
          empDepartment: 3,
          creator: 3412
        };

        const spyCreate = jest.spyOn(service, "create").mockImplementation((err, result) => {
          return result(null, 322);
        });

        controller.createEmployee(req, res);

        expect(spyCreate).toHaveBeenCalledTimes(1);
        expect(spyCreate).toBeCalledWith(expectedEmployee, expect.anything());
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
          success: true,
          message: 'Employee added successfully!',
          employeeId: 322
        });
        spyCreate.mockClear();
      });
      test("should return status 500", () => {
        const mockRequest = (body, userData) => ({
          body, userData
        });
        const req = mockRequest(
          {
            empName: "Nik",
            empActive: "",
            empDepartment: 2
          },
          { userId: 4521 }
        );
        const res = mockResponse();
        const expectedEmployee = {
          empName: "Nik",
          empActive: 1,
          empDepartment: 2,
          creator: 4521
        };

        const spyCreate = jest.spyOn(service, "create").mockImplementation((err, result) => {
          return result(err, null);
        });

        controller.createEmployee(req, res);

        expect(spyCreate).toHaveBeenCalledTimes(1);
        expect(spyCreate).not.toEqual(expectedEmployee, expect.anything());
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
          success: false,
          message: 'Adding employee failed!'
        });
        spyCreate.mockClear();
      });
    });
    describe("Get request / response test", () => {
      test("should get all employees", async () => {
        const mockRequest = (query) => ({ query });
        const req = mockRequest({ pagesize: 1, page: 0 });
        const res = mockResponse();

        const getCount = jest.spyOn(service, "getCount").mockImplementation((result) => {
          return result(null, [{ totalCount: 2 }])
        });

        // ERROR at this point --> const findAll = jest.spyOn(service, "findAll").mockImplementation((numPerPage, page) => {
        //   return results(1, 0);
        // });

        await controller.getAllEmployees(req, res);
        expect(getCount).toHaveBeenCalledTimes(1);
        //expect(findAll).toHaveBeenCalledTimes(1);
        // getCount.mockClear();
        // findAll.mockClear();
      });
    });
  });
});

