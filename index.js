const inquirer = require('inquirer');
const db = require('./db.js');

function mainMenu() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Exit']
        }
    ])
    .then(answer => {
        switch (answer.action) {
            case 'View all departments':
                viewAllDepartments();
                break;
            case 'View all roles':
                viewAllRoles();
                break;
            case 'View all employees':
                viewAllEmployees();
                break;
            case 'Add a department':
                addDepartment();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'Update an employee role':
                updateEmployeeRole();
                break;
            case 'Exit':
                db.connection.end();
                break;
        }
    });
}

function viewAllDepartments() {
    db.viewAllDepartments()
        .then(([rows]) => {
            console.table(rows);
            mainMenu();
        });
}

function viewAllRoles() {
    db.viewAllRoles()
        .then(([rows]) => {
            console.table(rows);
            mainMenu();
        });
}

function viewAllEmployees() {
    db.viewAllEmployees()
        .then(([rows]) => {
            console.table(rows);
            mainMenu();
        });
}

function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the department?'
        }
    ])
    .then(answer => {
        db.addDepartment(answer)
            .then(() => mainMenu());
    });
}

function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of the role?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of the role?'
        },
        {
            type: 'input',
            name: 'department_id',
            message: 'What is the ID of the department the role belongs to?'
        }
    ])
    .then(answer => {
        db.addRole(answer)
            .then(() => mainMenu());
    });
}

function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the employee\'s first name?'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is the employee\'s last name?'
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'What is the ID of the employee\'s role?'
        },
        {
            type: 'input',
            name: 'manager_id',
            message: 'What is the ID of the employee\'s manager?'
        }
    ])
    .then(answer => {
        db.addEmployee(answer)
            .then(() => mainMenu());
    });
}

function updateEmployeeRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'employeeId',
            message: 'What is the ID of the employee you want to update?'
        },
        {
            type: 'input',
            name: 'roleId',
            message: 'What is the new role ID for the employee?'
        }
    ])
    .then(answer => {
        db.updateEmployeeRole(answer.employeeId, answer.roleId)
            .then(() => mainMenu());
    });
}

mainMenu();
