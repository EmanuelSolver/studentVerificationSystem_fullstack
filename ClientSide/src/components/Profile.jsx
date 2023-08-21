import '../stylingFiles/profile.css'
import { useContext } from 'react'
import { Context } from '../context/usercontext/context'

function Profile() {
    const { user } = useContext(Context)
    
    return (
    <div className='simple-form'>
        <h2>Student Profile</h2>
        <table className="table">
        <thead>
    
          <tr >
            <th >Student</th>
            <th>Credentials</th>
           
          </tr>
        </thead>

        <tbody>
        <tr>
            <td>National ID</td>
            <td>{user.nationalId}</td>
          </tr>
          <tr>
            <td>Student Name</td>
            <td>{user.username}</td>
          </tr>
          <tr>
            <td>Student Email</td>
            <td>{user.email}</td>
          </tr>
         
          <tr>
            <td>Registration No</td>
            <td>{user.id}</td>
          </tr>
          <tr>
            <td>Mobile Number</td>
            <td>{user.phone}</td>
          </tr>
          <tr>
            <td>Department</td>
            <td>{user.department}</td>
          </tr>
          <tr>
            <td>Course</td>
            <td>{user.course}</td>
          </tr>
          
        </tbody>
      </table>
       
      </div>
    
  )
}

export default Profile
