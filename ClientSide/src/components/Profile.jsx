import '../stylingFiles/profile.css'
import { useContext } from 'react'
import { Context } from '../context/usercontext/context'

function Profile() {
    const { user } = useContext(Context)
  return (
    <div className='profile'>

      <div className="userAvator">
      <img src="honeycomb2.jpg" alt="not found" className='user-image'/>

      </div>
      
        <table className="table">
        <thead>
          <tr>
            <td></td>
            <td></td>
          </tr>
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
          
        </tbody>
      </table>
       
      </div>
    
  )
}

export default Profile
