const { Department } = require('../models');

const departmentData = [
  {
      "name": "Sales"
  },
  {
      "name": "Engineering"
  },
  {
      "name" : "Finance"
  },
  {
      "name" : "Legal"
  }
];

const seedDepartment = () => Department.bulkCreate(departmentData);

module.exports = seedDepartment;