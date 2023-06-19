import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import '../stylingfiles/StudentRegister.css';
import '../stylingFiles/StudentLogin.css';


const LectureLogin = () => {
 const schema = yup.object().shape({
    password: yup.string().required(),
    userName: yup.string().required('Enter userName'),
 });

 const { register, handleSubmit, formState: { errors } } = useForm({

   resolver: yupResolver(schema),
 });

  const dataToServer = (data) => {
         console.log(data);
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
          <h2><i>Staff Login</i> </h2>
        </div>
        
        <div>
          <label htmlFor="regNo">Enter UserName:</label> <br />
          <input type="text" id="regNo" {...register("userName")}/>
          <p>{errors.regNo?.message}</p> 
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

export default LectureLogin;