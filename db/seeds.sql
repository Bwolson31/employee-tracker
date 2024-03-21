INSERT INTO department
  (name)
VALUES
  ('Engineering'),
  ('Sales'),
  ('Finance'),
  ('Legal');

-- Inserts roles of employee into role table
INSERT INTO role
  (title, salary, department_id)
VALUES
  ('Sales Lead', 100000, 2),
  ('Salesperson', 75000, 2),
  ('Lead Engineer', 150000, 1),
  ('Software Engineer', 85000, 1),
  ('Account Manager', 160000, 3),
  ('Accountant', 125000, 3),
  ('Legal Team Lead', 250000, 4),
  ('Lawyer', 200000, 4)




-- Inserts employee information into employee table
INSERT INTO employee
  (first_name, last_name, role_id, manager_id)
VALUES
  ('John', 'Doe', 2, 1),
  ('Ashley', 'Rodriguez', 1, 2),
  ('Kunal', 'Singh', 3, 3),
  ('Sarah', 'Lourd', 4, 4),
  ('Mike', 'Chan', 2, null),
  ('Kevin', 'Tupik', 1, null),
  ('Malia', 'Brown', 3, null),
  ('Tom', 'Allen', 4, null);
