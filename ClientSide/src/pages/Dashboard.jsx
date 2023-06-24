import AdminSidenav from '../components/AdminSidenav';
import { AdminMainnav } from '../components/AdminMainnav';

function Dashboard() {
  return (
    <div className='portal'>
      <br /><br />
    
      <AdminSidenav />

      <AdminMainnav />
    </div>
  )
}

export default Dashboard
