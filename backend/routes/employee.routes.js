module.exports = function (app) {
  const todoList = require('../controllers/employee.controllers');

  app.route('/api/employees')
    .get(todoList.list_all_employees)
    .post(todoList.create_employee);

  app.route('/api/employees/:employeeId')
    .get(todoList.read_employee)
    .put(todoList.update_employee)
    .delete(todoList.delete_employee);

};
