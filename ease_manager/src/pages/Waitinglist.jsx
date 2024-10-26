import React, { useState } from 'react';
import { useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
const WaitingList = () => {
  const { currentUser } = useSelector((state) => state.user)
  const navigate=useNavigate()
  const [filled, setFilled] = useState(false);

  const [formData, setFormData] = useState({
    rollnumber: currentUser.rest.rollNumber,
    contact: currentUser.rest.contact,
    block: '',
  });

  const handleAddClick = () => {

    setFormVisible(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  // console.log(formData)

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send POST request to server
    try {
      const response = await fetch('/api/waiting/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to add to waiting list');
      }

      // Optionally, handle response from the server
      const result = await response.json();
      setFormData({
        rollnumber: currentUser.rest.rollNumber,
        contact: currentUser.rest.contact,
        block: '',
      });
      navigate("/dashboard?tab=dashboard")
      // console.log('Server response:', result);

    } catch (error) {
      console.error('Error:', error);
    }

    // Clear form data
    
    na
  }

    // const handleRemove = (index) => {
    //   const updatedList = waitingList.filter((_, i) => i !== index);
    //   setWaitingList(updatedList);
    // };

    return (
      <div className="container" style={styles.container}>
        <h2 style={styles.h2}>Waiting List</h2>
        {/* <button onClick={handleAddClick} style={styles.button}>Add Waiting List</button> */}
        <div style={styles.addForm}>
          <form onSubmit={handleSubmit}>
            <div className="form-group" style={styles.formGroup}>
              <label htmlFor="name">Roll number:</label>
              <input
                type="text"
                id="rollnumber"
                name="rollnumber"
                value={currentUser.rest.rollNumber}
                onChange={handleInputChange}
                required
                style={styles.input}
              />
            </div>
            <div className="form-group" style={styles.formGroup}>
              <label htmlFor="contact">Contact:</label>
              <input
                type="number"
                id="contact"
                name="contact"
                value={currentUser.rest.contact}
                onChange={handleInputChange}
                required
                style={styles.input}
              />
            </div>
            <div className="form-group" style={styles.formGroup}>
              <label htmlFor="floor">Block name:</label>
              <select
                id="block"
                name="block"
                value={formData.block}
                onChange={handleInputChange}
                style={styles.input}
              >
                <option value="A Block">A</option>
                <option value="B Block">B</option>
                <option value="C Block">C</option>
                <option value="G3 Block">G3</option>
              </select>
            </div>
            <button type="submit" style={styles.submitButton}>Submit</button>
          </form>
        </div>

        {/* <table style={styles.table}>
        <thead>
          <tr>
            <th>Roll number</th>
            <th>Contact</th>
            <th>Block name:</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {waitingList.map((item, index) => (
            <tr key={index}>
              <td>{item.rollnumber}</td>
              <td>{item.contact}</td>
              <td>{item.block}</td>
              <td>
                <button
                  onClick={() => handleRemove(index)}
                  style={styles.removeButton}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
      </div>
    );
  };

const styles = {
  container: {
    width: '500px',
    margin: '0 auto',
    padding: '20px',
    borderTop: '2px solid #0000FF',
  },
  h2: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  formGroup: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '2px solid #ccc',
    borderRadius: '6px',
    boxSizing: 'border-box',
  },
  button: {
    backgroundColor: '#0000FF',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  submitButton: {
    backgroundColor: '#0000FF',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  removeButton: {
    backgroundColor: '#0000FF',
    color: 'white',
    padding: '5px 10px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
};

export default WaitingList;
