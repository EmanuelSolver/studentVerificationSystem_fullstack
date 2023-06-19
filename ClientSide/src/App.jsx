import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import LoginForm from './pages/StudentLogin';
import LectureLogin from './pages/LectureLogin';
import Departments from './pages/Departments';
import AdminLogin from './pages/Admin';
import Notfound from './pages/Notfound';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          {/* homepage/running page */}
          <Route path='/' element={<Home />} />
          {/* blogs page */}
          <Route path="/studentlogin" element={<LoginForm  />} />
          {/* Admin page */}
          <Route path="/admin" element={<AdminLogin />} />
           {/* Lecture page */}
          <Route path="/LectureLogin" element={<LectureLogin />} />
            {/* Lecture page */}
          <Route path="/departments" element={<Departments />} />
          {/* NotFound page */}
          <Route path="*" element={<Notfound />} />
        </Routes>

        <Footer />
      </BrowserRouter>

    </>
  )
}

export default App