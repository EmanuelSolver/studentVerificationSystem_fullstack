CREATE  DATABASE CollegeSystemDb; 

CREATE TABLE Departments(
	DeptID INT IDENTITY(1, 1),
	DeptInitials VARCHAR(10),
	DeptName VARCHAR(100),
	DeptDescription VARCHAR(255),

	PRIMARY KEY(DeptID)
);


CREATE TABLE Courses(
	CourseID INT IDENTITY(1, 1),
	CourseCode VARCHAR(10),
	CourseName VARCHAR(100),
	DeptID INT NOT NULL,

	PRIMARY KEY(CourseID),
	FOREIGN KEY(DeptID) REFERENCES Departments(DeptID)
);


--create student table
CREATE TABLE StudentsData(  
	RegNo VARCHAR(30) ,
	StudentName VARCHAR(50),
	StudentMail VARCHAR(50),
	PhoneNumber VARCHAR(15),
	NationalID INT,  
	RegistrationDate DATE,
	Password VARCHAR(255),
	DeptID INT NOT NULL,
	CourseID INT NOT NULL,

	PRIMARY KEY(RegNo),
	FOREIGN KEY (DeptID) REFERENCES Departments(DeptID)  ON DELETE CASCADE, 
	FOREIGN KEY (CourseID) REFERENCES Courses(CourseID)  ON DELETE CASCADE
); 



--stores details of students who have registered for exams
CREATE TABLE ExamRegister(
	ID INT IDENTITY(1, 1),
	RegNo VARCHAR(30) NOT NULL,
	ExamCode VARCHAR(10) NOT NULL,

	PRIMARY KEY(ID),
	FOREIGN KEY (RegNo) REFERENCES StudentsData(RegNo)  ON DELETE CASCADE
);


CREATE TABLE Fee(
	RegNo VARCHAR(30) NOT NULL,
	PayableFee DECIMAL(8, 2) NOT NULL,
	FeePaid DECIMAL(8, 2),
	Arrears DECIMAL(8, 2),

	PRIMARY KEY(RegNo),
	FOREIGN KEY (RegNo) REFERENCES StudentsData(RegNo)  ON DELETE CASCADE
);


CREATE TABLE LecturersData(  
	LecID INT IDENTITY(1, 1) ,
	LecName VARCHAR(30),
	PhoneNumber VARCHAR(15),
	NationalID INT,  
	LecMail VARCHAR(50),
	RegistrationDate DATE,
	Password VARCHAR(255),
	DeptID INT NOT NULL,

	PRIMARY KEY(LecID),
	FOREIGN KEY (DeptID) REFERENCES Departments(DeptID)  ON DELETE CASCADE 
); 

CREATE TABLE VerifiedStudents(
	ID INT IDENTITY(1, 1),
	RegNo VARCHAR(30) NOT NULL,
	LecID INT NOT NULL,

	PRIMARY KEY(ID), 
	FOREIGN KEY (RegNo) REFERENCES StudentsData(RegNo),
	FOREIGN KEY (LecID) REFERENCES LecturersData(LecID)  ON DELETE CASCADE
);

CREATE TABLE UnenrolledStudents(
	RegNo VARCHAR(30) , 
	Reason VARCHAR(255), 
	Unenrollment_Date DATE,
	PRIMARY KEY(RegNo)
);


--Populating data to the tables

