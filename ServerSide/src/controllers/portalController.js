import sql from 'mssql';
import config from '../db/config.js'
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

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
                res.status(200).send({ message: 'Booked Exam successfully' });

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
                to: `${receiver}`, // Recipient address
                subject: 'ExamCode!', // Subject line
                text: `This is your unique Exam Code ${examCode}`, // Plain text body
                html: '<b>This is ourCollege Institute.</b>' // HTML body
            };
            
            // Send the email
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error sending email:', error);
                } else {
                    console.log('Check your Email:', info.response);
                }
            });
        }

        else{
            res.status(200).send('Please Clear Outstanding Fee');
        }
        
    }
    
}

export const verifyStudent = async(req, res) => {
    
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