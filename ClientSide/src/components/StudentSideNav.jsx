import '../stylingFiles/sidenav.css'
import { CgProfile } from 'react-icons/cg'
import { FaBookReader } from 'react-icons/fa'
import { FaMoneyCheckAlt } from 'react-icons/fa'
import { GrUpdate } from 'react-icons/gr'
import { MdOutlineAdUnits } from 'react-icons/md'
import { FcCancel } from 'react-icons/fc'
import { Context } from '../context/studentContext/context'
import { useContext } from 'react'

export function Sidenav() {
    const { dispatch } = useContext(Context)

    const handleProfile = () =>{

        dispatch({type: 'PROFILE', payload: 'profile'})
    }
    const handleFee = () =>{

        dispatch({type: 'FEE', payload: 'fee'})
    }
    const handleUnits = () =>{

        dispatch({type: 'UNITS', payload: 'units'})
    }
    const handleExam = () =>{

        dispatch({type: 'BOOK_EXAM', payload: 'exam'})
    }
    const handleUpdate = () =>{

        dispatch({type: 'UPDATE', payload: 'update'})
    }
    const handleUnenroll = () =>{

        dispatch({type: 'UNENROLL', payload: 'unenroll'})
    }
    
  return (
    <div className="sidenav">
        <div className="sidenav-wrapper">
            <div className="sidenav-title" onClick={handleProfile}><CgProfile/> Profile</div>
        </div>
        
        <div className="sidenav-wrapper">
            <div className="sidenav-item" onClick={handleFee}><FaMoneyCheckAlt/> Fee</div>
            <div className="sidenav-item" onClick={handleUnits}><MdOutlineAdUnits/>Units</div>
            <div className="sidenav-item" onClick={handleExam}><FaBookReader/> BookExam</div>
            <div className="sidenav-item" onClick={handleUpdate}><GrUpdate/> Update</div>
            <div className="sidenav-item" onClick={handleUnenroll}><FcCancel/> UnEnroll</div>

        </div>
    
    </div>
  )
}

export default Sidenav
