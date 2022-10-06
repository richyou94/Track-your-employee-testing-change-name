const sequelize = require('../config/connection');
const { Department, Employee, Role } = require('../models');

const departmentSeedData = require('./departmentSeedData.json');
const roleSeedData = require('./roleSeedData.json');
const employeeSeedData = require('./employeeSeedData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const newDepartment = await Department.bulkCreate(departmentSeedData, {
        individualHooks: true,
        returning: true,
    });

    const newRole = await Role.bulkCreate(roleSeedData, {
        individualHooks: true,
        returning: true,
    });

    const newEmployee = await Employee.bulkCreate(employeeSeedData, {
        individualHooks: true,
        returning: true,
    });

    process.exit(0);
};

seedDatabase(); 