CREATE DATABASE manageit;

CREATE TABLE reserve_submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fullname VARCHAR(100),
    dateofuse DATE,
    fromtime TIME,
    totime TIME,
    course_year VARCHAR(100),
    subject VARCHAR(100),
    requested_by VARCHAR(100),
    message TEXT,
    materials TEXT
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
