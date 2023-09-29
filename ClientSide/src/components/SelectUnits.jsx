import { useState, useContext } from 'react';
import { Context } from '../context/usercontext/context';
import '../stylingFiles/selectUnits.css';
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import axios from 'axios';
import { apiDomain } from '../utils/utils';

function SelectUnits() {
  const { user } = useContext(Context);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const options = ['Programming', 'chemistry', 'physics', 'communication', 'Analysis Tool', 'French'];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((selectedItem) => selectedItem !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleSubmit = async () => {
    if (selectedItems.length === 0) {
      toast.error('Please select at least one item.');
      return;
    }

    // Create a FormData object
    // const formData = new FormData();

    // // Append selectedItems as a field if it's defined
    // if (selectedItems && selectedItems.length > 0) {
    //   selectedItems.forEach((item, index) => {
    //     formData.append(`selectedItems[${index}]`, item);
    //   });
    // }

    // Append user.id as a field
    const formData = new FormData();
    formData.append('regNo', encodeURIComponent(user.id));
    formData.append('selectedItems', JSON.stringify(selectedItems));
    
    axios.post(`${apiDomain}/saveUnits`, formData, {
        headers: {
          'Authorization': `${user.token}`,
          'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
        },
      })
      .then((response) => {
        // Handle the response here
        console.log(response.data);
      })
      .catch((error) => {
        // Handle errors here
        console.log(error)
      });
    
  };

  return (
    <div className="multi-select-dropdown">
      <div className="dropdown-toggle" onClick={toggleDropdown}>
        Select Items
      </div>
      {isOpen && (
        <div className="dropdown-options">
          {options &&
            options.map((item) => (
              <label key={item}>
                <input
                  type="checkbox"
                  value={item}
                  checked={selectedItems.includes(item)}
                  onChange={() => handleItemClick(item)}
                />
                {item}
              </label>
            ))}
        </div>
      )}
      <div className="selected-items">
        <strong>Selected Items:</strong>
        <ul>
          {selectedItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <button onClick={handleSubmit}>Submit</button>
      <ToastContainer />
    </div>
  );
}

export default SelectUnits;
