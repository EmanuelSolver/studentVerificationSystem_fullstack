import '../stylingFiles/mainnav.css'
import { Context } from '../context/studentContext/context'
import { useContext } from 'react'
import Profile from './Profile'
import Fee from './Fee'
import BookExam from './BookExam'
import UpdatePassword from './UpdatePassword'
import Unenroll from './Unenroll'

export function Mainnav() {
    const { student } = useContext(Context)
 
  return (
    <div className='mainnav'>
    
        {
            student == 'profile' ? (
                <div className='mainnav-wrapper'>
                    <Profile/>
                </div>
            ): student == 'exam' ? (
                <div className='mainnav-wrapper'>
                    <BookExam />
                </div>
            ): student == 'fee' ? (
                <div className='mainnav-wrapper'>
                    <Fee />
                </div>
            ): student == 'update' ? (
                <div className='mainnav-wrapper'>
                    <UpdatePassword />
                </div>

            ): student == 'unenroll' ? (
                <div className='mainnav-wrapper'>
                    <Unenroll />
                </div>

            ): null
        }
    </div>
  )
}
