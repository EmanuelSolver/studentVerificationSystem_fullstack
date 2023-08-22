import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import LoginForm from './pages/StudentLogin';
import LecturerLogin from './pages/LecturerLogin';
import Departments from './pages/Departments';
import AdminLogin from './pages/Admin';
import Notfound from './pages/Notfound';
import Header from './components/Header';
import SignUpForm from './pages/StudentRegister';
import Footer from './components/Footer';
import StudentPortal from './pages/StudentPortal';
import Dashboard from './pages/Dashboard';
import StaffPortal from './pages/StaffPortal';
import Upload from './components/UploadImage';
import { useContext } from 'react';
import { Context } from './context/usercontext/context';

function App() {
  const { user } = useContext(Context)

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          {/* homepage/running page */}
          <Route path='/' element={<Home />} />
          {/* student login page */}
          <Route path="/studentLogin" element={ <LoginForm  />} />
          {/* Admin page */}
          <Route path="/admin" element={<AdminLogin />} />
           {/* student Register page */}
           <Route path="/studentRegister" element={<SignUpForm  />} />
           {/* Lecture page */}
          <Route path="/LectureLogin" element={<LecturerLogin />} />
            {/* departments page */}
          <Route path="/departments" element={<Departments />} />
           {/* student portal -- if there is a logged in user, student in student portal else redirect to login page*/}
           <Route path="/studentPortal" element={ user ? <StudentPortal /> : < LoginForm />} />
           {/* staff portal */}
           <Route path="/staffPortal" element={<StaffPortal />} />
          {/* upload student image */}
          <Route path="/uploadImage" element={<Upload />} />
           {/* Admin dashboard */}
           <Route path="/adminDashboard" element={<Dashboard />} />
          {/* NotFound page */}
          <Route path="*" element={<Notfound />} />
        </Routes>

        <Footer />
      </BrowserRouter>

    </>
  )
}

export default App