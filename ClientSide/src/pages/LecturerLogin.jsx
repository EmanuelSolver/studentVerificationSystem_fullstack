import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import '../stylingFiles/StudentRegister.css';
import '../stylingFiles/StudentLogin.css';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { apiDomain } from '../utils/utils'
import { useContext } from 'react'
import { Context } from "../context/usercontext/context";

const LectureLogin = () => {
    const navigate = useNavigate()
    const { dispatch } = useContext(Context);

  const schema = yup.object().shape({
      password: yup.string().required(),
      email: yup.string().required('Enter userName'),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({

    resolver: yupResolver(schema),
  });

    const dataToServer = (data) => {

          axios.post(`${apiDomain}/login/staff`, data)
          .then(({data}) =>{
            if(data.token){
              dispatch({type: "LOGIN_SUCCESS", payload: data})
      
              //once you successfully login, redirect to staff portal
              navigate('/staffportal')
            }
          
            })
            .catch(({response}) =>{

            console.log(response.data.error)
            })
    };

    return (
      <div>
        <div id="background-video">
            <video  autoPlay loop muted>
              <source src="video-2.mp4" type="video/mp4" />
            </video>
          </div>

          <form className="simple-form" onSubmit={handleSubmit(dataToServer)}>
          <div>
            <h2><i>Staff Login</i> </h2>
          </div>
          
          <div>
            <label htmlFor="regNo">Enter Email:</label> <br />
            <input type="text" id="regNo" {...register("email")}/>
            <p>{errors.email?.message}</p> 
          </div>

          <div>
            <label htmlFor="pass">Password:</label> <br />
            <input type="password" id="pass" placeholder=" ****** " {...register("password")}/>
            <p>{errors.password?.message}</p>
          </div>

          <button type="submit">Login</button>
        
      </form>     
    </div>
    
  );
};

export default LectureLogin;
