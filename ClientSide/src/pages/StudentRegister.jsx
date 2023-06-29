import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from 'axios'
import '../stylingFiles/StudentRegister.css';
import '../stylingFiles/StudentLogin.css';
import { useNavigate } from 'react-router-dom'
import { apiDomain } from '../utils/utils'
import imageHolder from '../../public/graduation-icon.svg'


const SignUpForm = () => {

      const navigate = useNavigate()
      //get departments and courses from the database
      const [department, setDepartment] = useState([])
      const [course, setCourse] = useState([])

      const getDepartments = async () => {
          const response = await axios.get(`${apiDomain}/departmentNames`,)
          setDepartment(response.data)
      }

      //get courses
      const getCourses = async () => {
        const res = await axios.get(`${apiDomain}/courseNames`,)
        setCourse(res.data)
    }

    useEffect(() =>{
      
        getDepartments()
        getCourses()
    }, [])


    //create a schema to validate input fields before submission
    const schema = yup.object().shape({
        studentName: yup.string().required('Please, add your userName'),
        studentEmail: yup.string().email().required(),
        phoneNo: yup.string().matches(
          /^\+(?:[0-9]){10,}$/,
          'Add International phone No'
        ),
        regNo: yup.string().required('Please, Add Registration Number'),
        nationalId: yup.number().required('Enter a number'),
        deptId: yup.string().required('select department'),
        courseId: yup.string().required("select your course"),
        image: yup.string(),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({

        resolver: yupResolver(schema),
    });


    //send data to the database via the local API using axios
    const dataToServer = (data) => {
      console.log(data);
  

      axios.post(`${apiDomain}/register/students`, data)
          .then((response) =>{
          response.data.message && alert(response.data.message)
          
          console.log(response)
          navigate("/studentLogin")
        })
        .catch(({response}) =>{

          console.log(response.data.error)
        })
    }; 


    return (
      <>  
          <div id="background-video">
            <video  autoPlay loop muted>
              <source src="video-2.mp4" type="video/mp4" />
            </video>
          </div>

          <form className="simple-form" onSubmit={handleSubmit(dataToServer)}>
            <div>
              <h2><i>Student Registration</i> </h2>
            </div>

            {/* display selected image */}
            <div className="profile">
        
              <img className="displayImg" src={imageHolder} alt="nopic" />
            </div> 
            
            <div>
              <label htmlFor="name">Registration No:</label> <br />
              <input type="text" id="name" placeholder="your username" {...register("regNo")}/>
              <p>{errors.regNo?.message}</p> 
            </div>

            <div>
              <label htmlFor="name">Student Name:</label> <br />
              <input type="text" id="name" placeholder="your username" {...register("studentName")}/>
              <p>{errors.studentName?.message}</p>
            </div>

            <div>
              <label htmlFor="email">Student Mail:</label> <br />
                <input type="email" id="email" placeholder='e.g. yourname@example.com' {...register("studentEmail")}/>
                <p>{errors.studentEmail?.message}</p>
            </div> 

            <div>
              <label htmlFor="phone">Phone Number:</label> <br />
                <input type="tel" id="phone" placeholder='e.g. +00134567891' {...register("phoneNo")}/>
                <p>{errors.phoneNo?.message}</p>
            </div> 

            <div>
              <label htmlFor="idNo">National ID:</label> <br />
                <input type="number" id="idNo" {...register("nationalId")}/>
                <p>{errors.nationalId?.message}</p>
            </div> 

            <div>
              <label htmlFor="name">Department:</label>
                <select name="department" id="department" {...register("deptId")}>
                    <option > - select - </option>
                    {department.map((dept, index) => (
                        <option key={index} value={index + 1}>({dept.DeptInitials}) {dept.DeptName} </option>
                    ))}
                </select>
              
                <p>{errors.deptId?.message}</p>
            </div>

            <div>
              <label htmlFor="name">Course:</label>
                <select name="course" id="course" {...register("courseId")}>
                    <option > - select - </option>
                    {course.map((item, index) => (
                        <option key={index} value={index + 1}>{item.CourseName}</option>
                    ))}
                </select>
                <p>{errors.courseId?.message}</p>
            </div>

            <button type="submit" >Submit</button>
      
        
          </form>
      </>
      
    );
};

export default SignUpForm;
