import { Context } from '../context/usercontext/context'
import { useContext, useState, useEffect } from 'react'
import '../stylingFiles/profile.css'
import axios from 'axios'
import { apiDomain } from '../utils/utils.jsx'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'


export const StaffProfile = () => {
  
  const { user } = useContext(Context)
    
  return (
  <div className='profile'>
    
    <table className="table">
      <thead>
        <tr>
          <td></td>
          <td></td>
        </tr>
        <tr >
          <th >Lecturer</th>
          <th>Credentials</th>
        </tr>
      </thead>
      <tbody>
      <tr>
          <td>National_ID</td>
          <td>{user.nationalId}</td>
        </tr>
        <tr>
          <td>Lecturer_Name</td>
          <td>{user.username}</td>
        </tr>
        <tr>
          <td>Lecturer_Email</td>
          <td>{user.email}</td>
        </tr>
        <tr>
          <td>Mobile_Number</td>
          <td>{user.phoneNo}</td>
        </tr>
        <tr>
          <td>Department</td>
          <td>{user.department}</td>
        </tr>
        
      </tbody>
    </table>
     
    </div>  
)
}


export const Verify = () =>{

  const { user } = useContext(Context)

  const schema = yup.object().shape({
      code: yup.string().required(),
  })
  
  const { register, handleSubmit, formState: { errors }, reset} = useForm({
      resolver: yupResolver(schema),
  })

  const sendData = async (data) => {
      axios.post(`${apiDomain}/verifyStudent`, data,{
          headers: { 'Authorization': `${user.token}` },
      })
      .then((response) =>{
          response.data.message && alert(response.data.message)
          reset()
      })
      .catch((response) =>{
          alert(response.data.error);
      });
  };

return (
  <div>
    <form className="simple-form" onSubmit={handleSubmit(sendData)}>
          <h3 style={{color:"white", textAlign:"center"}}><i>Verify Student</i></h3>
          <div>
            {/*student image display here */}
          </div> 
          <label htmlFor="">Enter Exam_Code</label><br />
          <input type="text" {...register("code")}/>
          <p>{errors.code?.message}</p>
          <button type='submit'>Check</button>
    </form>
  </div>
)
}


export const Verified = () =>{

  const { user } = useContext(Context)
  const [data, setData] = useState([])

  const getData = async () => {
      const res = await axios.get(`${apiDomain}/verifyStudent`,{
          headers: { 'Authorization': `${user.token}`}
      })
      setData(res.data)
  }
  useEffect(() =>{

      getData()
  }, [])

  
return (
  <div className='profile'>
      <table className="table">
          <thead>
            <tr>
              <th>List_of</th>
                <th>Verified</th>
                <th>Students</th>
            </tr>
              <tr>
                <th>ID</th>
              <th>Student_Name</th>
              <th>Registration_No</th>
              </tr>
              
             

          </thead>
          <tbody>        
      {
          data && data.map((item, index) => {
              return (
                  <>
                      <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{ item.StudentName }</td>
                          <td>{ item.RegNo }</td>
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
