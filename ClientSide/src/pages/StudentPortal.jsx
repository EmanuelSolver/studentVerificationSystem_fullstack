import '../stylingFiles/StudentPortal.css';


import Sidenav from '../components/Sidenav';
import { Mainnav } from '../components/Mainnav';

function StudentPortal() {
  
  return (
    <div className='portal'>
      <br /><br /> 
      
      <Sidenav />

      <Mainnav />
    </div>
    
  )
}

export default StudentPortal

