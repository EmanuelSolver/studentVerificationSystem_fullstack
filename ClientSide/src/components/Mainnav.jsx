import '../stylingFiles/mainnav.css'
import { Context } from '../context/studentContext/context'
import { useContext } from 'react'
import Profile from './Profile'
import Fee from './Fee'
import BookExam from './BookExam'
import '../stylingFiles/mainnav.css'

export function Mainnav() {
    const { student } = useContext(Context)
 
  return (
    <div className='mainnav'>
        <h1>Student Portal</h1>
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
            ): student == 'progress' ? (
                <div className='mainnav-wrapper'>
                    <h2>Student Progress</h2>
                </div>

            ): null
        }
    </div>
  )
}
