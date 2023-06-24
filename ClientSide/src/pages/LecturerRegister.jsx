import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from 'axios'
import { apiDomain } from "../utils/utils";
import '../stylingFiles/StudentRegister.css';


const departments = ['Arts & Sociology', 'Business & Education', 'Construction & Engineering', 'Pure & Applied Sciences'];

const SignUpForm = () => {
 const schema = yup.object().shape({
    lecName: yup.string().required('Enter your Name'),
    lecMail: yup.string().email().required('Email Email'),
    phoneNo: yup.string().matches(
      /^\+(?:[0-9]){10,}$/,
      'Add International phone No'
    ),
    nationalId: yup.number().required('Enter National No'),
    deptId: yup.string().required("Select department"),
 });

 const { register, handleSubmit, formState: { errors }, reset } = useForm({

   resolver: yupResolver(schema),
 });

  const dataToServer = (data) => {

        axios.post(`${apiDomain}/register/lecturers`, data)
         .then((response) =>{
              response.data.message && alert(response.data.message)
              reset()
          })
          .catch(({response}) =>{

            alert(response.data.error)
          })
  };


  return (
    <form className="simple-form" onSubmit={handleSubmit(dataToServer)}>
        <div>
          <h2><i>Lecturer Registration</i> </h2>
        </div>


        <div>
          <label htmlFor="name">Lecturer Name:</label> <br />
          <input type="text" id="name" placeholder="Your username" {...register("lecName")}/>
          <p>{errors.lecName?.message}</p>
        </div>

        <div>
          <label htmlFor="email">Lecturer Mail:</label> <br />
            <input type="email" id="email" placeholder='e.g. yourname@example.com' {...register("lecMail")}/>
            <p>{errors.lecMail?.message}</p>
        </div> 


        <div>
          <label htmlFor="phone">Phone Number:</label> <br />
            <input type="tel" id="phone" placeholder='e.g. +21134567891' {...register("phoneNo")}/>
            <p>{errors.phoneNo?.message}</p>
        </div> 

        <div>
          <label htmlFor="idno">National ID:</label> <br />
            <input type="text" id="idno" {...register("nationalId")}/>
            <p>{errors.nationalId?.message}</p>
        </div> 

        <div>
          <label htmlFor="name">Department:</label>
            <select name="department" id="department" {...register("deptId")}>
                <option > - select - </option>
                {departments.map((dept, index) => (
                    <option key={dept} value={index + 1}> {dept} </option>
                ))}
            </select>
          
            <p>{errors.deptId?.message}</p>
        </div>

        <button type="submit">Submit</button>
       
    </form>
  );
};

export default SignUpForm;
