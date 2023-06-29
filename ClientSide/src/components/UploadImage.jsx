import { useEffect, useState } from 'react'
import './App.css'
import Placeholder from './assets/placeholder.jpeg'
import Loading from './components/Loading';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchedCategory, setFetchedCategory] = useState([]);
  const domain = 'http://localhost:8081';


  const validateFile = (file) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (validTypes.indexOf(file.type) === -1) {
      alert('File format is incorrect use .jpeg, .png or .jpg')
    } else if (file.size > 1024 * 1024 * 5) {
      alert('File size is too large')
    } else {
      return true;
    }
  }

  const saveImage = async (formData) => {
    setLoading(true);
    await axios.post(`${domain}/upload`, formData)
      .then((res) => {
        alert(res.data.message)
        fetchImages();
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
      formData.append('file', file);
      // send to the server
      saveImage(formData);
    }
  }

  
  const fetchImages = async () => {
    setLoading(true);
    await axios.get(`${domain}/category`)
      .then((res) => {
        console.log(res.data)
        setFetchedCategory(res.data)
        setLoading(false);
      }).catch(({ response }) => {
        console.log(response.data.error)
        setLoading(false);
      });
  }

  const handleDelete = async (obj) => {
    setLoading(true);
    await axios.post(`${domain}/delCategory`,
      {
        "category_image": obj.category_image,
        "category_id": obj.id
      })
      .then((res) => {
        alert(res.data.message)
        fetchImages();

      }).catch(({ response }) => {
        alert(response.data.error)

      });
    setLoading(false);
  }

  useEffect(() => {
    fetchImages();
  }, [])

  return (
    <>

      <div className="container">
        {
          loading ? <Loading /> : null
        }
        <h3>Image Upload Gallery</h3><hr />
        <div className="row-form">
          <form className='upload-form'>
            <div className='upload-form_display'>
              {
                file ? <img className="displayImg" src={URL.createObjectURL(file)} alt="no pic" />
                  : <img className="displayImg" src={Placeholder} alt="nopic" />
              }
            </div>
            <div className='upload-form_inputs'>
              <label htmlFor="cate">Image category</label>
              <select name="cate" id="cate" onChange={(e) => setCategory(e.target.value)}>
                <option value="">Select Image category</option>
                <option value="user profiles">user profiles</option>
                <option value="animals">animals</option>
                <option value="tech">tech</option>
                <option value="other">other</option>
              </select>
              <input type="file" name="" id="fileInput" onChange={(e) => setFile(e.target.files[0])} />
              <button type="submit" onClick={handleSubmit} >{loading ? 'Loading...' : 'Upload'} </button>

            </div>

          </form>
        </div>
        <div className="row-display">
          {
            fetchedCategory && fetchedCategory.map((item, index) => {
              return (
                <div key={index} className="card">
                  <img src={`${domain}/images/${item.category_image}`} alt="no pic" />
                  <h3 style={{ width: "50%", borderBottom: "1px solid white" }}>{item.category_name}</h3>
                  <button className="del" onClick={() => handleDelete(item)}>del</button>
                </div>
              )
            })
          }

        </div>
      </div>
    </>
  )
}

export default App