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
      <div className="user-details">
        <h2>UserName: {user.username}</h2>
        <h2>Registration No:{user.id}</h2>
        <h2>Student Email:{user.email} </h2>
      </div>
    </div>
  )
}

export default Profile
