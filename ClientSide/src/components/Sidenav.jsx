import '../stylingFiles/sidenav.css'
import { CgProfile } from 'react-icons/cg'
import { FaBookReader } from 'react-icons/fa'
import { FaMoneyCheckAlt } from 'react-icons/fa'
import { GiProgression } from 'react-icons/gi'
import { Context } from '../context/portalcontext/context'
import { useContext } from 'react'

export function Sidenav() {
    const { dispatch } = useContext(Context)

    const handleProfile = () =>{

        dispatch({type: 'PROFILE', payload: 'profile'})
    }
    const handleFee = () =>{

        dispatch({type: 'FEE', payload: 'fee'})
    }
    const handleExam = () =>{

        dispatch({type: 'BOOK_EXAM', payload: 'exam'})
    }
    const handleProgress = () =>{

        dispatch({type: 'PROGRESS', payload: 'progress'})
    }
    
  return (
    <div className="sidenav">
        <div className="sidenav-wrapper">
            <div className="sidenav-title" onClick={handleProfile}><CgProfile/> Profile</div>
        </div>
        
        <div className="sidenav-wrapper">
            <div className="sidenav-item" onClick={handleFee}><FaMoneyCheckAlt/> Fee</div>
            <div className="sidenav-item" onClick={handleExam}><FaBookReader/> BookExam</div>
            <div className="sidenav-item" onClick={handleProgress}><GiProgression/> Progress</div>

        </div>
    
    </div>
  )
}

export default Sidenav