import sql from 'mssql';
import config from '../db/config.js'; 
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';


export const loginRequired = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized user!' });
    }
};

export const registerStudents = async (req, res) => {
    
    const { regNo, studentEmail, studentName, deptId, courseId, nationalId, phoneNo} = req.body;
    
    const hashedPassword = bcrypt.hashSync(nationalId.toString() , 10);
    const regDate = new Date().toLocaleDateString();

    try {
        let pool = await sql.connect(config.sql);
        const result = await pool.request()
            .input('regNo', sql.VarChar, regNo)
            .query('SELECT * FROM StudentsData WHERE RegNo = @regNo');
        
        const user = result.recordset[0];
        if (user) {
            res.status(409).json({ error: 'Student already exists' });
        } else {
            //every time a student is registered, mimic fee payment and randomize fee paid by the student
            const min1 = 10000
            const max1 = 50000
            const min2 = 35000
            const max2 = 70000
            //generate random numbers
            const feePaid = Math.floor(Math.random() * (max1 - min1) + min1);
            const payableFee = Math.floor(Math.random() * (max2 - min2) + min2);
            const balance = payableFee - feePaid;
            
            await pool.request()
                .input('regNo', sql.VarChar, regNo)
                .input('studentName', sql.VarChar, studentName)
                .input('mail', sql.VarChar, studentEmail)
                .input('hashedpassword', sql.VarChar, hashedPassword)
                .input('courseId', sql.Int, courseId)
                .input('deptId', sql.Int, deptId)
                .input('nationalId', sql.Int, nationalId)
                .input('phoneNo', sql.VarChar, phoneNo)
                .input('regDate', sql.VarChar, regDate)
                .query('INSERT INTO StudentsData (RegNo, StudentName, StudentMail, PhoneNumber, NationalID, RegistrationDate, Password, DeptID, CourseID) VALUES (@regNo, @studentName, @mail, @phoneNo, @nationalId, @regDate,  @hashedPassword, @deptId, @courseId)');
            
            //inserting in Fee table can only happen after student registration
            await pool.request()
                .input('regNo', sql.VarChar, regNo)
                .input('payableFee', sql.Int, payableFee)
                .input('feePaid', sql.Int, feePaid)
                .input('balance', sql.Int, balance)
                .query('INSERT INTO Fee (RegNo, PayableFee, FeePaid, Arrears) VALUES (@regNo, @payableFee, @feePaid, @balance)')

                res.status(200).send({ message: 'Registered successfully' });

        }

    } catch (error) {

        res.status(500).json({ error: error.message});
    } finally {

        sql.close();
    }

};


export const registerLecturers = async (req, res) => {
    const { lecName, phoneNo, nationalId, lecMail, deptId} = req.body;
    const hashedPassword = bcrypt.hashSync(nationalId.toString() , 10);
    const regDate = new Date().toLocaleDateString();

    try {
        let pool = await sql.connect(config.sql);
        const result = await pool.request()
            .input('nationalId', sql.Int, nationalId)
            .query('SELECT * FROM LecturersData WHERE NationalID = @nationalId');
        
            const user = result.recordset[0];
        if (user) {
            res.status(409).json({ error: 'Lecturer with same National ID already exists' });
        } else {
            await pool.request()
                .input('lecName', sql.VarChar, lecName)
                .input('mail', sql.VarChar, lecMail)
                .input('hashedpassword', sql.VarChar, hashedPassword)
                .input('deptId', sql.Int, deptId)
                .input('nationalId', sql.Int, nationalId)
                .input('phoneNo', sql.VarChar, phoneNo)
                .input('regDate', sql.VarChar, regDate)

                .query('INSERT INTO lecturersData (LecName, PhoneNumber, NationalID, LecMail, RegistrationDate, Password, DeptID) VALUES (@lecName, @phoneNo, @nationalId, @mail, @regDate,  @hashedPassword, @deptId)');
            res.status(200).send({ message: 'Registered successfully' });
        }

    } catch (error) {

        res.status(500).json({ error: error.message });
    } finally {

        sql.close();
    }

};


