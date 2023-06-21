import { getAll, removeStudent, updatePassword, getInfo } from '../controllers/activityController.js';
import { studentLogin, registerLecturers,  registerStudents, loginRequired } from '../controllers/userControllers.js';

const routes = (app) => {
    //Restricted routes, you have to login first
    app.route('/activity')
        .get(loginRequired, getAll)
        .put(loginRequired, updatePassword)
        .delete(loginRequired, removeStudent)

    app.route('/activity/:id')
        .get(loginRequired, getInfo)
  

    // open routes
    app.route('/register/lecturers')
        .post(registerLecturers);

    app.route('/register/students')
        .post(registerStudents);

    app.route('/login/student')
        .post(studentLogin);


};
export default routes;