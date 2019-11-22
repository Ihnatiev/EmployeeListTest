const request = require('supertest');
const app = require('../app');

let token;
let employeeId;

describe('User signUp', () => {
  it('Create new user', (done) => {
    return request(app)
      .post('/api/auth/signup')
      .send({
        name: 'Test',
        email: 'test@test.com',
        password: 'test123'
      })
      .end((err, response) => {
        expect(response.status).toBe(201);
        done();
      });
  })
})
describe('Employee endpoints', () => {
  beforeAll((done) => {
    request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@test.com',
        password: 'test123'
      })
      .end((err, response) => {
        token = response.body.token;
        done();
      });
  });

  test('Authorization', () => {
    return request(app)
      .post('/api/employees')
      .then((response) => {
        expect(response.status).toBe(401);
      });
  });

  test('Get employees', () => {
    return request(app)
      .get('/api/employees?pagesize=5&&page=0')
      .then((response) => {
        expect(response.status).toBe(200);
      });
  });

  test('Create new employee', (done) => {
    return request(app)
      .post('/api/employees')
      .send({
        empName: 'Uncle Bob',
        empActive: 0,
        empDepartment: 2
      })
      .set('Authorization', `Bearer ${token}`)
      .end((err, response) => {
        expect(response.status).toBe(201);
        employeeId = response.body.employeeId;
        done();
      });
  });

  test('Update an employee', () => {
    return request(app)
      .put('/api/employees/' + employeeId)
      .send({
        empName: 'Marmok',
        empActive: 1,
        empDepartment: 3
      })
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        expect(response.status).toBe(200);
      });
  });

  test('Get an employee', () => {
    return request(app)
      .get('/api/employees/' + employeeId)
      .then((response) => {
        expect(response.status).toBe(200);
      });
  });

  test('Delete an employee', () => {
    return request(app)
      .delete('/api/employees/' + employeeId)
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        expect(response.status).toBe(200);
      });
  });
});
