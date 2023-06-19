import '../stylingFiles/HomePage.css';

const Home = () => {
  return (
    <div className="container">
      <img src="barretr-Book.svg" alt="image" className="image" />
      <div className="content">
        <h1 className="heading">Welcome to ourCollege</h1>
        <p className="description">Creativity convergence</p>
        <button className="button">Visit Us</button>
      </div>
    </div>
  );
};

export default Home;
