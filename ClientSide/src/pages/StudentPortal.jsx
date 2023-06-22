import '../stylingFiles/StudentPortal.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../context/usercontext/context';

function StudentPortal() {
  
  const { user } = useContext(Context)
  console.log(user)

  return (
    <div className='portal'>
      <br /><br /> 
      <h1><i>OurCollege Student Portal</i></h1>
      <h3>Student Name: {user.username}</h3>
      <h3>Student Password: {user.email}</h3>
      <h3>Registration No: {user.id}</h3>



      <div className="sidebar">
          <Link to="/profile" className='links' > Profile</Link>
          <Link to="/fee" className='links'> Fee</Link>
          <Link to="/registerExam" className='links' >Book Exam</Link>
          <Link to="/units" className='links'> Progress</Link>
          <Link className='logout'> Logout</Link>
        
      </div>
    </div>
  )
}

export default StudentPortal