export const registerAdmin = async (req, res) => {
    const { email, nationalId, userName} = req.body;
    const hashedPassword = bcrypt.hashSync(nationalId.toString(), 10);
    const regDate = new Date().toLocaleDateString();

    try {
        let pool = await sql.connect(config.sql);
        const result = await pool.request()
            .input('email', sql.VarChar, email)
            .query('SELECT * FROM AdminsData WHERE Email = @email');
        
            const user = result.recordset[0];
        if (user) {
            res.status(409).json({ error: 'Admin already exists' });
        } else {
            await pool.request()
                .input('userName', sql.VarChar, userName)
                .input('mail', sql.VarChar, email)
                .input('hashedpassword', sql.VarChar, hashedPassword)
                .input('nationalId', sql.Int, nationalId)
                .input('regDate', sql.VarChar, regDate)

                .query('INSERT INTO AdminsData (UserName, Email, NationalID, Password, RegDate) VALUES (@userName, @mail, @nationalId,  @hashedPassword, @regDate)');
            res.status(200).send({ message: 'Registered successfully' });
        }

    } catch (error) {

        res.status(500).json({ error: error.message });
    } finally {

        sql.close();
    }

};


export const studentLogin = async (req, res) => {
    const { regNo, password } = req.body;
    let pool = await sql.connect(config.sql);

    const result = await pool.request()
        .input('regNo', sql.VarChar, regNo)
        .query(`SELECT s.RegNo, s.StudentName, s.Password, s.StudentMail, s.PhoneNumber, s.NationalID, d.DeptName, c.CourseName, f.PayableFee, f.FeePaid, f.Arrears FROM StudentsData s
            JOIN Departments d ON s.DeptID = d.DeptID
            JOIN Courses c ON s.CourseID = c.CourseID
            JOIN Fee f ON  s.RegNo = f.RegNo
            WHERE s.RegNo = @regNo`);

    const user = result.recordset[0];
    if (!user) {
        res.status(401).json({ error: 'Not a Registered student' });
    } else {
        if (!bcrypt.compareSync(password, user.Password)) {
            res.status(401).json({ error: 'Authentication failed. Wrong credentials.' });
        } else {
            const token = `JWT ${jwt.sign({ username: user.StudentName, email: user.StudentMail }, config.jwt_secret)}`;
            res.status(200).json({ email: user.StudentMail, username: user.StudentName, id: user.RegNo, phone: user.PhoneNumber, nationalId: user.NationalID, department: user.DeptName, course: user.CourseName, balance: user.Arrears, PayableFee: user.PayableFee, FeePaid: user.FeePaid, token: token });
        }
    }

};


export const staffLogin = async (req, res) => {
    const { email, password } = req.body;
    let pool = await sql.connect(config.sql);

    const result = await pool.request()
        .input('email', sql.VarChar, email)
        .query("SELECT L.LecName, L.PhoneNumber, L.LecMail, L.Password, L.NationalID, d.DeptName FROM LecturersData L JOIN Departments d ON L.DeptID = d.DeptID WHERE L.LecMail = @email");

    const user = result.recordset[0];
    if (!user) {
        res.status(401).json({ error: 'Not Found' });
    } else {
        if (!bcrypt.compareSync(password, user.Password)) {
            res.status(401).json({ error: 'Wrong credentials.' });
        } else {
            const token = `JWT ${jwt.sign({ username: user.LecName, email: user.LecMail }, config.jwt_secret)}`;
            res.status(200).json({ email: user.LecMail, username: user.LecName, nationalId: user.NationalID, phoneNo: user.PhoneNumber, department: user.DeptName, token: token });
        }
    }

};

export const adminLogin = async (req, res) => {
    const { email, password } = req.body;
    let pool = await sql.connect(config.sql);

    const result = await pool.request()
        .input('email', sql.VarChar, email)
        .query('SELECT * FROM AdminsData WHERE Email = @email');

    const user = result.recordset[0];
    if (!user) {
        res.status(401).json({ error: 'Not Found' });
    } else {
        if (!bcrypt.compareSync(password, user.Password)) {
            res.status(401).json({ error: 'Wrong credentials.' });
        } else {
            const token = `JWT ${jwt.sign({ username: user.UserName, email: user.Email }, config.jwt_secret)}`;
            res.status(200).json({ email: user.Email, username: user.UserName, id: user.id, token: token });
        }
    }

};