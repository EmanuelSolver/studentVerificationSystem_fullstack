import '../stylingFiles/mainnav.css'
import { Context } from '../context/staffContext/context'
import { useContext } from 'react'
import '../stylingFiles/mainnav.css'
import { StaffProfile, Verify, Verified } from './staffView'

export function StaffMainnav() {
    const { staff } = useContext(Context)
 
  return (
    <div className='mainnav'>
        <h1>Staff Portal</h1>
        {
            staff == 'profile' ? (
                <div className='mainnav-wrapper'>
                    <StaffProfile />
                </div>
            ): staff == 'verify' ? (
                <div className='mainnav-wrapper'>
                    <Verify />
                </div>
            ): staff == 'verified' ? (
                <div className='mainnav-wrapper'>
                    <Verified />
                </div>

            ): null
        }
    </div>
  )
}
