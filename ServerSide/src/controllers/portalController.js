import sql from 'mssql';
import config from '../db/config.js'
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';

export const  BookExam = async(req, res) =>{
    dotenv.config();
    const { GMAIL_PASS } = process.env;

    const { regNo } = req.body;
    let pool = await sql.connect(config.sql);

    const result = await pool.request()
        .input('regNo', sql.VarChar, regNo)
        .query('SELECT s.StudentMail, s.RegNo, f.Arrears FROM StudentsData s JOIN Fee f ON s.RegNo = f.RegNo WHERE s.RegNo = @regNo');

    const user = result.recordset[0];

    if(user){

        if(user.Arrears <= 0){
            //Generate an exam code to send to student
            const examCode = 'EX' + (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
            const receiver = user.StudentMail
            const regNo = user.RegNo
        
            //insert the code into the ExamRegister table
            await pool.request()
                .input('examCode', sql.VarChar, examCode)
                .input('regNo', sql.VarChar, regNo)
                .query('INSERT INTO ExamRegister (RegNo, ExamCode) VALUES (@regNo, @examCode)');
                res.status(200).send({ message: 'Booked Exam successfully -- Your ExamCode is @examCode' });

        }

        else{
            res.status(200).send('Please Clear Outstanding Fee');
        }
        
    }
    
}

export const verifyStudent = async(req, res) => {
    try {
        const { code } = req.body;

        let pool = await sql.connect(config.sql);
        const result = await pool.request()
            .input('code', sql.VarChar, code)
            .query('SELECT e.RegNo, s.ProfileImage FROM ExamRegister e JOIN StudentsData s ON e.RegNo = s.RegNo WHERE ExamCode = @code');
        
        !result.recordset[0] ? res.status(404).json({ message: 'Record not found' }) // check if there is a record in the table
            : res.status(200).json(result.recordset); // return the result
    } catch (error) {

        res.status(500).json({ error: 'Student Not Registered for Exam' });
    } finally {

        sql.close();
    }   
}


export const verifiedStudents = async(req, res) => {
    try {
        let pool = await sql.connect(config.sql);  //establish a connection to the database
        const result = await pool.request()        // make a request to the database
            .query("SELECT v.RegNo, s.StudentName FROM VerifiedStudents v JOIN StudentsData s ON v.RegNo = s.RegNo");     // query the employees table in the database

        !result.recordset[0] ? res.status(404).json({ message: 'Record not found' }) // check if there is a record in the table
            : res.status(200).json(result.recordset); // return the result

    } catch (error) {

        res.status(201).json({ error: error.message });
    } finally {

        sql.close(); // Close the SQL connection
    }
}

export const updatePassword = async(req, res) =>{
    const { nationalId, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    
    try {
      
        let pool = await sql.connect(config.sql)

        const result = await pool.request()
            .input('idNo', sql.Int, nationalId)
            .query('SELECT * FROM StudentsData WHERE NationalID = @idNo');
    
        const user = result.recordset[0];
        if (user) { 
            await pool.request()
                .input('idNo', sql.Int, nationalId)
                .input('hashedPassword', sql.VarChar, hashedPassword)
                .query('UPDATE StudentsData SET Password = @hashedPassword WHERE NationalID = @idNo');
            res.status(200).json({ Message: 'Password Updated successfully' });

        } else{
            res.status(404).json({ Error: 'User Does not Exist' });

        }
      
    } catch (error) {

        res.status(500).json({ Error: error.message });
    } finally {

        sql.close();
    }

};


export const removeStudent = async (req, res) => {
    const { regNo, nationalId, reason } = req.body;
    const regDate = new Date().toLocaleDateString();

    try {
      const pool = await sql.connect(config.sql);
      const result = await pool
        .request()
        .input('regNo', sql.VarChar, regNo)
        .input('idNo', sql.Int, nationalId)
        .query('SELECT * FROM StudentsData WHERE RegNo = @regNo AND NationalID = @idNo');
  
      const user = result.recordset[0];
      if (user) {
        await pool
          .request()
          .input('regNo', sql.VarChar, regNo)
          .query('DELETE FROM StudentsData WHERE RegNo = @regNo');
  
        await pool
          .request()
          .input('regNo', sql.VarChar, regNo)
          .input('reason', sql.VarChar, reason)
          .input('regDate', sql.VarChar, regDate)
          .query('INSERT INTO UnenrolledStudents(RegNo, Reason, Unenrollment_Date) VALUES(@regNo, @reason, @regDate)');
  
        res.status(200).json({ message: 'Student unenrolled successfully' });
      } else {
        res.status(404).json({ error: "Student doesn't exist" });
      }
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while unenrolling the student' });
    } finally {
      sql.close();
    }
  };
  