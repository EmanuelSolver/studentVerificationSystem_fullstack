import '../stylingFiles/HomePage.css';
import '../stylingFiles/StudentLogin.css';


const Home = () => {
  return (
    <>
        <div id="background-video">
          <video className='vid' autoPlay loop muted>
            <source src="video-1.mp4" type="video/mp4" />
          </video>

        </div>

        <div className="container">
          <h1 className="heading">Welcome to ourCollege</h1>

          <div className="content">
            <div>
            <img src="students.jpg" alt="image" className="image" />
            </div>
            <div>
            <span className="sub-head">Learn with us</span>
            <p >Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident quisquam, cum excepturi fuga eveniet sapiente sit? Repellat nostrum reprehenderit necessitatibus, quasi, excepturi, ipsa assumenda magnam incidunt obcaecati facilis enim perspiciatis? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti qui nemo beatae consectetur laboriosam voluptates ipsam natus blanditiis enim, in ducimus atque officiis? Adipisci, facilis iste labore impedit totam repellat!</p>
            
            <button className="button">Visit Us</button>
            </div>
          </div>
        </div>
    </>
   
  );
};

export default Home;
