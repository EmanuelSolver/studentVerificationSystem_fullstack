import '../stylingFiles/mainnav.css'
import { Context } from '../context/portalcontext/context'
import { useContext } from 'react'
import Profile from './Profile'
import Fee from './Fee'
import BookExam from './BookExam'
import '../stylingFiles/mainnav.css'

export function Mainnav() {
    const { ui } = useContext(Context)
 
  return (
    <div className='mainnav'>
        <h1>Student Portal</h1>
        {
            ui == 'profile' ? (
                <div className='mainnav-wrapper'>
                    <Profile/>
                </div>
            ): ui == 'exam' ? (
                <div className='mainnav-wrapper'>
                    <h2>Exam Registration</h2>
                    <BookExam />
                </div>
            ): ui == 'fee' ? (
                <div className='mainnav-wrapper'>
                    <h2>Fee Statement</h2>
                    <Fee />
                </div>
            ): ui == 'progress' ? (
                <div className='mainnav-wrapper'>
                    <h2>Student Progress</h2>
                </div>

            ): null
        }
       
    
       

 
    </div>
  )
}
