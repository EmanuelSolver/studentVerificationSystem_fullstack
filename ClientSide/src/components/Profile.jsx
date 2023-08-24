import '../stylingFiles/profile.css'
import { useContext } from 'react'
import { Context } from '../context/userContext/context'
import { apiDomain } from '../utils/utils.jsx'

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
            <td><img className='user-image' src={`${apiDomain}/images/${user.image}`} alt="no pic" />
            </td>
            <td>{user.username}</td>
          </tr>
          <tr>
            <td>Registration No</td>
            <td>{user.id}</td>
          </tr>
          <tr>
            <td>Student Email</td>
            <td>{user.email}</td>
          </tr>
          <tr>
            <td>Phone Number</td>
            <td>{user.phone}</td>
          </tr>
          <tr>
            <td>National ID</td>
            <td>{user.nationalId}</td>
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
