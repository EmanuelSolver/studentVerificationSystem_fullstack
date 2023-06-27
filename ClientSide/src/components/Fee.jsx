
import  { useContext } from 'react'
import { Context } from '../context/usercontext/context'


function Fee() {
    const { user } = useContext(Context)
    
  return (
    <div>
        <table className='table'>
            <thead>
                <tr>
                    <th>Fee</th>
                    <th>Statement</th>
                </tr>
                
            </thead>
            <tbody>
                <tr><td>Student_Name</td><td>{user.username}</td></tr>
                <tr><td>Registration_Number</td> <td>{user.id}</td></tr>
                <tr><td>Payable Fee</td> <td> {user.PayableFee}.00</td></tr>
                <tr><td>Paid Fee</td> <td> {user.FeePaid}.00</td></tr>
                <tr><td>Fee Balance</td> <td> {user.balance}.00</td></tr>
            </tbody>
        </table>
      
    </div>
  )
}

export default Fee
