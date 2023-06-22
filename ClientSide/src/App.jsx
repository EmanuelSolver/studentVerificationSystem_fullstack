import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import LoginForm from './pages/StudentLogin';
import LectureLogin from './pages/LectureLogin';
import Departments from './pages/Departments';
import AdminLogin from './pages/Admin';
import Notfound from './pages/Notfound';
import Header from './components/Header';
import SignUpForm from './pages/StudentRegister';
import Footer from './components/Footer';
import StudentPortal from './pages/StudentPortal';
import Dashboard from './pages/Dashboard';
import StaffPortal from './pages/StaffPortal';

function App() {

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          {/* homepage/running page */}
          <Route path='/' element={<Home />} />
          {/* student login page */}
          <Route path="/studentlogin" element={<LoginForm  />} />
          {/* Admin page */}
          <Route path="/admin" element={<AdminLogin />} />
           {/* student Register page */}
           <Route path="/studentregister" element={<SignUpForm  />} />
           {/* Lecture page */}
          <Route path="/LectureLogin" element={<LectureLogin />} />
            {/* departments page */}
          <Route path="/departments" element={<Departments />} />
           {/* student portal */}
           <Route path="/studentportal" element={<StudentPortal />} />
           {/* staff portal */}
           <Route path="/staffportal" element={<StaffPortal />} />
           {/* Admin dashboard */}
           <Route path="/admindashboard" element={<Dashboard />} />
          {/* NotFound page */}
          <Route path="*" element={<Notfound />} />
        </Routes>

        <Footer />
      </BrowserRouter>

    </>
  )
}

export default App