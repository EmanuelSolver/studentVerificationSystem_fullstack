import sql from 'mssql';
import config from '../db/config.js'

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

export const getFeeStatements = async (req, res) => {
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

export const getDepartments = async(req, res) =>{
    try {
        let pool = await sql.connect(config.sql);  //establish a connection to the database
        const result = await pool.request()        // make a request to the database
            .query("SELECT d.DeptName, d.DeptInitials, d.DeptDescription, s.CourseName FROM Departments d JOIN Courses s ON d.DeptId = s.DeptId");     // query the employees table in the database

        !result.recordset[0] ? res.status(404).json({ message: 'Record not found' }) // check if there is a record in the table
            : res.status(200).json(result.recordset); // return the result

    } catch (error) {

        res.status(201).json({ error: error.message });
    } finally {

        sql.close(); // Close the SQL connection
    }
}

export const getDepartmentNames = async(req, res) =>{
    try {
        let pool = await sql.connect(config.sql);  //establish a connection to the database
        const result = await pool.request()        // make a request to the database
            .query("SELECT DeptName, DeptInitials FROM Departments");     // query the employees table in the database

        !result.recordset[0] ? res.status(404).json({ message: 'No Records found' }) // check if there is a record in the table
            : res.status(200).json(result.recordset); // return the result

    } catch (error) {

        res.status(201).json({ error: error.message });
    } finally {

        sql.close(); 
    }
}

export const getCourseNames = async(req, res) =>{
    try {
        let pool = await sql.connect(config.sql);  //establish a connection to the database
        const result = await pool.request()        // make a request to the database
            .query("SELECT CourseName FROM Courses");     // query the employees table in the database

        !result.recordset[0] ? res.status(404).json({ message: 'Courses not found' }) // check if there is a record in the table
            : res.status(200).json(result.recordset); // return the result

    } catch (error) {

        res.status(201).json({ error: error.message });
    } finally {
        // sql.close(); 
    }   
}

