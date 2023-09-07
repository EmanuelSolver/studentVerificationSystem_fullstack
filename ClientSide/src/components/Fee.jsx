import  { useContext } from 'react'
import { Context } from '../context/usercontext/context'


function Fee() {
    const { user } = useContext(Context)
    const year = new Date().getFullYear()

  return (
    <div className='simple-form'>
        
        <h2>Tuition & Fee Summary: [{year}/{(year % 100) + 1}]</h2>

        <table className='table'>
            <thead>
                <tr>
                    <th>Fee</th>
                    <th>Statement</th>
                </tr>
                
            </thead>
            <tbody>
                <tr>
                    <td>Registration Number</td> 
                    <td>{user.id}</td>
                </tr>
                <tr>
                    <td>Student Name</td>
                    <td>{user.username}</td>
                </tr>
               
                <tr>
                    <td>Payable Fee</td> 
                    <td> {user.PayableFee}.00</td>
                </tr>
                <tr>
                    <td>Paid Fee</td> 
                    <td> {user.FeePaid}.00</td>
                </tr>
                <tr>
                    <td>Fee Balance</td>
                    <td> {user.balance}.00</td>
                </tr>
            </tbody>
        </table>
      
    </div>
  )
}

export default Fee
