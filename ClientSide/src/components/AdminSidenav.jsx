import '../stylingFiles/sidenav.css'
import { CgProfile } from 'react-icons/cg'
import { FaBookReader } from 'react-icons/fa'
import { FaMoneyCheckAlt } from 'react-icons/fa'
import { GiProgression } from 'react-icons/gi'
import { Context } from '../context/adminContext/context'
import { useContext } from 'react'

export function AdminSidenav() {
    const { dispatch } = useContext(Context)

    const handleStudents = () =>{

        dispatch({type: 'VIEW_STUDENTS', payload: 'viewStudents'})
    }
    
    
    const handleLecturers = () =>{

        dispatch({type: 'VIEW_LECTURERS', payload: 'viewLecturers'})
    }

    const handleFee = () =>{

        dispatch({type: 'FEE', payload: 'fee'})
    }
    const handleRegister = () =>{

        dispatch({type: 'REGISTER_LECTURER', payload: 'registerLecturer'})
    }
    const handleAdmin = () =>{

        dispatch({type: 'ADD_ADMIN', payload: 'addAdmin'})
    }
    
  return (
    <div className="sidenav">
        <div className="sidenav-wrapper">
            <div className="sidenav-title" onClick={handleStudents}><CgProfile/> Students </div>
        </div>

        <div className="sidenav-wrapper">
            <div className="sidenav-title" onClick={handleLecturers}><CgProfile/> Lecturers </div>
        </div>

        <div className="sidenav-wrapper">
            <div className="sidenav-item" onClick={handleFee}><FaMoneyCheckAlt/> Fee</div>
            <div className="sidenav-item" onClick={handleRegister}><FaBookReader/> Register Lecturers</div>
            <div className="sidenav-item" onClick={handleAdmin}><GiProgression/> Add Admin</div>

        </div>
    
    </div>
  )
}

export default AdminSidenav
