const Department = require('./Department');
const Role = require('./Role');
const Employee = require('./Employee');

Department.hasOne(Role, {
    foreignKey: 'department_id',
    onDelete: 'CASCADE',
});

Role.belongsTo(Department, {
    foreignKey: 'department_id',
});

Role.hasOne(Employee, {
    foreignKey: 'role_id',
    onDelete: 'CASCADE',
});

Employee.belongsTo(Role, {
    foreignKey: 'role_id',
});

Employee.hasOne(Employee, {
    foreignKey: 'manager_id',
    onDelete: 'CASCADE',
});

Employee.belongsTo(Employee, {
    foreignKey: 'manager_id',
});

module.exports = {Department, Role, Employee};
