import  { useState } from 'react';
import  { useContext } from 'react'
import { Context } from '../context/usercontext/context'
import '../stylingFiles/selectUnits.css';
import PropTypes from 'prop-types';
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import axios from 'axios';
import { apiDomain } from '../utils/utils';

function SelectUnits({ options }) {
    const { user } = useContext(Context)
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  options = options || ['Programming', 'chemistry', 'physics', 'communication', 'Analysis Tool', 'French'];

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

  const handleSubmit = () => {
    if (selectedItems.length === 0) {
      toast.error('Please select at least one item.'); // Use toast.error for error messages
      return;
    }

    // Create a data object to send to the server
    const data = {
      selectedUnits: selectedItems, // You can adjust the field name as needed
    };

    // Make an Axios POST request to your server endpoint
    // Replace the placeholder URL with your actual endpoint
    axios.post(`${apiDomain}/save-units/${encodeURIComponent(user.id)}`, data)
      .then((response) => {
        // Handle a successful response here
        toast.success('Data saved successfully.'); // Use toast.success for success messages
        console.log('Data saved successfully:', response.data);
      })
      .catch((error) => {
        // Handle errors here
        toast.error('An error occurred while saving data.'); // Use toast.error for error messages
        console.error('Error:', error);
      });
  };

  return (
   
         <div className="multi-select-dropdown">
      <div className="dropdown-toggle" onClick={toggleDropdown}>
        Select Items
      </div>
      {isOpen && (
        <div className="dropdown-options">
          {options && options.map((item) => (
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
      <ToastContainer /> {/* Render the toast container */}
    </div>

  );
}

SelectUnits.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SelectUnits;
