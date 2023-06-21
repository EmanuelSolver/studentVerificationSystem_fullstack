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
    const { regNo, studentEmail, studentName, deptId, courseId, nationalId, phoneNo, image} = req.body;
    
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
            await pool.request()
                .input('regNo', sql.VarChar, regNo)
                .input('studentName', sql.VarChar, studentName)
                .input('mail', sql.VarChar, studentEmail)
                .input('hashedpassword', sql.VarChar, hashedPassword)
                .input('courseId', sql.Int, courseId)
                .input('deptId', sql.Int, deptId)
                .input('nationalId', sql.Int, nationalId)
                .input('image', sql.VarChar, image)
                .input('phoneNo', sql.VarChar, phoneNo)
                .input('regDate', sql.VarChar, regDate)
                .query('INSERT INTO StudentsData (RegNo, StudentName, StudentMail, PhoneNumber, NationalID, ProfileImage, RegistrationDate, Password, DeptID, CourseID) VALUES (@regNo, @studentName, @mail, @phoneNo, @nationalId, @image, @regDate,  @hashedPassword, @deptId, @courseId)');
            res.status(200).send({ message: 'Registered successfully' });
        }

    } catch (error) {

        res.status(500).json({ error: error.message});
    } finally {

        sql.close();
    }

};


export const registerLecturers = async (req, res) => {
    const { lecName, phoneNo, nationalId, lecMail, password, deptId} = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const regDate = new Date().toLocaleDateString();

    try {
        let pool = await sql.connect(config.sql);
        const result = await pool.request()
            .input('nationalId', sql.VarChar, nationalId)
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

export const studentLogin = async (req, res) => {
    const { regNo, password } = req.body;
    let pool = await sql.connect(config.sql);

    const result = await pool.request()
        .input('regNo', sql.VarChar, regNo)
        .query('SELECT * FROM StudentsData WHERE RegNo = @regNo');

    const user = result.recordset[0];
    if (!user) {
        res.status(401).json({ error: 'Authentication failed. Wrong credentials.' });
    } else {
        if (!bcrypt.compareSync(password, user.Password)) {
            res.status(401).json({ error: 'Authentication failed. Wrong credentials.' });
        } else {
            const token = `JWT ${jwt.sign({ username: user.StudentName, email: user.StudentMail }, config.jwt_secret)}`;
            res.status(200).json({ email: user.StudentMail, username: user.StudentName, id: user.RegNo, token: token });
        }
    }

};