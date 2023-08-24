import { Link } from 'react-router-dom'
import '../stylingFiles/Header.css';
import { useContext } from 'react';
import { Context } from '../context/usercontext/context';

//Header icons 
import { RiHome4Fill } from "react-icons/ri";
import { MdArticle } from "react-icons/md";
import { ImNewspaper } from "react-icons/im";
import { VscSymbolEnumMember } from "react-icons/vsc"
import { GiArchiveRegister } from "react-icons/gi"
import { MdSchool } from "react-icons/md"
import { RiLogoutCircleLine } from "react-icons/ri"

const Header = () => {
  const { user, dispatch } = useContext(Context)

  const handleLogout = () =>{

    dispatch({ type: "LOGOUT"})
  }
    return(
        <>
          <nav className='navbar'>
              <div className='navbar-container'>
                <Link to="/" className='navbar-logo'>
                  OurCollege <MdSchool />
                </Link>
              </div>

              <ul >
                <li className='nav-item'>
                  <Link to="/" className='nav-links' ><RiHome4Fill /> Home</Link>
                  <Link to="/lectureLogin" className='nav-links' ><VscSymbolEnumMember/> Staff</Link>
                  <Link to="/studentLogin" className='nav-links' ><ImNewspaper /> Students </Link>
                  <Link to="/studentRegister" className='nav-links'><GiArchiveRegister /> Register</Link>
                {
                  user && (
                    <>
                      <Link to="/studentPortal" className='nav-links' ><ImNewspaper /> Portal</Link>
                      <Link to="/studentLogin" className='nav-links' onClick={handleLogout} style={{color:"brown"}}><RiLogoutCircleLine /> Logout</Link>
                    </>
                  )
                }
                <Link to="/departments" className='nav-links' ><MdArticle /> Departments</Link>
                </li>
              </ul>
          </nav>
           
        </>
    )
};

export default Header;

  