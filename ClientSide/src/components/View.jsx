import  { useEffect, useContext, useState } from 'react'
import { Context } from '../context/usercontext/context'
import axios from 'axios'
import { apiDomain } from '../utils/utils'

export function Students() {
    const { user } = useContext(Context)
    const [data, setData] = useState([])

    const getData = async () => {
        const res = await axios.get(`${apiDomain}/admin`,{
            headers: { 'Authorization': `${user.token}`}
        })
        setData(res.data)
    }
    useEffect(() =>{

        getData()
    }, [])

    
  return (
    <div className='simple-form'>
        <table className="table">
            <thead>

                <tr>
                    <th>Student Name</th>
                    <th>Registration No</th>
                    <th>Mobile Number</th>
                    <th>National ID</th>
                    <th>Student Email</th>
                </tr>
            </thead>
            <tbody>        
            {
            data && data.map((item, index) => {
                return (
                    <>
                        <tr key={index}>
                            <td>{ item.StudentName }</td>
                            <td>{ item.RegNo }</td>
                            <td>{ item.PhoneNumber }</td>
                            <td>{ item.NationalID }</td>
                            <td>{ item.StudentMail }</td>
                        </tr>                     
                    </>                   
                )
                
              })
            }        
        </tbody>
        </table>    
    </div>
  )
}



export function Lecturers() {
    const { user } = useContext(Context)
    const [data, setData] = useState([])

    const getData = async () => {
        const res = await axios.get(`${apiDomain}/lecturers`,{
            headers: { 'Authorization': `${user.token}`}
        })
        setData(res.data)
    }
    useEffect(() =>{

        getData()
    }, [])

  return (
    <div className='simple-form'>
        <table className="table">
            <thead>
                <th>Lecturer_Name</th>
                <th>National_ID</th>
                <th>Mobile_No</th>
                <th>Email</th>
                <th> </th>

            </thead>
            <tbody>        
        {
            data && data.map((item, index) => {
                return (
                    <>
                        <tr key={index}>
                            <td>{ item.LecName }</td>
                            <td>{ item.NationalID }</td>
                            <td>{ item.PhoneNumber}</td>
                            <td>{ item.LecMail }</td>
                        </tr>                     
                    </>                   
                )
                
              })
        }        
        </tbody>
        </table>        
    </div>
  )
}



export function FeeStatement() {
    const { user } = useContext(Context)
    const [fee, setFee] = useState([])

    const getData = async () => {
        const res = await axios.get(`${apiDomain}/fee`,{
            headers: { 'Authorization': `${user.token}`}
        })
        setFee(res.data)
    }
    
    useEffect(() =>{

        getData()
    }, [])

  return (
    <div className='simple-form'>
        <table className='table'>
            <thead>
                <tr>.</tr>
                <tr>
                <th>Student_Name</th>
                <th>Registration_No</th>
                <th>Fee_Paid </th>
                <th>Fee_Balance</th>
                </tr>
            </thead>
            <tbody>

        {
            fee && fee.map((item, index) => {
                return (
                    <>
                        <tr  key={index}>
                            <td>{item.StudentName}</td>
                            <td>{ item.RegNo }</td>
                            <td>{ item.FeePaid }</td>
                            <td>{ item.Arrears }</td>

                        </tr>
                    
                    </>
                    
                )
                
              })
        }

            </tbody>
        </table>
      
    </div>
  )
}
