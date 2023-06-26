import '../stylingFiles/sidenav.css'
import { CgProfile } from 'react-icons/cg'
import {MdVerifiedUser } from 'react-icons/md'
import { GoUnverified } from 'react-icons/go'
import { Context } from '../context/staffContext/context'
import { useContext } from 'react'

export function StaffSidenav() {
    const { dispatch } = useContext(Context)

    const handleProfile = () =>{

        dispatch({type: 'PROFILE', payload: 'profile'})
    }
    const handleFee = () =>{

        dispatch({type: 'VERIFY_STUDENTS', payload: 'verify'})
    }
    const handleExam = () =>{

        dispatch({type: 'VERIFIED_STUDENTS', payload: 'verified'})
    }
  
    
  return (
    <div className="sidenav">
        <div className="sidenav-wrapper">
            <div className="sidenav-title" onClick={handleProfile}><CgProfile/> Profile</div>
        </div>
        
        <div className="sidenav-wrapper">
            <div className="sidenav-item" onClick={handleFee}><GoUnverified/> Verify_Students</div>
            <div className="sidenav-item" onClick={handleExam}><MdVerifiedUser/> Verified_Students</div>
        </div>
    
    </div>
  )
}

export default StaffSidenav
