import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import '../stylingFiles/StudentRegister.css';
import '../stylingFiles/StudentLogin.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { Context } from "../context/usercontext/context";
import { apiDomain }from '../utils/utils';

const Unenroll = () => {

  const { user, dispatch } = useContext(Context);
  
  //help us navigate to other routes
  const navigate = useNavigate()

    const schema = yup.object().shape({
        password: yup.string().required(),
        regNo: yup.string().required('Confirm your Registration No'),
        reason: yup.string().required('Describe the reason for Deregistration'),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({

      resolver: yupResolver(schema),
    });


    const sendData = async (data) => {
      console.log(data);

      axios.delete(`${apiDomain}/students`, data,{
          headers: { 'Authorization': `${user.token}` },
      })
      .then((response) =>{
          response.data.message && alert(response.data.message)
          console.log(response)
          //once the student is deregistered, we logout
          dispatch({type: "LOGOUT", payload: data})
          navigate('/studentLogin')
      })
      .catch((response) =>{
          alert(response.data.error);
      });
  };

      return (
        <>

          <form className="simple-form" onSubmit={handleSubmit(sendData)}>
            <div>
              <h2><i>De-Registration Process</i> </h2>
              <h3>Confirm your Credentials Before Un-enrolling</h3>
            </div>
            
            <div>
              <label htmlFor="regNo">Reason for UnEnrollment:</label> <br />
                <input type="text" placeholder="we regret losing you... Highlight some reasons" {...register("reason")}/>
                <p>{errors.reason?.message}</p> 
            </div>

            <div>
              <label htmlFor="regNo">Registration No:</label> <br />
              <input type="text" id="regNo" {...register("regNo")}/>
              <p>{errors.regNo?.message}</p> 
            </div>

            <div>
              <label htmlFor="pass">National ID NO:</label> <br />
              <input type="number" id="pass" {...register("nationalId")}/>
              <p>{errors.nationalId?.message}</p>
            </div>

            <button type="submit">UnEnroll</button>
          
        </form>
        </>
        
      );
};

export default Unenroll;
