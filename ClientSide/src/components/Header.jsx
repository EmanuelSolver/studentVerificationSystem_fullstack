import { useState } from 'react';
import { Link } from 'react-router-dom'
import '../stylingFiles/Header.css';

//Header icons 
import { RiHome4Fill } from "react-icons/ri";
import { MdAdminPanelSettings } from "react-icons/md"
import { MdArticle } from "react-icons/md";
import { ImNewspaper } from "react-icons/im";
import { VscSymbolEnumMember } from "react-icons/vsc"
import { GiArchiveRegister } from "react-icons/gi"
import { MdSchool } from "react-icons/md"


const Header = () => {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  
  const closeMobileMenu = () => setClick(false);

    return(
        <>
          <nav className='navbar'>
            <div className='navbar-container'>
              <Link to="/" className='navbar-logo'>
                OurCollege <MdSchool />
              </Link>

              <div className="menu-icon" onClick={handleClick}>
          
              </div>

              <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                <li className='nav-item'>
                  <Link to="/" className='nav-links' onClick={closeMobileMenu}><RiHome4Fill /> Home</Link>
                  <Link to="/admin" className='nav-links' onClick={closeMobileMenu}><MdAdminPanelSettings/> Admin</Link>
                  <Link to="/lectureLogin" className='nav-links' onClick={closeMobileMenu}><VscSymbolEnumMember/>Staff</Link>
                  <Link to="/studentLogin" className='nav-links' onClick={closeMobileMenu}><ImNewspaper /> Portal</Link>
                  <Link to="./studentregister" className='nav-links' onClick={closeMobileMenu}><GiArchiveRegister /> Register</Link>
                  <Link to="/departments" className='nav-links' onClick={closeMobileMenu}><MdArticle /> Departments</Link>

                </li>
              </ul>
               
            </div>
          </nav>
         
          
        </>
    )
};

export default Header;

  