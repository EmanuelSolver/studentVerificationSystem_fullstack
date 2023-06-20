import '../stylingFiles/StudentPortal.css';
import { Link } from 'react-router-dom';

function StudentPortal() {
  return (
    <div>
      <h1><i>OurCollege Student Portal</i></h1>

      <div className="sidebar">
          <Link to="/" className='nav-links' > Profile</Link>
          <Link to="/fee" className='nav-links'> Fee</Link>
          <Link to="/registerExam" className='nav-links' >Book Exam</Link>
          <Link to="/units" className='nav-links'> Progress</Link>
          <Link className='logout'> Logout</Link>
        
      </div>
    </div>
  )
}

export default StudentPortal

