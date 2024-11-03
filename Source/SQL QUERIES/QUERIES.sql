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
