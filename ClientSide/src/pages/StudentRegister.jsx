import { useForm } from "react-hook-form";
import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import '../stylingfiles/StudentRegister.css';

const departments = ['Arts & Sociology', 'Business & Education', 'Construction & Engineering', 'Pure & Applied Sciences'];
const courses = ['Fashion Design', 'Film Production','Economics & Statistics', 'Business commerce', 'Mechanical Engineering','Electrical Engineering', 'Forensics', 'Mathematics & Computer Science']; // Replace with your course options

const SignUpForm = () => {
 const schema = yup.object().shape({
    userName: yup.string().required('Please, add your userName'),
    email: yup.string().email().required(),
    phone: yup.string().matches(
      /^\+(?:[0-9]){10,}$/,
      'Add International phone No'
    ),
    regNo: yup.string().required('Please, Add Registration Number'),
    idno: yup.number().required('Enter a number'),
    course: yup.string().required("select your course"),
 });

 const { register, handleSubmit, formState: { errors } } = useForm({

   resolver: yupResolver(schema),
 });

  const dataToServer = (data) => {
         console.log(data);
  };

  // select image from local machine as profile picture
  const [selectedImage, setSelectedImage] = useState('http://dummy-images.com/abstract/dummy-540x960-Comb.jpg');

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
  };

  return (
    <form className="simple-form" onSubmit={handleSubmit(dataToServer)}>
        <div>
          <h2><i>Student Registration</i> </h2>
        </div>

        <div className="profile">
          <img src={selectedImage} alt="profile pic" />
        </div> 
        
        <div>
          <label htmlFor="name">Registration No:</label> <br />
          <input type="text" id="name" placeholder="your username" {...register("regNo")}/>
          <p>{errors.regNo?.message}</p> 
        </div>

        <div>
          <label htmlFor="name">Student Name:</label> <br />
          <input type="text" id="name" placeholder="your username" {...register("userName")}/>
          <p>{errors.userName?.message}</p>
        </div>

        <div>
          <label htmlFor="email">Student Mail:</label> <br />
            <input type="email" id="email" placeholder='e.g. yourname@example.com' {...register("email")}/>
            <p>{errors.invalidEmail?.message}</p>
        </div> 

        <div>
          <label htmlFor="">Profile picture</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        <div>
          <label htmlFor="phone">Phone Number:</label> <br />
            <input type="tel" id="phone" placeholder='e.g. +21134567891' {...register("phone")}/>
            <p>{errors.phone?.message}</p>
        </div> 

        <div>
          <label htmlFor="idno">National ID:</label> <br />
            <input type="number" id="idno" {...register("idno")}/>
            <p>{errors.idno?.message}</p>
        </div> 

        <div>
          <label htmlFor="date">Registration Date:</label>
          <input type="date" {...register("date")} />
            <p>{errors.date?.message}</p>
        </div>

        <div>
          <label htmlFor="name">Department:</label>
            <select name="department" id="department" {...register("department")}>
                <option > - select - </option>
                {departments.map((dept, index) => (
                    <option key={dept} value={index}> {dept} </option>
                ))}
            </select>
          
            <p>{errors.dapartment?.message}</p>
        </div>

        <div>
          <label htmlFor="name">Course:</label>
            <select name="course" id="course" {...register("course")}>
                <option > - select - </option>
                {courses.map((course, index) => (
                    <option key={index} value={index}> {course} </option>
                ))}
            </select>
          
            <p>{errors.course?.message}</p>
        </div>

        <button type="submit">Submit</button>
    
      
    </form>
  );
};

export default SignUpForm;
