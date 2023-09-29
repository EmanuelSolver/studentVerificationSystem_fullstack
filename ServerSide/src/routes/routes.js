import multer from 'multer';
import sql from 'mssql';
import config from '../db/config.js'; 
import { getStudents,getLecturers, getFeeStatements, getDepartments, getDepartmentNames, getCourseNames } from '../controllers/activityController.js';
import { studentLogin, registerLecturers,  registerStudents, loginRequired, adminLogin, staffLogin, registerAdmin } from '../controllers/authControllers.js';
import { BookExam, saveUnits, verified, verifyStudent, verifiedStudents, updatePassword, removeStudent } from '../controllers/portalController.js';

const routes = (app) => {
    //Restricted routes, you have to login first
    app.route('/students')
        .post(loginRequired, BookExam)
        .delete(loginRequired, removeStudent)
      
    app.route('/updateStudent')
        .put(updatePassword)

    app.route('/lecturers')
        .get(loginRequired, getLecturers)
    
    app.route('/verified/:reg/:id')
        .post(verified)

    app.route('/verifyStudent')
        .post(loginRequired, verifyStudent)
        .get(loginRequired, verifiedStudents)

    app.route('/fee')
        .get(loginRequired, getFeeStatements)

    app.route('/admin')
        .get(loginRequired, getStudents)
        .delete(loginRequired, removeStudent)
    
    app.route('/saveUnits')
        .post(loginRequired, saveUnits)

    // open routes
    app.route('/departments')
        .get(getDepartments)

    app.route('/departmentNames')
        .get(getDepartmentNames)

    app.route('/courseNames')
        .get(getCourseNames)

    app.route('/register/lecturers')
        .post(registerLecturers);

    app.route('/register/students')
        .post(registerStudents);

    app.route('/login/student')
        .post(studentLogin);

    app.route('/login/staff')
        .post(staffLogin);

    app.route('/login/admin')
        .post(adminLogin);

        //an admin can be registered only by another admin
    app.route('/register/admin')
        .post(registerAdmin)


//upload student profile image
;
//setup multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images"); //null is error
    },
    filename: (req, file, cb) => {
        cb(null, req.body.category_image);
    },
});

const upload = multer({ storage: storage }); //upload file

    app.post("/upload", upload.single("file"), async (req, res) => {
            //single file upload
            try {
                const { regNo, category_image } = req.body;
                let pool = await sql.connect(config.sql);
                await pool.request()
                    .input("regNo", sql.VarChar, regNo)
                    .input("image", sql.VarChar, category_image)
                    .query("UPDATE StudentsData SET StudentImage = @image WHERE RegNo = @regNo");
                res.status(201).json({ message: 'Successful Registration' });
            } catch (error) {
                res.status(500).json({ error: error.message });
            } finally {
                sql.close();
            }
        });
};
export default routes;
