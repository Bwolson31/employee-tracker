const db = require('./db/connection');

function addDepartment(departmentName) {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO department (name) VALUES (?)', [departmentName], (err, result) => {
            if (err) reject(err);
            console.log(`Added '${departmentName}' to the database.`);
            resolve();
        });
    });
}

function addRole(title, salary, departmentId) {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, departmentId], (err, result) => {
            if (err) reject(err);
            console.log(`Added '${title}' to the database.`);
            resolve();
        });
    });
}

function addEmployee(firstName, lastName, roleId, managerId) {
    return new Promise((resolve, reject) => {
        db.query(
            'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
            [firstName, lastName, roleId, managerId],
            (err, result) => {
                const fullName = `${firstName} ${lastName}`;
                if (err) reject(err);
                console.log(`Added ${fullName} to the databse.`);
                resolve();
            }
        );
    });
}

function updateEmployeeRole(employeeId, newRoleId) {
    return new Promise((resolve, reject) => {
        db.query(
            'UPDATE employee SET role_id = ? WHERE id = ?',
            [newRoleId, employeeId],
            (err, result) => {
                if (err) {
                    console.error('Error updating employee role:', err);
                    reject(err);
                } else {
                    console.log('Employee role updated successfully.');
                    resolve();
                }
            }
        );
    });
}


module.exports = { addDepartment, addRole, addEmployee, updateEmployeeRole };
