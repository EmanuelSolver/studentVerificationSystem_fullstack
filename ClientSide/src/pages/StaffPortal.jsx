import StaffSidenav from '../components/StaffSidenav';
import { StaffMainnav } from '../components/StaffMainnav';

function StaffPortal() {
  return (
    <div className='portal'>
      <StaffSidenav />

      <StaffMainnav />
    </div>
  )
}

export default StaffPortal
