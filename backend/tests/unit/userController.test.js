jest.mock('../../services/userService');
const controller = require('../../controllers/userControllers');
const service = require('../../services/userService');

const mockRequest = (sessionData, body) => ({
  session: { data: sessionData },
  body,
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const req = mockRequest(
  {},
  {
    name: 'Peter',
    email: 'smith@mail.ru',
    password: 'jsmith'
  }
);

const res = mockResponse();

describe('USER SIGNUP', () => {
  describe('test body request', () => {
    test('should return status 400 if name is missing from body', () => {
      var req = mockRequest(
        {},
        { email: 'boss@mail.com', password: 'boss' }
      );
      controller.signup(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Please pass name, email and password.'
      });
    });
    test('should return status 400 if email is missing from body', () => {
      var req = mockRequest(
        {},
        { name: 'Bob', password: 'boss' }
      );
      controller.signup(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Please pass name, email and password.'
      });
    });
    test('should return status 400 if password is missing from body', () => {
      var req = mockRequest(
        {},
        { name: 'Bob', email: 'boss@mail.com' }
      );
      controller.signup(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Please pass name, email and password.'
      });
    });
  });
  describe('test user creation', () => {
    test('should return status 201 if user created successfully', async () => {
      const expectedUser = {
        name: 'Peter',
        email: 'smith@mail.ru',
        password: expect.anything()
      };

      jest.spyOn(service, "save").mockImplementation((user, result) => {
        return result(null, 2);
      });

      await controller.signup(req, res);

      expect(service.save).toHaveBeenCalledTimes(1);
      expect(service.save).toBeCalledWith(expectedUser, expect.anything());
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'User created!',
        userId: 2
      });
    });

    test('should return status 500 if error from database', async () => {
      jest.spyOn(service, "save").mockImplementation((err, result) => {
        return result(err, null);
      });

      await controller.signup(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Database error'
      });
    });

    test('should return status 500 if error from server', async () => {
      jest.spyOn(service, "save").mockImplementation((result) => {
        return result();
      });

      await controller.signup(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Invalid authentication credentials!'
      });
    });
  });
});

/*
describe('login', () => {
  test('should be error if a part of query is ampty', () => {
    // const req = mockRequest(
    //   {},
    //   { name: 'Bob', password: '' }
    // );
    // const res = mockResponse();
    // controller.login(req, res);
    // expect(res.status).toHaveBeenCalledWith(500);
    // expect(res.json).toHaveBeenCalledWith({
    //   success: false,
    //   message: 'There are some error with query'
    // });
  });
  test('should 401 with message if passed email and password does not match', () => {
    // const req = mockRequest(
    //   {},
    //   {
    //     email: 'boss@mail.com',
    //     password: 'not-good-password'
    //   }
    // );
    // const res = mockResponse();
    // controller.login(req, res);
    // expect(res.status).toHaveBeenCalledWith(401);
    // expect(res.json).toHaveBeenCalledWith({
    //   success: false,
    //   message: "Email and password does not match"
    // });
  });
  test('should user login with token', () => {

  });
  test('should be authentication failed', () => {

  });
});
*/

