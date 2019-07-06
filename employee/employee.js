const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  emailID: {
    type: String, trim: true, unique: true,
    match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  }
});

mongoose.model('Employee', EmployeeSchema);
const Employee = mongoose.model('Employee');
module.exports = Employee;