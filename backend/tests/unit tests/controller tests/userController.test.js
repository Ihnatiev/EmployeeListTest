jest.mock('../../../services/userService');
const controller = require('../../../controllers/userControllers');
const service = require('../../../services/userService');

const mockRequest = (body) => ({
  body
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('UserController', () => {
  describe('SignUp', () => {
    test('should return status 201 if user created successfully', () => {
      const req = mockRequest(
        {
          name: 'Peter',
          email: 'smith@mail.ru',
          password: 'jsmith'
        }
      );
      const res = mockResponse();
      const newUserData = {
        name: 'Peter',
        email: 'smith@mail.ru',
        password: 'jsmith'
      };

      const spySave = jest.spyOn(service, "save").mockImplementation((err, result) => {
        return result(expect.anything(), null)
      });

      controller.signup(req, res);

      expect(spySave).toHaveBeenCalledTimes(1);
      expect(spySave).toBeCalledWith(newUserData, expect.anything());
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'User created!',
        userId: expect.anything()
      });
      spySave.mockClear();
    });

    test('should return status 500 if error from database', () => {
      const req = mockRequest(
        {
          name: 'Peter',
          email: 'smith@mail.ru',
          password: 'jsmith'
        }
      );
      const res = mockResponse();

      const spySave = jest.spyOn(service, "save").mockImplementation((err, result) => {
        return result(null, err);
      });

      controller.signup(req, res);

      expect(spySave).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'This email already exists.'
      });
      spySave.mockClear();
    });
  });

  describe('LogIn', () => {
    test('should return status 401 if email and password does not match', async () => {
      const req = mockRequest(
        {
          email: 'smith@mail.ru',
          password: 'jsmit'
        }
      );
      const res = mockResponse();

      const spyFind = jest.spyOn(service, "findOne").mockImplementation((error, results) => {
        return results(null, [
          {
            id: expect.anything(),
            name: "Peter",
            email: "smith@mail.ru",
            password: "$2b$10$Y/cjeKxQrb/QOSlIs41Cf.3HHtNiraeVePYo28po7x9WwuynTzBVm"
          }
        ]);
      });

      await controller.login(req, res);

      expect(spyFind).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Email and password does not match'
      })
      spyFind.mockClear();
    });
    test('should return status 500 if authentication failed', async () => {
      const req = mockRequest(
        {
          email: 'smit@mail.ru',
          password: 'jsmith'
        }
      );
      const res = mockResponse();

      const spyFind = jest.spyOn(service, "findOne").mockImplementation((error, result) => {
        return result(error, []);
      });

      await controller.login(req, res);

      expect(spyFind).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: "Authentication failed."
      });
      spyFind.mockClear();
    });
    test('should return status 200 if user authenticated', async () => {
      const req = mockRequest(
        {
          email: 'smith@mail.ru',
          password: 'jsmith'
        }
      );

      const spyFind = jest.spyOn(service, "findOne").mockImplementation((error, results) => {
        return results(null, [
          {
            id: expect.anything(),
            name: "Peter",
            email: "smith@mail.ru",
            password: "$2b$10$Y/cjeKxQrb/QOSlIs41Cf.3HHtNiraeVePYo28po7x9WwuynTzBVm"
          }
        ]);
      });

      const res = mockResponse();

      await controller.login(req, res);

      expect(spyFind).toHaveBeenCalledWith(req.body.email, expect.anything());
      expect(spyFind).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        token: expect.anything(),
        expiresIn: 3600,
        userId: 1,
        userName: "Peter"
      });
      spyFind.mockClear();
    });
  });
});
