CREATE DATABASE manageit;

CREATE TABLE Faculty (
    faculty_id INT PRIMARY KEY AUTO_INCREMENT,
    faculty_username VARCHAR(50) NOT NULL,
    faculty_full_name VARCHAR(100) NOT NULL,
    faculty_email_address VARCHAR(100) NOT NULL UNIQUE,
    faculty_phone_number VARCHAR(15),
    faculty_password VARCHAR(255) NOT NULL,
    faculty_status INT DEFAULT 1,
    faculty_role VARCHAR(50) DEFAULT 'user'
);

CREATE TABLE reserve_submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fullname VARCHAR(100),
    dateofuse DATE,
    fromtime TIME,
    totime TIME,
    course_year VARCHAR(100),
    subject VARCHAR(100),
    requested_by VARCHAR(100),
    approved_by INT,
    message TEXT,
    materials TEXT,
    FOREIGN KEY (approved_by) REFERENCES Faculty(faculty_id)
);


CREATE TABLE Items (
    Item_Id INT PRIMARY KEY AUTO_INCREMENT,
    Item_Name VARCHAR(255) NOT NULL,
    Item_Quantity INT NOT NULL,
    Item_Category VARCHAR(255),
    Item_Model VARCHAR(255),
    Item_Available INT,
    Item_Status INT,
    Item_ImageLocation TEXT
);

INSERT INTO Items (Item_Name, Item_Quantity, Item_Category, Item_Model, Item_Available, Item_Status, Item_ImageLocation)
VALUES
('Speaker', 3, 'Output', 'Sound Device', 3, 1, 'SampleImage.jpg'),
('Laptop', 10, 'Computers', 'Dell XPS 13', 10, 1, 'SampleImage.jpg'),
('Wireless Mouse', 50, 'Accessories', 'Logitech MX Master', 50, 1, 'SampleImage.jpg'),
('Keyboard', 30, 'Accessories', 'Logitech G915', 30, 1, 'SampleImage.jpg'),
('Monitor', 15, 'Display', 'Samsung Odyssey', 15, 1, 'SampleImage.jpg');




CREATE TABLE Transactions (
    Transaction_id INT AUTO_INCREMENT PRIMARY KEY,
    Transaction_Reserve_id INT,
    Transaction_status VARCHAR(100),
    Transaction_current INT default 1,
    Transaction_Items TEXT,
    Transaction_ReturnedTime TIME,
    Transaction_Comment TEXT,
    FOREIGN KEY (Transaction_Reserve_id) REFERENCES reserve_submissions(id)
);
