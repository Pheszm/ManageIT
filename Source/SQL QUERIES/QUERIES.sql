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

CREATE TABLE Student (
    Student_No INT PRIMARY KEY AUTO_INCREMENT,
    Student_ID VARCHAR(50) NOT NULL,
    Student_FullName VARCHAR(100) NOT NULL,
    Student_Level VARCHAR(150) NOT NULL,
    Student_YearOrCourse VARCHAR(150),
    Student_status INT DEFAULT 1
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
    status INT DEFAULT 1,
    Student_No INT,
    FOREIGN KEY (approved_by) REFERENCES Faculty(faculty_id),
    FOREIGN KEY (Student_No) REFERENCES Student(Student_No)
);


CREATE TABLE Items (
    Item_Id INT PRIMARY KEY AUTO_INCREMENT,
    Item_Name VARCHAR(255) NOT NULL,
    Item_Quantity INT NOT NULL,
    Item_Category VARCHAR(255),
    Item_Model VARCHAR(255),
    Item_Available INT,
    Item_Status INT,
    Item_ImageLocation TEXT,
    Remove_Status INT DEFAULT 0
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


CREATE TABLE issued_items_date (
    IssuedItem_Id INT PRIMARY KEY AUTO_INCREMENT,
    Reservation_Id INT NOT NULL,  
    Item_Id INT NOT NULL,    
    Item_UseQuantity INT,      
    dateofuse DATE,
    fromtime TIME,
    totime TIME,
    FOREIGN KEY (Reservation_Id) REFERENCES reserve_submissions(id),
    FOREIGN KEY (Item_Id) REFERENCES items(Item_Id)
);


CREATE TABLE activity_logs (
    Log_Id INT PRIMARY KEY AUTO_INCREMENT,
    faculty_id INT,  
    Log_type varchar(100),    
    Log_action varchar(100),
    Reference_id INT,
    DateAndTime DATETIME
);


