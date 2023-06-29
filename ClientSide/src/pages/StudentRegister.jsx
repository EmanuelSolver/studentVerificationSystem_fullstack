import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from 'axios'
import '../stylingFiles/StudentRegister.css';
import '../stylingFiles/StudentLogin.css';
import { useNavigate } from 'react-router-dom'
import { apiDomain } from '../utils/utils'
import imageHolder from '../assets/react.svg'


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

    // select image from local machine as profile picture
    const [file, setFile] = useState(null);

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

    const validateFile = (file) => {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (validTypes.indexOf(file.type) === -1) {
        alert('Use .jpeg, .png, .jpg or .gif formats')
      } else if (file.size > 1024 * 1024 * 5) {
        alert('File size is too large')
      } else {
        return true;
      }
    }

    //send data to the database via the local API using axios
    const dataToServer = (data) => {
      console.log(data);
      validateFile(file);
      let imagePath = Date.now() + file.name;
      let category = 'studentImage';
      const formData = new FormData();
      formData.append('imagePath', imagePath);
      formData.append('category', category)
      formData.append('file', file);
      console.log(formData)

      axios.post(`${apiDomain}/register/students`, data, imagePath)
          .then((response) =>{
          response.data.message && alert(response.data.message)
          console.log(imagePath)
          setFile(null);
          console.log(response)
          navigate("/studentLogin")
        })
        .catch(({response}) =>{

          console.log(response.data.error)
        })
    }; 

   

    // const saveImage = async (formData) => {
   
    //   await axios.post(`${apiDomain}/register/students`, formData)
    //     .then((res) => {
    //       alert(res.data.message)
         
    //       setFile(null);
        
    //     }).catch(({ response }) => {
    //       alert(response.data.error)
      
    //     });
    // }


    // const handleUpload = async (e) => {
    //   e.preventDefault();
    //   if (!file) {
    //     alert('Please select an image');
    //   } else {
  
    //     validateFile(file);
    //     let imagePath = Date.now() + file.name;
    //     console.log(imagePath)
    //     let category = 'studentImages';
    //     const formData = new FormData();
    //     formData.append('imagePath', imagePath);
    //     formData.append('category', category)
    //     formData.append('file', file);
    //     console.log(formData)
    //     // send to the server
    //     dataToServer(formData);
  
    //   }
    // }


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
              {
                file ? <img className="displayImg" src={URL.createObjectURL(file)} alt="no pic" />
                  : <img className="displayImg" src={imageHolder} alt="nopic" />
              }
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
              <label htmlFor="">Profile picture</label>
                <input type="file" name="" id="fileInput" onChange={(e) => setFile(e.target.files[0])} />
              <p>{errors.image?.message}</p> 

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
