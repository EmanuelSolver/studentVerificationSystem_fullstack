import '../stylingFiles/mainnav.css'
import { Context } from '../context/adminContext/context'
import { useContext } from 'react'
import { Students, Lecturers, FeeStatement } from './View'
import AddAdmin from './AddAdmin'
import SignUpForm from '../pages/LecturerRegister'
import Unenroll from './Unenroll'

export function AdminMainnav() {
    const { admin } = useContext(Context)
 
  return (
    <div className='mainnav'>

        {
            admin == 'viewStudents' ? (
                <div className='mainnav-wrapper'>
                    <Students />
                </div>
            ): admin == 'viewLecturers' ? (
                <div className='mainnav-wrapper'>
                    <Lecturers />
                </div>
            ): admin == 'fee' ? (
                <div className='mainnav-wrapper'>
                    <FeeStatement />
                </div>
            ): admin == 'registerLecturer' ? (
                <div className='mainnav-wrapper'>
                  
                    <SignUpForm/>
                </div>

            ): admin == 'addAdmin' ? (
                <div className='mainnav-wrapper'>
                    <AddAdmin/>
                </div>
            ): admin == 'removeStudent' ? (
                <div className='mainnav-wrapper'>
                    <Unenroll />
                </div>
            ): null
        }
    </div>
  )
}
