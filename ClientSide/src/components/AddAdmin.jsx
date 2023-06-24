import axios from 'axios'
import { apiDomain } from '../utils/utils.jsx'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import '../stylingFiles/StudentRegister.css';


const AddAdmin = () => {
    const schema = yup.object().shape({
        userName: yup.string().required(),
        nationalId: yup.number().required(),
        email: yup.string().required(),
    })

 const { register, handleSubmit, reset } = useForm({

   resolver: yupResolver(schema),
 });

  const dataToServer = (data) => {

    axios.post(`${apiDomain}/register/admin`, data)
    .then((response) =>{
        response.data.message && alert(response.data.message)
        reset()
    })
    .catch((response) =>{
        alert(response.data.error);
    });
  };


  return (
    <form className="simple-form" onSubmit={handleSubmit(dataToServer)}>
        <div>
          <h2><i>ADD ADMIN</i> </h2>
        </div>

        <label htmlFor="">UserName:</label>
            <input type="text" {...register("userName")}/>
        <label htmlFor="">Email:</label>
            <input type="email"{...register("email")}/>
        <label htmlFor="">National ID:</label>
            <input type="number" {...register("nationalId")}/>
        <input type="submit" value="submit"/>

    </form>
  );
};

export default AddAdmin
