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

async function addEmployee() {
    const sqlCount = 'SELECT COUNT(*) FROM role';
    let roleList = [];
    let employeeList = [];
    db.query(sqlCount, (err, rows) => {
        const objectSql = rows[0]
        const countItem = Object.values(objectSql)[0];
        const sqlRole = 'SELECT title FROM role'
        db.query(sqlRole, (err, rows) => {
            for (let i=0; i < countItem; i++) {
                roleList.push(rows[i].title);
            }
            const sqlCountEmployee = 'SELECT COUNT(*) FROM employee';
            db.query(sqlCountEmployee, (err, rows) => {
                const objectSqlEmployee = rows[0];
                const countEmployee = Object.values(objectSqlEmployee)[0];
                const sqlEmployee = 'SELECT CONCAT(first_name, " ", last_name) AS manager FROM employee'
                db.query(sqlEmployee, (err, rows) => {
                    for (let i = 0; i < countEmployee; i++) {
                        employeeList.push(rows[i].manager)
                    }
                    inquirer
                        .prompt([
                            {
                                name: 'first_name',
                                message: "What is the employee's first name?",
                                type: 'input'
                            },
                            {
                                name: 'last_name',
                                message: "What is the employee's last name?",
                                type: 'input'
                            },
                            {
                                name: 'role', 
                                message: "What is the employee's role?",
                                type: 'list',
                                choices: [...roleList]
                            },
                            {
                                name: 'manager',
                                message: "Who is the employee's manager?",
                                type: 'list',
                                choices: [...employeeList]
                            }
                        ])
                        .then ((userInput) => {
                            const roleId = roleList.indexOf(userInput.role) + 1;
                            const firstName = userInput.first_name;
                            const lastName = userInput.last_name;
                            const manager = employeeList.indexOf(userInput.manager) + 1;
                            const sql = `
                            INSERT INTO employee
                            (first_name, last_name, role_id, manager_id)
                            VALUES
                            ('${firstName}', '${lastName}', ${roleId}, ${manager})`
                            db.query(sql, (err, rows) => {

                            })
                            console.log(`Added ${firstName} ${lastName} to the database`)
                            initOption();
                        })
                    
                })
            })   
        })
    })
    
};

async function updateRole() {
    const sqlCountEmployee = `SELECT COUNT(*) FROM employee`;
    const employeeList = [];
    const roleList = [];
    db.query(sqlCountEmployee, (err, rows) => {
        const objectSqlEmployee = rows[0]
        const countEmployee = Object.values(objectSqlEmployee)[0];
        const sqlCountRole = 'SELECT COUNT(*) FROM role';
        db.query(sqlCountRole, (err, rows) => {
            const objectSqlRole = rows[0];
            const countRole = Object.values(objectSqlRole)[0];
            const sqlEmployee = 'SELECT CONCAT(first_name, " ", last_name) AS employee FROM employee'
            db.query(sqlEmployee, (err, rows) => {
                for (let i = 0; i < countEmployee; i++) {
                    employeeList.push(rows[i].employee)
                }
                sqlRole = 'SELECT title FROM role';
                db.query(sqlRole, (err, rows) => {
                    for (let i = 0; i < countRole; i++) {
                        roleList.push(rows[i].title);
                    }
                    inquirer
                        .prompt([
                            {
                                name: 'employee',
                                message: "Which employee's role do you want to update?",
                                type: 'list',
                                choices: [...employeeList]
                            },
                            {
                                name: 'role',
                                message: "Which role do you want to assign the selected employee?",
                                type: 'list',
                                choices: [...roleList]
                            }
                        ])
                        .then ((userInput) => {
                            const selectedEmployeeId = employeeList.indexOf(userInput.employee) + 1;
                            const selectedRoleId = roleList.indexOf(userInput.role) + 1;
                            const sql = `
                            UPDATE employee
                            SET
                                role_id = ${selectedRoleId}
                            WHERE
                                id = ${selectedEmployeeId}
                            `
                            console.log(sql);
                            db.query(sql, (err, rows) => {})
                            console.log("Updated employee's role")
                            initOption();
                        })
                })
            })
        }) 
    })
    
};

function viewRole() {
    console.log(`\n-----------------Role List-----------------\n`) 
    const sql = 'SELECT role.id AS id, role.title AS title, department.name AS department, role.salary AS salary FROM role INNER JOIN department ON role.department_id = department.id';
    db.query(sql, (err, rows) => {
        console.table(rows);
        initOption();
    });
};

async function addRole() {
    const sqlCount = 'SELECT COUNT(*) FROM department';
    let departmentList = []
    db.query(sqlCount, (err,rows) => {
        const objectSql = rows[0]
        // console.log(objectSql);
        const countItem = Object.values(objectSql)[0];
        const sqlDepartment = 'SELECT name FROM department'
        db.query(sqlDepartment, (err, rows) => {
            for (let i = 0; i < countItem; i++) {
                departmentList.push(rows[i].name);
            }
            inquirer
                .prompt([
                    {
                        name: 'name',
                        message: 'What is the name of the role?',
                        type: 'input'
                    },
                    {
                        name: 'salary',
                        message: 'What is the salary of the role?',
                        type: 'number'
                    },
                    {
                        name: 'department',
                        message: 'Which department does the role belong to?',
                        type: 'list',
                        choices: [...departmentList]
                    }
                ])
                .then((userInput) => {
                    const departmentId = departmentList.indexOf(userInput.department) + 1;                    
                    const title = userInput.name;
                    const salary = userInput.salary;
                    const sql = `
                    INSERT INTO role 
                    (title, salary, department_id)
                    VALUES 
                    ('${title}', ${salary}, ${departmentId})
                    `
                    db.query(sql, (err, rows) => {
                        
                    })
                    console.log(`Added ${userInput.name} to the database.`)
                    initOption();
                })
                
        })
    })
    
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

