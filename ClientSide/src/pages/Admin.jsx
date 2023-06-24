import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import '../stylingFiles/StudentRegister.css';
import '../stylingFiles/StudentLogin.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useContext } from 'react'
import { Context } from "../context/usercontext/context";

const AdminLogin = () => {
  const navigate = useNavigate()
  const { dispatch } = useContext(Context);

 const schema = yup.object().shape({
    password: yup.string().required(),
    email: yup.string().required('Enter admin email'),
 });

 const { register, handleSubmit, formState: { errors } } = useForm({

   resolver: yupResolver(schema),
 });

  const dataToServer = (data) => {
         console.log(data);
         axios.post("http://localhost:8083/login/admin", data)
         .then(({data}) =>{
           if(data.token){
             dispatch({type: "LOGIN_SUCCESS", payload: data})
             alert("Login successful")
             //once you successfully login, redirect to student portal
             navigate('/admindashboard')
           }
        
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
          <h2><i>Admin Login</i> </h2>
        </div>
        
        <div>
          <label htmlFor="email">Enter Email:</label> <br />
          <input type="text" id="email" {...register("email")}/>
          <p>{errors.email?.message}</p> 
        </div>

        <div>
          <label htmlFor="pass">Password:</label> <br />
          <input type="password" id="pass" placeholder=" ****** " {...register("password")}/>
          <p>{errors.password?.message}</p>
        </div>

        <button type="submit">Login</button>
      
    </form>

    </>
    
  );
};

export default AdminLogin;
