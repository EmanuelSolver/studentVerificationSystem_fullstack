
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Context } from '../context/usercontext/context';
import { useContext } from 'react';
import { apiDomain } from '../utils/utils';

const Unenroll = () => {
  const { user, dispatch } = useContext(Context);
  const navigate = useNavigate();

  const schema = yup.object().shape({
    regNo: yup.string().required('Please confirm your Registration No'),
    nationalId: yup.number().required('Please enter ID NO'),
    reason: yup.string().required('Please provide a reason for deregistration'),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const handleUnenroll = async (data) => {
    try {
      await axios.delete(`${apiDomain}/students`, {
        headers: { Authorization: user.token },
        data,
      });

      alert('Student deregistered successfully');
      dispatch({ type: 'LOGOUT' });
      navigate('/studentLogin');
    } catch (error) {
      if (error.response) {
        alert(error.response.data.error);
      } else {
        alert('An error occurred while processing your request.');
      }
    }
  };

  return (
    <div>
      <form className="simple-form" onSubmit={handleSubmit(handleUnenroll)}>
        <h2>De-Registration Process</h2>
     

        <div>
          <label htmlFor="regNo">Reason for UnEnrollment:</label>
          <br />
          <textarea type="text-area" placeholder="Highlight some reasons" {...register('reason')} />
          <p>{errors.reason?.message}</p>
        </div>

        <div>
          <label htmlFor="regNo">Registration No:</label>
          <br />
          <input type="text" id="regNo" {...register('regNo')} />
          <p>{errors.regNo?.message}</p>
        </div>

        <div>
            <label htmlFor="pass">National ID NO:</label> <br />
            <input type="number" {...register("nationalId")}/>
            <p>{errors.nationalId?.message}</p>
        </div>

        <button type="submit">UnEnroll</button>
      </form>
    </div>
  );
};

export default Unenroll;
