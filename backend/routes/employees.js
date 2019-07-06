module.exports = function (app) {
  const todoList = require('../controllers/employees');

  // todoList Routes
  app.route('/api/employees')
    .get(todoList.list_all_employees)
    .post(todoList.create_an_employee);

  app.route('/api/employees/:employeeId')
    .get(todoList.read_an_employee)
    .put(todoList.update_an_employee)
    .delete(todoList.delete_an_employee);

};
