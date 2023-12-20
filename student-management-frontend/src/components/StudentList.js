// StudentList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        axios.defaults.baseURL = 'http://localhost:5000';
        const response = await axios.get('http://localhost:5000/students');
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Student List</h2>
      <ul>
        {students.map((student) => (
          <li key={student._id}>
            {student.firstName} {student.lastName} (Age: {student.age}, Grade: {student.grade})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;
