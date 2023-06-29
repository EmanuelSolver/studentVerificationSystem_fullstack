import axios from 'axios'
import { apiDomain } from '../utils/utils.jsx'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import '../stylingFiles/StudentRegister.css';


const UpdatePassword = () => {
    const schema = yup.object().shape({
        password: yup.string().matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{4,}$/
            ,
            'password must contain at least 4 characters,uppercase,lowercase,number & Alphanumerics'
          ).required("Password is required"),
          confirmPassword: yup
            .string()
            .oneOf([yup.ref("password"), null], "Passwords Don't match"),

        nationalId: yup.number().required('Enter National ID No'),
       
    })

 const { register, handleSubmit,formState: { errors }, reset } = useForm({

   resolver: yupResolver(schema),
 });

  const dataToServer = (data) => {
    console.log(data)

        axios.put(`${apiDomain}/updateStudent`, data)
            .then((response) =>{
                response.data.message && alert(response.data.message)
                console.log(response)
                reset()
            })
            .catch((response) =>{
                alert(response.data.error);
                console.log(response)

            });
  };

  return (
    <form className="simple-form" onSubmit={handleSubmit(dataToServer)}>
        <div>
          <h2><i>Update Password</i> </h2>
        </div>

        <label htmlFor="">National ID:</label>
            <input type="text" {...register("nationalId")}/>
            <p>{errors.nationalId?.message}</p>

        <label htmlFor="">New Password:</label>
            <input type="password"{...register("password")}/>
            <p>{errors.password?.message}</p>

        <label htmlFor="">Confirm Password:</label>
            <input type="password" {...register("confirmPassword")}/>
            <p>{errors.confirmPassword?.message}</p>
        <button type='submit'>Submit</button>

    </form>
  );
};

export default UpdatePassword
