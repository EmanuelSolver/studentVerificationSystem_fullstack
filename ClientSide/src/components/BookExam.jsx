import '../stylingFiles/BookExam.css'
import { Context } from '../context/usercontext/context'
import { useContext } from 'react'
import axios from 'axios'
import { apiDomain } from '../utils/utils.jsx'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

function BookExam() {
    const { user } = useContext(Context)

    const schema = yup.object().shape({
        description: yup.string().required(),
    })
    
    const { register, handleSubmit, formState: { errors }, reset} = useForm({
        resolver: yupResolver(schema),
    })
    const sendData = async (data) => {
        axios.post(`${apiDomain}/api/`, data,{
            headers: { 'Authorization': `${user.token}` },
        })
        .then((response) =>{
            response.data.message && alert(response.data.message)
            reset()
        })
        .catch((response) =>{
            alert(response.data.error);
        });
    };
  return (
    <div>
      <form onSubmit={handleSubmit(sendData)}>
            <input type="text" {...register("description")}/>
            <input type="submit" value="submit"/>
      </form>
    </div>
  )
}

export default BookExam
