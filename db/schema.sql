DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMEMT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(5,2) NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    FOREIGN KEY (role_id)
    REFERENCES role(id)
    ON DELETE SET NULL,
    FOREIGN KEY (manager_id)
    REFERENCES employee(id)
    ON DELETE SET NULL
);


SELECT DATABASE();


-- -- Insert row into produce table --
-- INSERT INTO produce (id, name)
--   VALUES (1, "apple");



-- -- Insert multiple produce items --
-- INSERT INTO produce (id, name)
-- VALUES
--     ( 1, "apple"),
--     ( 2, "orange"),
--     ( 3, "banana");

-- DELETE FROM produce
-- WHERE id = 2;

-- UPDATE produce
-- SET name = "strawberry"
-- WHERE id = 1;

