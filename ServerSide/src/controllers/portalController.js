import sql from 'mssql';
import config from '../db/config.js'
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
dotenv.config();
const { GMAIL_PASS } = process.env;


export const  BookExam = async(req, res) =>{
    dotenv.config();
    const { GMAIL_PASS } = process.env;

    const { regNo } = req.body;
    let pool = await sql.connect(config.sql);

    const result = await pool.request()
        .input('regNo', sql.VarChar, regNo)
        .query('SELECT s.StudentName, s.StudentMail, s.RegNo, f.Arrears FROM StudentsData s JOIN Fee f ON s.RegNo = f.RegNo WHERE s.RegNo = @regNo');

    const user = result.recordset[0];

    if(user){

        if(user.Arrears <= 0){
            //Generate an exam code to send to student
            const examCode = 'EX' + (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
            const receiver = user.StudentMail
            const studentName = user.StudentName
            const regNo = user.RegNo
        
            //insert the examCode into the ExamRegister table
            await pool.request()
                .input('examCode', sql.VarChar, examCode)
                .input('regNo', sql.VarChar, regNo)
                .query('INSERT INTO ExamRegister (RegNo, ExamCode) VALUES (@regNo, @examCode)');
                res.status(200).send({ message: `Booked Exam successfully` });

            // Create a transporter using SMTP settings for Gmail
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'personalmygallery@gmail.com', // Your Gmail address
                    pass: GMAIL_PASS // Your Gmail password or application-specific password
                }
            });

            // Define the email options
            const mailOptions = {
                from: 'personalmygallery@gmail.com', // Sender address
                to: receiver, // Recipient address
                subject: 'Unique Student Exam Code', // Subject line
                html: `Hello ${studentName}, <br> Exam Code for ${regNo} is <b>${examCode} </b> <br> Kindly don't share this unique code`, // Plain text body
                // html: '<b>This is the HTML version of the email.</b>' // HTML body
            };

            // Send the email
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error sending email:', error);
                } else {
                    console.log('Email sent:', info.response);
                }
            });

        }

        else{
            res.status(200).send('Please Clear Outstanding Fee');
        }
        
    }
    
}


export const verifyStudent = async (req, res) => {
    try {
        const { code } = req.body;

        const pool = await sql.connect(config.sql);
        const { recordset } = await pool.request()
            .input('code', sql.VarChar, code)
            .query('SELECT e.RegNo, s.StudentName, s.StudentImage FROM ExamRegister e JOIN StudentsData s ON e.RegNo = s.RegNo WHERE ExamCode = @code');
        
        if (recordset.length === 0) {
            return res.status(204).end(); // No Content
        }

        res.status(200).json(recordset);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while verifying student registration' });
    } finally {
        sql.close();
    }
};


export const verified = async (req, res) => {
    const { regNo, lecturerId } = req.body;
  
    console.log("Received regNo:", regNo);
    console.log("Received lecturerId:", lecturerId);
  
    const dateTime = new Date();
  
    try {
      let pool = await sql.connect(config.sql);
      
      // Check if the student with the given regNo is already verified
      const result = await pool.request()
        .input('regNo', sql.VarChar, regNo)
        .query('SELECT * FROM VerifiedStudents WHERE RegNo = @regNo');
      
      const user = result.recordset[0];
  
      if (user) {
        res.status(409).json({ error: 'Student with the same RegNo is already verified' });
      } else {
        // Insert the verification data into the database
        await pool.request()
          .input('regNo', sql.VarChar, regNo)
          .input('lecId', sql.Int, lecturerId)
          .input('date', sql.DateTime, dateTime)
          .query('INSERT INTO VerifiedStudents (RegNo, LecID, VerificationDate) VALUES (@regNo, @lecId, @date)');
  
        res.status(200).send({ message: 'Student Verified' });
      }
    } catch (error) {
      console.error("Error processing verification:", error);
      res.status(500).json({ error: error.message });
    } finally {
      sql.close();
    }
  };
  

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
  