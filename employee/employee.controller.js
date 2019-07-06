const Employee = require('./employee');

// Sample Controller API EndPoint
exports.test = (req, resp) => {
  resp.send('Greetings from Employee Test Controller EndPoint');
};

/** START: Employee Controller Export **/

// Create Employee Controller Export
exports.createEmployee = (req, resp) => {
  const employee = new Employee(req.body);

  employee.save(function (err) {
    if (err) return next(err);
    return resp.status(201).json(employee);
  })
};

// Get All Employees Controller Export
exports.getAllEmployees = (req, resp, next) => {
  console.log(`Get All Employees`);
  Employee.find((err, employees) => {
    if (err) return next(err);
    resp.json(employees);
  })
};

// Get Employee By ID Controller Export
exports.getEmployeeById = (req, resp) => {
  console.log(`Return Employee By ID ${req.employee}`);
  resp.status(200).json(req.employee);
};

// Fetch One Employee By ID from Database
exports.fetchOneEmployeeById = (req, resp, next, id) => {
  Employee.findOne({ _id: id }, (err, employee) => {
    console.log(`Fetch Employee By ID ${id}`);
    console.log(`Employee ${employee}`);
    if (employee == null || employee == 'undefined') {
      resp.status(404).send(`Employee Not Found with ID ${id}`);
    } else if (err) {
      return next(err);
    } else {
      req.employee = employee;
      next();
    }
  })
};

// Update Employee By ID Controller Export
exports.updateEmployee = (req, resp) => {
  Employee.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, employee) => {
    console.log(`Update Employee By ${req.params.id}`);
    if (err) return next(err);
    resp.status(200).json(employee);
  })
};

// Delete Employee By ID Controller Export
exports.deleteEmployee = (req, resp, next) => {
  Employee.findByIdAndRemove(req.params.id, (err) => {
    console.log(`Delete Employee By ${req.params.id}`);
    if (err) return next(err);
    resp.status(200).json(req.employee);
  })
};

/** END: Employee Controller Export **/