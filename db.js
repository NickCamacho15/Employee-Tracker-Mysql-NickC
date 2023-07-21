const mysql = require('mysql2');

const db = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '',
    database: 'company_db',
  });
  

function viewAllDepartments() {
    return db.promise().query("SELECT * FROM department");
}

function viewAllRoles() {
    return db.promise().query("SELECT * FROM role");
}

function viewAllEmployees() {
    return db.promise().query("SELECT * FROM employee");
}

function addDepartment(department) {
    return db.promise().query("INSERT INTO department SET ?", department);
}

function addRole(role) {
    return db.promise().query("INSERT INTO role SET ?", role);
}

function addEmployee(employee) {
    return db.promise().query("INSERT INTO employee SET ?", employee);
}

function updateEmployeeRole(employeeId, roleId) {
    return db.promise().query("UPDATE employee SET role_id = ? WHERE id = ?", [roleId, employeeId]);
}

module.exports = {
    viewAllDepartments,
    viewAllRoles,
    viewAllEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole
};
