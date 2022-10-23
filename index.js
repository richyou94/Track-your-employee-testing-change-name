const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
// const sequelize = require('sequelize');
// const { Department, Role, Employee } = require('./models');
require('dotenv').config();

const db = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) throw err;
    console.log("connected")
    startApplication();
    console.log('Welcome to the Employee Manager CMS application!')
    initOption();
})



function startApplication() {
    console.log(`
    ,______________________________________________________
    |                                                     |
    |    _____                 _                          |
    |   | ____|_ __ ___  _ __ | | ___  _   _  ___  ___    |
    |   |  _| | '_ ' _  | '_  | |/    | | | |/ _  / _ |   |
    |   | |___| | | | | | |_) | | (_) | |_| |  __/  __/   |
    |   |_____|_| |_| |_| .__/|_| ___/  __, | ___| ___|   |
    |                   |_|            |___/              |
    |    __  __                                           |
    |   |      | __ _ _ __   __ _  __ _  ___ _ __         |
    |   | |||| |/ _' | '_ | / _' |/ _' |/ _ | '__|        |
    |   | |  | | (_| | | | | (_| | (_| |  __/ |           |
    |   |_|  |_| __,_|_| |_| __,_| __, | ___|_|           |
    |                             |___/                   |
    |                                                     |  
    '_____________________________________________________|  
    `)
    
}

function initOption() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'appSelection',
                message: "What would you like to do?",
                choices: [
                    'View All Employees',
                    'Add Employee',
                    'Update Employee Role',
                    'View All Roles',
                    'Add Role',
                    'View All Departments',
                    'Add Department',
                    'Quit',
                ],
            },
        ])
        .then((userChoice) => {
            switch (userChoice.appSelection) {
                case 'View All Employees':
                    viewEmployee();
                    break;
                case 'Add Employee':
                    addEmployee();
                    break;
                case 'Update Employee Role':
                    updateRole();
                    break;
                case 'View All Roles':
                    viewRole();
                    break;
                case 'Add Role':
                    addRole();
                    break;
                case 'View All Departments':
                    viewDepartment();
                    break;
                case 'Add Department':
                    addDepartment();
                    break;
                default:
                    quit();
            }
        });
}


function viewEmployee() {
    console.log(`\n-----------------------------------Employee List-----------------------------------\n`) 
    const sql = `
    SELECT e1.id, 
        e1.first_name, 
        e1.last_name, 
        role.title, 
        department.name AS department, 
        role.salary AS salary, 
        CONCAT(e2.first_name, " ", e2.last_name) AS manager 
    FROM employee e1 
        LEFT JOIN employee e2
            ON e1.manager_id = e2.id
        JOIN role 
            ON e1.role_id = role.id 
        JOIN department 
            ON role.department_id = department.id
    `;
    // CONCAT(employee.first_name, " ", employee.last_name) AS manager
    // WHERE employee.id = employee.manager_id
    // WHERE (employee.id IN (SELECT employee.manager_id FROM employee))
    // 'SELECT CONCAT(employee.first_name, " ", employee.last_name) AS manager FROM employee WHERE (employee.id IN (SELECT employee.manager_id FROM employee))'
    // `SELECT e1.id, e1.first_name, e1.last_name, e2.last_name AS Manager
    // FROM employee e1
    // LEFT JOIN employee e2 ON e1.manager_id = e2.id`
    db.query(sql, (err, rows) => {
        console.table(rows);
        initOption();
    });
};

function addEmployee() {
    console.log("you clicked add employee function");
    initOption();
};

function updateRole() {
    console.log("you clicked update role function");
    initOption();
};

function viewRole() {
    console.log(`\n-----------------Role List-----------------\n`) 
    const sql = 'SELECT role.id AS id, role.title AS title, department.name AS department, role.salary AS salary FROM role INNER JOIN department ON role.department_id = department.id';
    db.query(sql, (err, rows) => {
        console.table(rows);
        initOption();
    });
};

function addRole() {
    console.log("you clicked add role function");
    initOption();
};

function viewDepartment() {  
    console.log(`\n -----Department List----- \n`) 
    const sql = 'SELECT department.id AS id, department.name AS name FROM department ORDER BY name';
    db.query(sql, (err, rows) => {
        console.table(rows);
        initOption();
    });
};

async function addDepartment() {
    await inquirer
        .prompt([
            {
                name: 'department',
                message: 'What is the name of the department?',
                type: 'input'
            }
        ])
        .then((userInput) => {
            let department = userInput.department;
            const sql = `
            INSERT INTO department (name)
            VALUES ('${department}')
            `
            db.query(sql, (err, rows) => {});
            console.log(`Added ${department} to the database`)
            initOption();
             
        })
    // initOption();
};

function quit() {
    db.end();
    console.log("you clicked quit function");
}

