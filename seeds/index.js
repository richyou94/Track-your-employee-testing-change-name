const sequelize = require('../config/connection');
const seedDepartment = require('./departmentData');
const seedRole = require('./roleData');
const seedEmployee = require('./employeeData');

const seedAll = async () => {
    await sequelize.sync({ force: true });

    await seedDepartment();

    await seedRole();

    await seedEmployee();

    process.exit(0);
};

seedAll();