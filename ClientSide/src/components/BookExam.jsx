import { Context } from '../context/usercontext/context'
import { useContext } from 'react'
import axios from 'axios'
import { apiDomain } from '../utils/utils.jsx'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import '../stylingFiles/StudentRegister.css';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function BookExam() {
    const { user } = useContext(Context)

    const schema = yup.object().shape({
        regNo: yup.string().required(),
    })
    
    const { register, handleSubmit, formState: { errors }, reset} = useForm({
        resolver: yupResolver(schema),
    })

    const checkFee = ()=>{
        if(user.balance > 0){
            toast.error('Clear the Fee Balance')
        }
    }

    const sendData = async (data) => {
        axios.post(`${apiDomain}/students`, data,{
            headers: { 'Authorization': `${user.token}` },
        })
        .then((response) =>{
            response.data.message && toast.success(response.data.message)
            reset()
        })
        .catch((response) =>{
            toast.error(response.data.error);
        });
    };

  return (
    <div>
      <form className="simple-form" onSubmit={handleSubmit(sendData)}>
            <h3 style={{color:"white", textAlign:"center"}}><i>Fee Balance: </i> {user.balance}.00</h3>
            <label htmlFor="">Confirm your Registration No</label><br />
            <input type="text" {...register("regNo")}/>
            <p>{errors.regNo?.message}</p>
            <button type='submit' onClick={checkFee}>Book</button>
      
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
              />
      </form>
    </div>
  )
}

export default BookExam
