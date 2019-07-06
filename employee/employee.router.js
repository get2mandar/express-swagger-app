const express = require('express'),
  router = express.Router();

const EmployeeController = require('./employee.controller');

/** All Employee Router Endpoints Mapping to Controllers **/

// Test Employee Router
router.get('/test', EmployeeController.test);

// Routes for "/employees"
router.route('/employees')
  .get(EmployeeController.getAllEmployees)
  .post(EmployeeController.createEmployee);

// Routes for "/employees/:id"
router.route('/employees/:id')
  .get(EmployeeController.getEmployeeById)
  .put(EmployeeController.updateEmployee)
  .delete(EmployeeController.deleteEmployee);

router.param('id', EmployeeController.fetchOneEmployeeById);

// Export Router
module.exports = router;