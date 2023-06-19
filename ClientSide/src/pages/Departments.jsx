import '../stylingFiles/Departments.css'

const data = [
  { title: 'Pure & Applied Sciences', description: 'Our department -- Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi perspiciatis voluptatibus ratione similique, blanditiis quo tempora voluptas nemo, dolorum possimus, est laudantium reiciendis aspernatur totam minus officia architecto obcaecati consequatur!' },
  { title: 'Health Sciences', description: 'Description  perspiciatis voluptatibus ratione similique, blanditiis quo tempora voluptas nemo, dolorum possimus, est laudantium reiciendis aspernatur totam minus officia architecto obcaecati consequatur!' },
  { title: 'Engineering', description: 'Card similique, blanditiis quo tempora voluptas nemo, dolorum possimus, est laudantium' },
  { title: 'Business & Economics', description: 'Card similique, blanditiis quo tempora voluptas nemo, dolorum possimus, est laudantium' },
  { title: 'Education & Arts', description: 'Card similique, blanditiis quo tempora voluptas nemo, dolorum possimus, est laudantium' },

];

const Departments = () => {


  return (
    <div className='department'>
      <h1>Departments</h1>

      <div className="card-list">
      {
        data.map((item, index) => (
          <>
            <div className="card">
              <h2 key={index}>{item.title}</h2>
              <p>{item.description}</p>
          </div>
          </> 
      ))}
    </div> 
    </div>
  );
};

export default Departments;
