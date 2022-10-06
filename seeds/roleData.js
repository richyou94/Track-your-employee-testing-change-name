const { Role } = require('../models');

const roleData = [
    {
        "title" : "Sales Lead",
        "salary" : 100000,
        "department_id" : 1
    },
    {
        "title" : "Salesperson",
        "salary" : 80000,
        "department_id" : 1
    },
    {
        "title" : "Lead Engineer",
        "salary" : 150000,
        "department_id" : 2
    },
    {
        "title" : "Software Engineer",
        "salary" : 120000,
        "department_id" : 2
    },
    {
        "title" : "Account Manager",
        "salary" : 160000,
        "department_id" : 3
    },
    {
        "title" : "Accountant",
        "salary" : 125000,
        "department_id" : 3 
    },
    {
        "title" : "Legal Team Lead",
        "salary" : 250000,
        "department_id" : 4
    },
    {
        "title" : "Lawyer",
        "salary" : 190000,
        "department_id" : 4
    },
];

const seedRole = () => Role.bulkCreate(roleData);

module.exports = seedRole;
