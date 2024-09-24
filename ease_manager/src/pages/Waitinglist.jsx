import React, { useState } from 'react';

const WaitingList = () => {
  const [waitingList, setWaitingList] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    floor: '1',
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setWaitingList([...waitingList, formData]);
    setFormData({
      name: '',
      contact: '',
      floor: '1',
    });
    setFormVisible(false);
  };

  const handleRemove = (index) => {
    const updatedList = waitingList.filter((_, i) => i !== index);
    setWaitingList(updatedList);
  };

  return (
    <div className="container" style={styles.container}>
      <h2 style={styles.h2}>Waiting List</h2>
      <button onClick={handleAddClick} style={styles.button}>Add Waiting List</button>

      {formVisible && (
        <div style={styles.addForm}>
          <form onSubmit={handleSubmit}>
            <div className="form-group" style={styles.formGroup}>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
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
                value={formData.contact}
                onChange={handleInputChange}
                required
                style={styles.input}
              />
            </div>
            <div className="form-group" style={styles.formGroup}>
              <label htmlFor="floor">Floor no:</label>
              <select
                id="floor"
                name="floor"
                value={formData.floor}
                onChange={handleInputChange}
                style={styles.input}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
            <button type="submit" style={styles.submitButton}>Submit</button>
          </form>
        </div>
      )}

      <table style={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact</th>
            <th>Floor no:</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {waitingList.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.contact}</td>
              <td>{item.floor}</td>
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
      </table>
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
