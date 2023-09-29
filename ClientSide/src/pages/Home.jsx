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
          <h1 className="heading">Welcome to Our College</h1>

          <div className="content">
            <div>
              <img src="students.jpg" alt="Students" className="image" />
            </div>
            <div>
              <span className="sub-head">Learn with Us</span>
              <hr />
              <p>At Our College, we provide a world-class education that prepares you for a bright future. Our dedicated faculty and modern facilities create the perfect environment for learning and growth. Join us on a journey to success!</p>
              <p>Our College is committed to excellence in education. With a rich history dating back over a century, we have consistently been at the forefront of innovation in teaching and research. Our diverse and inclusive community of students, faculty, and staff come together to create a vibrant and dynamic learning environment.</p>

              <button className="button">Join Now</button>
            </div>
          </div>
        </div>
    </>
  );
};

export default Home;
