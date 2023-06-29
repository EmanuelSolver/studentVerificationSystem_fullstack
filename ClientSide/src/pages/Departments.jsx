import '../stylingFiles/Departments.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { apiDomain } from '../utils/utils';

const Departments = () => {
  const [data, setData] = useState([])

  const getData = async () => {
      const res = await axios.get(`${apiDomain}/departments`,)
      setData(res.data)
  }
  useEffect(() =>{

      getData()
  }, [])

  return (
    <div className='department'>
      <h1>Departments</h1>

      <div className="card-list">
      {
        data.map((item, index) => (
          <>
            <div className="card" key={index}>
              <h2 >{item.DeptName} ({item.DeptInitials})</h2>
              <h3 style={{color:"black"}}>Course: {item.CourseName}</h3>
              <p >{item.DeptDescription}</p>
           
          </div>
          </> 
      ))}
    </div> 
    </div>
  );
};

export default Departments;
