const Employee = function (emp) {
  this.empName = emp.empName;
  this.empActive = emp.empActive;
  this.empDepartment = emp.empDepartment;
  this.creator = emp.creator;
};

module.exports = Employee;