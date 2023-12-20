// StudentForm.js
import React, { useState } from 'react';
import axios from 'axios';

const StudentForm = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState(initialData || {});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      if (initialData) {
        // Update existing student
        console.log('Updating student:', formData);
        await axios.put(`http://localhost:5000/students/${initialData._id}`, formData);
      } else {
        // Add new student
        console.log('Adding new student:', formData);
        await axios.post('http://localhost:5000/students', formData);
      }
  
      console.log('Operation completed successfully.');
  
      // Notify parent component (if provided) that the operation is complete
      if (onSubmit) {
        onSubmit();
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input type="text" name="firstName" value={formData.firstName || ''} onChange={handleChange} />
      </label>
      <label>
        Last Name:
        <input type="text" name="lastName" value={formData.lastName || ''} onChange={handleChange} />
      </label>
      <label>
        Age:
        <input type="number" name="age" value={formData.age || ''} onChange={handleChange} />
      </label>
      <label>
        Grade:
        <input type="text" name="grade" value={formData.grade || ''} onChange={handleChange} />
      </label>
      <button type="submit">{initialData ? 'Update' : 'Add'} Student</button>
    </form>
  );
};

export default StudentForm;
