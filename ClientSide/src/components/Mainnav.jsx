import '../stylingFiles/mainnav.css'
import { Context } from '../context/portalcontext/context'
import { useContext } from 'react'
import Profile from './Profile'

export function Mainnav() {
    const { ui } = useContext(Context)
 
  return (
    <div className='mainnav'>
        {
            ui == 'profile' ? (
                <div className='mainnav-wrapper'>
                    <h2>User Profile</h2>
                    <Profile/>
                </div>
            ): ui == 'exam' ? (
                <div className='mainnav-wrapper'>
                    <h2>Exam Registration</h2>
                </div>
            ): ui == 'fee' ? (
                <div className='mainnav-wrapper'>
                    <h2>Fee Statement</h2>
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
