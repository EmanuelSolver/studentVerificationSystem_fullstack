import { getStudents,getLecturers, getFeeStatements, getDepartments, getDepartmentNames, getCourseNames } from '../controllers/activityController.js';
import { studentLogin, registerLecturers,  registerStudents, loginRequired, adminLogin, staffLogin, registerAdmin } from '../controllers/authControllers.js';
import { BookExam, verifyStudent, verifiedStudents, updatePassword, removeStudent } from '../controllers/portalController.js';


const routes = (app) => {
    //Restricted routes, you have to login first
    app.route('/students')
        .post(loginRequired, BookExam)
        .delete(loginRequired, removeStudent)
      
    app.route('/updateStudent')
        .put(updatePassword)

    app.route('/lecturers')
        .get(loginRequired, getLecturers)
        

    app.route('/verifyStudent')
        .post(loginRequired, verifyStudent)
        .get(loginRequired, verifiedStudents)

    app.route('/fee')
        .get(loginRequired, getFeeStatements)

    app.route('/admin')
        .get(loginRequired, getStudents)
        .delete(loginRequired, removeStudent)


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
};
export default routes;