import '../stylingFiles/StudentPortal.css';
import Sidenav from '../components/StudentSideNav';
import { Mainnav } from '../components/StudentMainNav';

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