INSERT INTO StudentData(RegNo, StudentName, StudentMail, PhoneNumber, NationalID, ProfileImage, RegistrationDate, Password, DeptID, CourseID)
VALUES
	('SBE001/001/20', 'John Doe', 'johndoe@example.com', '+254789342190', 123786, 'studentImages/myprofile.png', '2020-01-01', 'password1', 2, 1),
	('SBE002/002/19','Jane Smith', 'janesmith@example.com', '+254789342190', 202086,'studentImages/mypic.png', '2019-03-15', 'password2', 2, 2),
	('SPA001/001/21','Alice Johnson', 'alicejohnson@example.com', '+254789342190', 120216,'studentImages/picture.jpeg', '2021-09-10', 'password3', 4, 1),
	('SCE002/001/20','Michael Brown', 'michaelbrown@example.com', '+254789342190', 122025,'studentImages/myprofile.png', '2020-07-20', 'password4', 3, 2),
	('SBE001/003/21','Emily Davis', 'emilydavis@example.com', '+254789342190', 765486,'studentImages/myprofile.jpg', '2021-12-05', 'password5', 2, 2),
	('SCE003/002/20','Daniel Wilson', 'danielwilson@example.com', '+254789342190', 189326,'studentImages/myprofile.png', '2020-06-18', 'password6', 3, 3),
	('SPA004/002/22','Sophia Thompson', 'sophiathompson@example.com', '+254789342190', 120132,'studentImages/myprofile1.svg', '2022-04-25', 'password7', 4, 1),
	('SAS001/001/19','Matthew Taylor', 'matthewtaylor@example.com', '+254789342190', 875486,'studentImages/profile.png', '2019-09-03', 'password8', 1, 5),
	('SBE001/004/20','Olivia Martinez', 'oliviamartinez@example.com', '+254789342190', 212086,'studentImages/myprofile.jpeg', '2020-11-12', 'password9', 2, 1),
	('SAS002/002/21','Andrew Anderson', 'andrewanderson@example.com', '+254789342190', 280286,'studentImages/myprofile.png', '2021-02-28', 'password10', 1, 2);


INSERT INTO Departments(DeptInitials, DeptName)
VALUES
	('SAS', 'School of Arts & Sociology'),
	('SBE', 'School of Business & Education'),
	('SCE', 'School of Construction & Engineering'),
	('SPA', 'School of Pure & Applied Sciences');


INSERT INTO Courses(CourseCode, CourseName, DeptID)
	VALUES
	('SAS001', 'Fashion Design', 1),
	('SAS002', 'Film Production', 1),
	('SBE001', 'Economics & Statistics', 2),
	('SBE002', 'Business commerce', 2),
	('SCE001', 'Mechanical Engineering', 3),
	('SCE002', 'Electrical Engineering', 3),
	('SCE003', 'Building and Construction', 3),
	('SPA001', 'Mathematics & Computer Science', 4),
	('SPA002', 'Software Engineering', 4),
	('SPA003', 'Forensics', 4),
	('SPA004', 'Applied Statistics', 4);


INSERT INTO ExamRegister(RegNo, ExamCode)
	VALUES
	('SBE001/001/20', 'ex3457'),
	('SPA004/002/22', 'ex1345'),
	('SBE001/003/21', 'ex9076'),
	('SAS002/002/21', 'ex7210'),
	('SCE002/001/20', 'ex7246');


INSERT INTO LecturersData(LecName, PhoneNumber, LecMail, NationalID, DeptID)
	VALUES
	('Key Paul', '+254789342190', 'key@example.com', 534096, 'password1', 2),
	('Vin Bienje', '+254789342190', 'vin@example.com', 71096, 'password2', 1),
	('Phyllis Tedd', '+254789342190', 'tedd2@example.com', 70456, 'password3', 3),
	('Sindy Doe', '+254789342190', 's_doe@example.com', 62104, 'password4', 4);


INSERT INTO Fee(RegNo, PayableFee, FeePaid, Arrears)
	VALUES
	('SBE001/001/20', 33456.00, 23000),
	('SPA004/002/22', 33456.00, 25050),
	('SBE001/003/21', 33456.00, 19567),
	('SAS002/002/21', 33456.00, 2000),
	('SCE002/001/20', 33456.00, 12070);


INSERT INTO VerifiedData(RegNo, LecID)
	VALUES
	('SBE001/001/20', 3),
	('SAS002/002/21', 1),
	('SPA004/002/22', 2);