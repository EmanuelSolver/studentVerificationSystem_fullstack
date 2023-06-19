import '../stylingFiles/Footer.css'
const Footer = () => {

    return(
        <div className="footer">
            <h3>OurCollege ©️ {new Date().getFullYear()}</h3>
        </div>
    )
};

export default Footer;