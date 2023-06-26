import sql from 'mssql';
import config from '../db/config.js'
import bcrypt from 'bcrypt'

export const getStudents = async (req, res) => {
    try {
        let pool = await sql.connect(config.sql);  //establish a connection to the database
        const result = await pool.request()        // make a request to the database
            .query("SELECT * FROM StudentsData");     // query the employees table in the database

        !result.recordset[0] ? res.status(404).json({ message: 'Record not found' }) // check if there is a record in the table
            : res.status(200).json(result.recordset); // return the result

    } catch (error) {

        res.status(201).json({ error: error.message });
    } finally {

        sql.close(); // Close the SQL connection
    }
};

export const getLecturers = async (req, res) => {
    try {
        let pool = await sql.connect(config.sql);  //establish a connection to the database
        const result = await pool.request()        // make a request to the database
            .query("SELECT * FROM LecturersData");     // query the employees table in the database

        !result.recordset[0] ? res.status(404).json({ message: 'Record not found' }) // check if there is a record in the table
            : res.status(200).json(result.recordset); // return the result

    } catch (error) {

        res.status(201).json({ error: error.message });
    } finally {

        sql.close(); // Close the SQL connection
    }
};

export const geFeeStatements = async (req, res) => {
    try {
        let pool = await sql.connect(config.sql);  //establish a connection to the database
        const result = await pool.request()        // make a request to the database
            .query("SELECT f.RegNo, f.FeePaid, f.Arrears, s.StudentName FROM Fee f JOIN StudentsData s ON f.RegNo = s.RegNo");     // query the employees table in the database

        !result.recordset[0] ? res.status(404).json({ message: 'Record not found' }) // check if there is a record in the table
            : res.status(200).json(result.recordset); // return the result

    } catch (error) {

        res.status(201).json({ error: error.message });
    } finally {

        sql.close(); // Close the SQL connection
    }
};

export const removeStudent = async (req, res) => {
    try {
        const { regNo } = req.body;
        await sql.connect(config.sql);
        await sql.query`DELETE FROM StudentsData WHERE RegNo = ${regNo}`;
        res.status(200).json({ message: 'Record Deleted successfully' });

    } catch (error) {

        res.status(500).json({ error: 'An error occurred while deleting the Record' });
    } finally {

        sql.close();
    }
};


export const getInfo = async(req, res) =>{
    res.send('getting info for a particular person');
}


export const updatePassword = async(req, res) =>{
    try {
        const { regNo, password } = req.body;
        const hashedPassword = bcrypt.hashSync(password, 10);
        let pool = await sql.connect(config.sql)

        const result = await pool.request()
            .input('regNo', sql.VarChar, regNo)
            .query('SELECT * FROM StudentsData WHERE RegNo = @regNo');
    
        const user = result.recordset[0];
        if (user) { 
            await sql.query`UPDATE StudentsData SET Password = ${hashedPassword} WHERE RegNo = ${regNo}`;
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