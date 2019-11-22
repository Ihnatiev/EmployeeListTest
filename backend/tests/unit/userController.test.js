jest.mock('../../services/userService');
const controller = require('../../controllers/userControllers');
const service = require('../../services/userService');

const mockRequest = (body) => ({
  body
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.sendStatus = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('UserController', () => {
  describe('SignUp', () => {
    describe('test body request', () => {
      test('should return status 400 if smth is missing from body', () => {
        var req = mockRequest(
          { email: 'boss@mail.com', password: 'boss' }
        );
        const res = mockResponse();

        controller.signup(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
          success: false,
          message: 'Please pass name, email and password.'
        });
      });
      test('should return status 400 if email is missing from body', () => {
        var req = mockRequest(
          { name: 'Bob', password: 'boss' }
        );
        const res = mockResponse();

        controller.signup(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
          success: false,
          message: 'Please pass name, email and password.'
        });
      });
      test('should return status 400 if password is missing from body', () => {
        var req = mockRequest(
          { name: 'Bob', email: 'boss@mail.com' }
        );
        const res = mockResponse();

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
        const req = mockRequest(
          {
            name: 'Peter',
            email: 'smith@mail.ru',
            password: 'jsmith'
          }
        );
        const res = mockResponse();
        const expectedUser = {
          name: 'Peter',
          email: 'smith@mail.ru',
          password: expect.anything()
        };

        const spySave = jest.spyOn(service, "save").mockImplementation((err, result) => {
          return result(null, 2);
        });

        await controller.signup(req, res);

        expect(spySave).toHaveBeenCalledTimes(1);
        expect(spySave).toBeCalledWith(expectedUser, expect.anything());
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
          success: true,
          message: 'User created!',
          userId: 2
        });
        spySave.mockClear();
      });

      test('should return status 500 if error from database', async () => {
        const req = mockRequest(
          {
            name: 'Peter',
            email: 'smith@mail.ru',
            password: 'jsmith'
          }
        );
        const res = mockResponse();

        const spySave = jest.spyOn(service, "save").mockImplementation((err, result) => {
          return result(err, null);
        });

        await controller.signup(req, res);

        expect(spySave).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
          success: false,
          message: 'Database error'
        });
        spySave.mockClear();
      });

      test('should return status 500 if error from server', async () => {
        const req = mockRequest(
          {
            name: 'Peter',
            email: 'smith@mail.ru',
            password: 'jsmith'
          }
        );
        const res = mockResponse();

        const spySave = jest.spyOn(service, "save").mockImplementation((result) => {
          return result();
        });

        await controller.signup(req, res);

        expect(spySave).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
          message: 'Invalid authentication credentials!'
        });
        spySave.mockClear();
      });
    });
  });

  describe('LogIn', () => {
    test('should return status 500 if authentication failed', () => {
      const req = mockRequest(
        {
          email: 'smit@mail.ru',
          password: 'jsmith'
        }
      );
      const res = mockResponse();

      const spyFind = jest.spyOn(service, "find").mockImplementation((error, result) => {
        return result(error, []);
      });

      controller.login(req, res);

      expect(spyFind).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Authentication failed."
      });
      spyFind.mockClear();
    });
    test('should return status 401 if email and password does not match', async () => {
      const req = mockRequest(
        {
          email: 'smith@mail.ru',
          password: 'jsmit'
        }
      );
      const res = mockResponse();

      const spyFind = jest.spyOn(service, "find").mockImplementation((error, results) => {
        return results(null, [
          {
            id: 1,
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
    test('should return status 200 if user authenticated', async () => {
      const req = mockRequest(
        {
          email: 'smith@mail.ru',
          password: 'jsmith'
        }
      );

      const spyFind = jest.spyOn(service, "find").mockImplementation((error, results) => {
        return results(null, [
          {
            id: 1,
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

