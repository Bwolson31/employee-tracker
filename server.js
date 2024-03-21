const inquirer = require('inquirer');
const db = require('./db/connection');
const startMenu = require('./prompt');
const { addDepartment, addRole, addEmployee, updateEmployeeRole } = require('./dbFunctions');

// Start server after DB connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    employeeTracker();
});

const viewAllRoles = () => {
    // Logic to fetch and display all roles from the database
    db.query('SELECT * FROM role', (err, result) => {
        if (err) throw err;
        console.log("Viewing All Roles:");
        console.table(result);
    });
};

const viewAllDepartments = () => {
    // Logic to fetch and display all departments from the database
    db.query('SELECT * FROM department', (err, result) => {
        if (err) throw err;
        console.log("Viewing All Departments:");
        console.table(result);
    });
};

const viewAllEmployees = () => {
    // Logic to fetch and display all employees from the database
    db.query('SELECT * FROM employee', (err, result) => {
        if (err) throw err;
        console.log("Viewing All Employees:");
        console.table(result);
    });
};

const employeeTracker = async () => {
    try {
        while (true) {
            const { prompt } = await startMenu(); // Only call startMenu once per iteration
            switch (prompt) {
                case 'View All Departments':
                    viewAllDepartments();
                    break;
                case 'View All Roles':
                    viewAllRoles();
                    break;
                case 'View All Employees':
                    viewAllEmployees();
                    break;
                case 'Add A Department':
                    await addDepartment();
                    break;
                case 'Add A Role':
                    await addRole();
                    break;
                case 'Add An Employee':
                    await addEmployee();
                    break;
                case 'Update Employee Role':
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
                
                    await updateEmployeeRole(userInput.employeeId, userInput.newRoleId);
                    break;
                case 'Quit':
                    db.end();
                    console.log("Good-Bye!");
                    return;
            }
        }
    } catch (error) {
        console.error('Error:', error);
    }
};
