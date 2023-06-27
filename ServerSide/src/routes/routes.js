import { getStudents,getLecturers, getFeeStatements, removeStudent, updatePassword, getInfo } from '../controllers/activityController.js';
import { studentLogin, registerLecturers,  registerStudents, loginRequired, adminLogin, staffLogin, registerAdmin } from '../controllers/authControllers.js';
import { BookExam, verifyStudent, verifiedStudents } from '../controllers/portalController.js';

const routes = (app) => {
    //Restricted routes, you have to login first
    app.route('/students')
        .post(loginRequired, BookExam)
        .put(loginRequired, updatePassword)
    

    app.route('/lecturers')
        .get(loginRequired, getLecturers)
        

    app.route('/verifyStudent')
        .post(loginRequired, verifyStudent)
        .get(loginRequired, verifiedStudents)

    app.route('/fee')
        .get(loginRequired, getFeeStatements)

    app.route('/admin')
        .get(loginRequired, getStudents)
        .get(loginRequired, getInfo)
        .delete(loginRequired, removeStudent)
  

    // open routes
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
};
export default routes;