import { useEffect, useState } from 'react';
import '../stylingFiles/upload.css';
import Placeholder from '../../public/honeycomb.jpg';
import Loading from './Loading';
import Axios from 'axios';
import { apiDomain } from '../utils/utils';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ref, uploadBytes, getDownloadURL, listAll, list} from "firebase/storage";
import { storage } from "../utils/FirebaseConfig";


function Upload() {
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [regNo, setRegNo] = useState('');
  const navigate = useNavigate();
  // const [imageUrls, setImageUrls] = useState([]);

  const validateFile = (file) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (validTypes.indexOf(file.type) === -1) {
      toast.error('File format is incorrect. Use .jpeg, .png, or .jpg');
      return false;
    } else if (file.size > 1024 * 1024 * 5) {
      toast.error('File size is too large');
      return false;
    }
    return true;
  };

  const saveImageToFirebase = async (file, category_image) => {
    if (file == null) return

    const imageRef = ref(storage, `images/${category_image}`);
    // const imagesListRef = ref(storage, 'images/')
    
    uploadBytes(imageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
      })
    })
  }

  // useEffect(()=>{
  //   listAll(imagesListRef).then((response) => {
  //     response.items.forEach((item) => {
  //       getDownloadURL(item).then((url) => {
  //         setImageUrls((prev) => [...prev, url]);
  //       });
  //     })
  //   })
  // })

  const saveImage = async (formData, category_image) => {
    setLoading(true);
    try {
      const response = await Axios.post(`${apiDomain}/upload`, formData);
      saveImageToFirebase(file, category_image);
      toast.success(response.data.message, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      setTimeout(() => {
        navigate('/studentLogin');
      }, 3000);
      setLoading(false);
      setFile(null);
      setCategory('');
    } catch (error) {
      toast.error(error.response.data.error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error('Please select an image');
    } else if (!category) {
      toast.error('Please select a category');
    } else if (validateFile(file)) {
      const category_image = Date.now() + file.name;
      const formData = new FormData();
      formData.append('category_name', category);
      formData.append('category_image', category_image);
      formData.append('regNo', regNo);
      formData.append('file', file);
      saveImage(formData, category_image);
    }
  };

  return (
    <div>
      <div className="simple-form">
        {loading && <Loading />}
        <h3 className="p-title">Add Profile Picture</h3>
        <hr />
        <div className="row-form">
          <form className="upload-form" onSubmit={handleSubmit}>
            <div className="upload-form_display">
              <img
                className="displayImg"
                src={file ? URL.createObjectURL(file) : Placeholder}
                alt={file ? 'Uploaded' : 'No pic'}
              />
            </div>
            <div className="upload-form_inputs">
              <label htmlFor="cate">Profile Category</label>
              <select
                name="cate"
                id="cate"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">- Who are you? -</option>
                <option value="student">Student</option>
                <option value="staff">Staff</option>
              </select>
              <input
                type="file"
                name="fileInput"
                id="fileInput"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <label htmlFor="regNo">Registration No</label>
              <input
                type="text"
                name="regNo"
                id="regNo"
                value={regNo}
                onChange={(e) => setRegNo(e.target.value)}
              />
              <button type="submit" disabled={loading}>
                {loading ? 'Loading...' : 'Upload'}
              </button>
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
    </div>
  );
}

export default Upload;
