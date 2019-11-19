jest.mock('../../services/userService');
const bcrypt = require('bcrypt');
const controller = require('../../controllers/userControllers');
const service = require('../../services/userService');

const mockRequest = (body) => ({
  body,
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('USER SIGNUP', () => {
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

      jest.spyOn(service, "save").mockImplementation((err, result) => {
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
      const req = mockRequest(
        {
          name: 'Peter',
          email: 'smith@mail.ru',
          password: 'jsmith'
        }
      );
      const res = mockResponse();

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
      const req = mockRequest(
        {
          name: 'Peter',
          email: 'smith@mail.ru',
          password: 'jsmith'
        }
      );
      const res = mockResponse();

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

describe('USER LOGIN', () => {
  test('should return Authentication failed', () => {
    const req = mockRequest(
      {
        email: 'smit@mail.ru',
        password: 'jsmith'
      }
    );
    const res = mockResponse();

    jest.spyOn(service, "find").mockImplementation((error, result) => {
      return result(error, []);
    });

    controller.login(req, res);
    expect(service.find).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Authentication failed'
    })
  });
  test('should return Email and password does not match', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    });
    const req = mockRequest(
      {
        email: 'smith@mail.ru',
        password: 'jsmit'
      }
    );
    const res = mockResponse();

    const fetchedUser = {
      password: "$2b$10$Y/cjeKxQrb/QOSlIs41Cf.3HHtNiraeVePYo28po7x9WwuynTzBVm"
    }

    jest.spyOn(service, "find").mockImplementation((error, results) => {
      return results(null, [
        {
          id: 1,
          name: "Peter",
          email: "smith@mail.ru",
          password: "$2b$10$Y/cjeKxQrb/QOSlIs41Cf.3HHtNiraeVePYo28po7x9WwuynTzBVm"
        }
      ]);
    });

    jest.spyOn(bcrypt, "compare").mockReturnValue(req.body.password, fetchedUser.password);

    controller.login(req, res);
    expect(bcrypt.compare).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Email and password does not match'
    })
  });
  test('should return User authenticated', async () => {
    beforeEach(() => {
      jest.clearAllMocks()
    });

    const req = mockRequest(
      {
        email: 'smith@mail.ru',
        password: 'jsmith'
      }
    );

    const fetchedUser = {
      password: "$2b$10$Y/cjeKxQrb/QOSlIs41Cf.3HHtNiraeVePYo28po7x9WwuynTzBVm"
    }

    jest.spyOn(service, "find").mockImplementation((error, results) => {
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

    jest.spyOn(bcrypt, "compare").mockReturnValue(req.body.password, fetchedUser.password);

    await controller.login(req, res);
    expect(service.find).toHaveBeenCalledWith(req.body.email, expect.anything());
    expect(bcrypt.compare).toHaveBeenCalledTimes(1);
    expect(bcrypt.compare).toHaveBeenCalledWith(req.body.password, fetchedUser.password, expect.anything());
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      token: expect.anything(),
      expiresIn: 3600,
      userId: 1,
      userName: "Peter"
    });
  });
});

