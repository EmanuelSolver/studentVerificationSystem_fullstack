import { Context } from '../context/usercontext/context'
import { useContext, useState, useEffect } from 'react'
import '../stylingFiles/profile.css'
import axios from 'axios'
import { apiDomain } from '../utils/utils.jsx'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PdfGenerator from './RegisterDownloader';


export const StaffProfile = () => {
  
  const { user } = useContext(Context)
    
  return (
    <div className='simple-form'>
      <h1 style={{color:"white", textAlign:"center"}}><i>Staff Profile</i></h1>
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


export const Verify = () => {
  const [result, setResult] = useState('');
 
  const { user } = useContext(Context);

  const schema = yup.object().shape({
    code: yup.string().required(),
  });

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const sendData = async (data) => {
    try {
      const response = await axios.post(`${apiDomain}/verifyStudent`, data, {
        headers: { 'Authorization': `${user.token}` },
      });
  
      toast.success(response.data.message, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    

      setResult(response.data[0])
     
      reset();
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.error, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      } else {
        toast.error('An error occurred while verifying student registration', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
    }
  };
  

  const handleVerify = async () => {
    if (!result.RegNo) {
      toast.error('Student registration number is missing.', {
        // ...toast configuration
      });
      return;
    }
  
    // Create a new FormData object to send verification data
    try {
      const response = await axios.post(`${apiDomain}/verified/${encodeURIComponent(result.RegNo)}/${encodeURIComponent(user.id)}`,{
          headers: { Authorization: user.token },
        }
      );
  
      if (response.data.message) {
        toast.success(response.data.message, {
          // ...toast configuration
        });
      } else {
        setResult('');
      }

      reset();
    } catch (error) {
      toast.error(error.response.data.error || 'An error occurred while verifying student registration', {
        // ...toast configuration
      });
    }
  };
  
  
  return (
    <div className="simple-form">
      <form onSubmit={handleSubmit(sendData)}>
        <h1 style={{ color: "white", textAlign: "center" }}><i>Verify Student</i></h1>
        <div>
          {result ? (
            <img src={`${apiDomain}/images/${result.StudentImage}`} style={{ width: "50%", borderRadius: "10%", marginLeft: "25%" }} alt="image" />
          ) : (
            <img style={{ width: "70%", borderRadius: "10%", marginLeft: "15%" }} src="keyboard.jpg" alt="nopic" />
          )}
        </div>
        {result ? (
         
          <h2 style={{ color: "white" }}>{result.RegNo} - {result.StudentName}</h2>
        ) : (
          <h3 style={{ color: "grey", marginLeft: "10%" }}>Check ExamCode you Entered</h3>
        )}
         <div>
            {
              result && (
                <div className='verification' style={{display: "flex"}}>
                  <input type="button" style={{marginBottom:"10px", backgroundColor:"green", width:"40%", height:"5%", borderRadius:"10%", fontSize:"large", cursor:"pointer"}} onClick={handleVerify} value={"verify"} />
                  <input type="button" style={{marginBottom:"10px", backgroundColor:"brown", width:"40%", height:"5%", borderRadius:"10%", fontSize:"large", cursor:"pointer"}}  value={"Reject"} onClick={()=>setResult('')}/>
                </div>
           
                ) 
            }
          </div>

        <label htmlFor="">Enter Exam_Code</label><br />
        <input type="text" placeholder='e.g EX1111' {...register("code")} />
        <p>{errors.code?.message}</p>
      

        <input type="submit" style={{ marginLeft: "40%", width: "90px", fontSize: "20px", borderRadius:"5%"}} value="submit" />
           
        <ToastContainer
          position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
        />
      </form>
    </div>
  );
};



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
  <div className='simple-form'>
      <h1 style={{color:"white"}}><i>List of Verified Students</i></h1>
      <table className="table">
          <thead>
          
              <tr>
                <th>ID</th>
              <th>Student Name</th>
              <th>Registration No</th>
              </tr>    

          </thead>
          <tbody>        
      {
          data && data.map((item, index) => {
              return (
                      <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{ item.StudentName }</td>
                          <td>{ item.RegNo }</td>
                      </tr>                                        
              ) 
            })
      }        
      </tbody>
      </table> 

      <div>
      
      <PDFDownloadLink document={<PdfGenerator data={data} />} fileName="examRegister.pdf">
        {({ loading }) =>
           <button className="download-button">
           {loading ? 'Loading document...' : 'Download Register'}
         </button>
        }
      </PDFDownloadLink>
    </div>   
  </div>
)
}
