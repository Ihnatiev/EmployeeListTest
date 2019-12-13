const request = require('supertest');
const app = require('../app');

describe('Integration tests', () => {
  describe('Employees', () => {
    test('a valid string query for get all employees - return 200', async () => {
      await request(app).get('/api/employees?pagesize=1&page=0')
        .expect(200)
        .expect({
          'employees': [
            {
              'empID': 1,
              'empName': 'Lisa',
              'creator': 'f6f7dd58-0b07-494e-85d6-c0c03b902256',
              'empActive': 'Yes',
              'dpName': 'HR'
            }],
          'maxEmployees': 4
        });
    });
    test('an invalid string query for get all employees - return 400', async () => {
      await request(app)
        .get('/api/employees?pagesize=1')
        .expect(400);
    });
    test('a valid string query for get an employee - return 200', async () => {
      await request(app)
        .get('/api/employees/1')
        .expect(200)
        .expect({
          'success': true,
          'employee': [
            {
              'empID': 1,
              'empName': 'Lisa',
              'empActive': 'Yes',
              'dpName': 'HR'
            }
          ]
        });
    });
    test('an invalid string query for get an employee - return 400', async () => {
      await request(app)
        .get('/api/employees/')
        .expect(400);
    });
    describe('Requests without authentication to routes of employees', () => {
      const data = {
        'empName': 'Test Rout',
        'empActive': true,
        'empDepartment': 1
      };
      test('try to post an employee without authentication - return 401', async () => {
        await request(app)
          .post('/api/employees/')
          .send(data)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(401)
          .expect({ message: 'You are not authenticated!' });
      });
      test('try to update an employee without authentication - return 401', async () => {
        await request(app)
          .put('/api/employees/1')
          .send(data)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(401)
          .expect({ message: 'You are not authenticated!' });
      });
      test('try to delete an employee without authentication - return 401', async () => {
        await request(app)
          .delete('/api/employees/1')
          .expect(401)
          .expect({ message: 'You are not authenticated!' });
      });
    });
    describe('Request with authentication to routes of employees', () => {
      let token;
      let employeeId;
      beforeAll((done) => {
        const userLog = {
          'email': 'testUser@test.com',
          'password': 'superPassword'
        };
        request(app)
          .post('/api/auth/login')
          .send(userLog)
          .set('Accept', 'application/json')
          .end((err, response) => {
            token = response.body.token; // save the token!
            done();
          });
      });
      const data = {
        'empName': 'Test Emp',
        'empActive': true,
        'empDepartment': 1 //HR
      };
      test('Create an employee', async () => {
        await request(app)
          .post('/api/employees/')
          .send(data)
          .set('Authorization', `${token}`)
          .expect('Content-Type', /json/)
          .then((response) => {
            expect(response.status).toEqual(201);
            employeeId = response.body.employeeId;
          });
      });
      test('Get an employee', async () => {
        await request(app)
          .get('/api/employees/' + employeeId)
          .then((response) => {
            expect(response.status).toBe(200);
          });
      });
      test('Update an employee', async () => {
        await request(app)
          .put('/api/employees/' + employeeId)
          .send({
            empName: 'Test Emp',
            empActive: false,
            empDepartment: 1 // HR
          })
          .set('Authorization', `${token}`)
          .then((response) => {
            expect(response.status).toBe(200);
          });
      });
      test('Delete an employee', async () => {
        await request(app)
          .delete('/api/employees/' + employeeId)
          .set('Authorization', `${token}`)
          .then((response) => {
            expect(response.status).toBe(200);
          });
      });
    });
  });
  describe('Users', () => {
    test.skip('signup user - return 201', async () => {
      const user = {
        'name': 'Test User',
        'email': 'testUser@test.com',
        'password': 'superPassword'
      };
      await request(app)
        .post('/api/auth/signup')
        .send(user)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201);
    });
    test('signup user - return 500', async () => {
      const user = {
        'name': 'Test User',
        'email': 'testUser@test.com',
        'password': 'superPassword'
      };
      await request(app)
        .post('/api/auth/signup')
        .send(user)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(500)
        .expect({ success: false, message: 'This email already exists.' });
    });
    test('login user - return 200', async () => {
      const userLog = {
        'email': 'testUser@test.com',
        'password': 'superPassword'
      };
      await request(app)
        .post('/api/auth/login')
        .send(userLog)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);
    });
    test('login user - return 401', async () => {
      const userLog = {
        'email': 'testUser@test.com',
        'password': 'superPass'
      };
      await request(app)
        .post('/api/auth/login')
        .send(userLog)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .expect({ success: false, message: 'Email and password does not match' });
    });
    test('login user - return 500', async () => {
      const userLog = {
        'email': 'test@test.com',
        'password': 'superPassword'
      };
      await request(app)
        .post('/api/auth/login')
        .send(userLog)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(500)
        .expect({ status: 'error', message: 'Authentication failed.' });
    });
  });
});
