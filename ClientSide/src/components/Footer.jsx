import '../stylingFiles/Footer.css'
import { Link } from 'react-router-dom';
import { MdAdminPanelSettings } from "react-icons/md"

const Footer = () => {

    return(
        <div className="footer">
            <Link to="/admin" className='nav-links'><MdAdminPanelSettings/> Admin</Link>

            <h3>OurCollege ©️ {new Date().getFullYear()}</h3>
        </div>
    )
};

export default Footer;