import { useState } from 'react'
import '../stylingFiles/upload.css'
import Placeholder from '../../public/honeycomb.jpg'
import Loading from './Loading';
import Axios from 'axios';
import { apiDomain } from '../utils/utils'
import { useNavigate } from 'react-router-dom'
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Upload() {
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [regNo, setRegNo] = useState('');

  const navigate = useNavigate()

  
  const validateFile = (file) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (validTypes.indexOf(file.type) === -1) {
      alert('File format is incorrect use .jpeg, .pnp or .jpg')
    } else if (file.size > 1024 * 1024 * 5) {
      alert('File size is too large')
    } else {
      return true;
    }
  }

  const saveImage = async (formData) => {
    setLoading(true);
    await Axios.post(`${apiDomain}/upload`, formData)
      .then((res) => {
        res.data.message && toast.success(res.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
          console.log(res)

          setTimeout(() => {
            navigate("/uploadImage")
        }, 3000);
        //fetchImages();
        setLoading(false);
        setFile(null);
        setCategory('');

      }).catch(({ response }) => {
        alert(response.data.error)
        setLoading(false);
      });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please select an image');
    } else if (!category) {
      alert('Please select a category');

    } else {
      validateFile(file);
      let category_image = Date.now() + file.name;
      const formData = new FormData();
      formData.append('category_name', category);
      formData.append('category_image', category_image);
      formData.append('regNo', regNo); 
      formData.append('file', file);
      // send to the server
      saveImage(formData);
    }
  }

  return (
    <>
      <div className="container">
        {
          loading ? <Loading /> : null
        }
        <h3>Add Profile Picture</h3><hr />
        <div className="row-form">
          <form className='upload-form'>
            <div className='upload-form_display'>
              {
                file ? <img className="displayImg" src={URL.createObjectURL(file)} alt="no pic" />
                  : <img className="displayImg" src={Placeholder} alt="nopic" />
              }
            </div>
            <div className='upload-form_inputs'>
              <label htmlFor="cate">Profile Category</label>
              <select name="cate" id="cate" onChange={(e) => setCategory(e.target.value)}>
                <option value=""> - Who are you? - </option>
                <option value="student">student</option>
                <option value="staff">Staff</option>
                
              </select>
              <input type="file" name="" id="fileInput" onChange={(e) => setFile(e.target.files[0])} />
              <label htmlFor="regNo">Confirm Registration No</label>
              <input type="text" name="" id="regNo"  onChange={(e) => setRegNo(e.target.value)}/>
              <button type="submit" onClick={handleSubmit} >{loading ? 'Loading...' : 'Upload'} </button>
            </div>

            <ToastContainer
              position="top-right"
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
      </div>
    </>
  )
}

export default Upload