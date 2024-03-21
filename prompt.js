const inquirer = require('inquirer');
const db = require('./db/connection');
const { addDepartment, addRole, addEmployee, updateEmployeeRole } = require('./dbFunctions');

function startMenu() {
    return new Promise((resolve, reject) => {
        inquirer.prompt([{
            // Begin Command Line
            type: 'list',
            name: 'prompt',
            message: 'What would you like to do?',
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update Employee Role', 'Quit']
        }]).then((answers) => {
            if (answers.prompt === 'View All Departments') {
                db.query(`SELECT * FROM department`, (err, result) => {
                    if (err) reject(err);
                    console.log("Viewing All Departments: ");
                    console.table(result);
                    resolve(answers);
                });
            } else if (answers.prompt === 'View All Roles') {
                db.query(`SELECT * FROM role`, (err, result) => {
                    if (err) reject(err);
                    console.log("Viewing All Roles: ");
                    console.table(result);
                    resolve(answers);
                });
            } else if (answers.prompt === 'View All Employees') {
                db.query(`SELECT * FROM employee`, (err, result) => {
                    if (err) reject(err);
                    console.log("Viewing All Employees: ");
                    console.table(result);
                    resolve(answers);
                });
            }  else if (answers.prompt === 'Add A Department') {
                // Call the promptAddDepartment function here
                promptAddDepartment()
                    .then(() => startMenu().then(resolve))
                    .catch((error) => reject(error));            
            } else if (answers.prompt === 'Add A Role') {
                // Call the addRole function here
                promptAddRole()
                .then(() => startMenu().then(resolve))
                .catch((error) => reject(error));
            } else if (answers.prompt === 'Add An Employee') {
                // Call the addEmployee function here
                promptAddEmployee()
                .then(() => startMenu().then(resolve))
                .catch((error) => reject(error));
            } else if (answers.prompt === 'Update An Employee Role') {
                // Call the addEmployee function here
                promptUpdateEmployeeRole()
                .then(() => startMenu().then(resolve))
                .catch((error) => reject(error));
            } else {
                resolve(answers);
            }
        }).catch((error) => {
            reject(error);
        });
    });
}

function promptAddDepartment() {
    return new Promise((resolve, reject) => {
        inquirer.prompt([
            {
                type: 'input',
                name: 'departmentName',
                message: 'Enter the name of the department:',
                validate: departmentInput => {
                    if (departmentInput) {
                        return true;
                    } else {
                        console.log('Please enter a department name.');
                        return false;
                    }
                }
            }
        ]).then(answers => {
            const departmentName = answers.departmentName;
            // Call the addDepartment function here with the departmentName argument
            addDepartment(departmentName)
                .then(resolve)
                .catch(reject);
        }).catch((error) => {
            reject(error);
        });
    });
}


function promptAddRole() {
    return new Promise((resolve, reject) => {
        inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'Enter the title of the role:'
            },
            {
                type: 'number',
                name: 'salary',
                message: 'Enter the salary for the role:'
            },
            {
                type: 'input',
                name: 'department_id',
                message: 'Enter the department ID for the role:'
            }
        ]).then(answers => {
            const { title, salary, department_id } = answers;
            db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, department_id], (err, result) => {
                if (err) reject(err);
                console.log(`Role '${title}' added successfully.`);
                resolve();
            });
        }).catch((error) => {
            reject(error);
        });
    });
}

const promptAddEmployee = async () => {
    try {
        // Prompt the user to enter information about the new employee
        const employeeInfo = await inquirer.prompt([
            {
                type: 'input',
                name: 'firstName',
                message: "Enter the employee's first name:"
            },
            {
                type: 'input',
                name: 'lastName',
                message: "Enter the employee's last name:"
            },
            {
                type: 'input',
                name: 'roleId',
                message: "Enter the employee's role ID:"
            },
            {
                type: 'input',
                name: 'managerId',
                message: "Enter the employee's manager's ID (if applicable):"
            }
        ]);
        await addEmployee(employeeInfo.firstName, employeeInfo.lastName, employeeInfo.roleId, employeeInfo.managerId);

        console.log('Employee added successfully.');
    } catch (error) {
        console.error('Error adding employee:', error);
    }
};

const promptUpdateEmployeeRole = async () => {
    try {
        console.log('Inside promptUpdateEmployeeRole')
        // Prompt the user to input the employee's ID and the new role ID
        const userInput = await inquirer.prompt([
            {
                type: 'input',
                name: 'employeeId',
                message: "Enter the ID of the employee whose role you want to update:"
            },
            {
                type: 'input',
                name: 'newRoleId',
                message: "Enter the new role ID for the employee:"
            }
        ]);
        console.log('User input:', userInput); 

        const { employeeId, newRoleId } = userInput;

        console.log('Employee ID:', employeeId, 'New Role ID:', newRoleId)

        await updateEmployeeRole(employeeId, newRoleId);

        console.log(`Employee's role updated successfully.`);
    } catch (error) {
        console.error('Error updating employee role:', error);
    }
};


module.exports = startMenu;
