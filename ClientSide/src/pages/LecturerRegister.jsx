import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import '../stylingfiles/StudentRegister.css';


const departments = ['Arts & Sociology', 'Business & Education', 'Construction & Engineering', 'Pure & Applied Sciences'];

const SignUpForm = () => {
 const schema = yup.object().shape({
    userName: yup.string().required('Enter your Name'),
    email: yup.string().email().required(),
    regNo: yup.string().required('Enter Registration No'),
    idno: yup.number().required('Enter National No'),
    department: yup.string().required("Select department"),
 });

 const { register, handleSubmit, formState: { errors } } = useForm({

   resolver: yupResolver(schema),
 });

  const dataToServer = (data) => {
         console.log(data);
  };


  return (
    <form className="simple-form" onSubmit={handleSubmit(dataToServer)}>
        <div>
          <h2><i>Lecturer Registration</i> </h2>
        </div>


        <div>
          <label htmlFor="name">Lecturer Name:</label> <br />
          <input type="text" id="name" placeholder="Your username" {...register("userName")}/>
          <p>{errors.userName?.message}</p>
        </div>

        <div>
          <label htmlFor="email">Lecturer Mail:</label> <br />
            <input type="email" id="email" placeholder='e.g. yourname@example.com' {...register("email")}/>
            <p>{errors.invalidEmail?.message}</p>
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
          <label htmlFor="name">Department:</label>
            <select name="department" id="department" {...register("department")}>
                <option > - select - </option>
                {departments.map((dept, index) => (
                    <option key={dept} value={index}> {dept} </option>
                ))}
            </select>
          
            <p>{errors.dapartment?.message}</p>
        </div>

        <button type="submit">Submit</button>
    
      
    </form>
  );
};

export default SignUpForm;
