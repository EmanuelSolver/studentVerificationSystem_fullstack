import '../stylingFiles/mainnav.css'
import { Context } from '../context/staffContext/context'
import { useContext } from 'react'
import '../stylingFiles/mainnav.css'
import { staffProfile, Verify, Verified } from './staffView'

export function StaffMainnav() {
    const { staff } = useContext(Context)
 
  return (
    <div className='mainnav'>
        <h1>OurCollege Staff Portal</h1>
        {
            staff == 'profile' ? (
                <div className='mainnav-wrapper'>
                    <h2>staff profile</h2>
                    <staffProfile />
                </div>
            ): staff == 'verify' ? (
                <div className='mainnav-wrapper'>
                    <h2>Verify students</h2>
                    <Verify />
                </div>
            ): staff == 'verified' ? (
                <div className='mainnav-wrapper'>
                    <h2>List of Verified students</h2>
                    <Verified />
                </div>

            ): null
        }
    </div>
  )
}
