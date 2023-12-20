// StudentManagement.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StudentList from './StudentList';
import StudentForm from './StudentForm';
import StudentListItem from './StudentListItem';

const StudentManagement = () => {
  const [students, setStudents] = useState([{
    "firstName": "Lokeshwar",
    "lastName": "Ganta",
    "age": "20",
    "grade": "A"
}]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  
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

  const handleAddOrUpdate = async () => {
    // Refresh student list after adding or updating
    try {
      const response = await axios.get('http://localhost:5000/students');
      setStudents(response.data);
      setSelectedStudent(null);
    } catch (error) {
      console.error('Error fetching updated data:', error);
    }
  };

  const handleDelete = async (id) => {
    // Delete student and refresh list
    try {
      await axios.delete(`http://localhost:5000/students/${id}`);
      handleAddOrUpdate();
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const handleFormSubmit = async () => {
    // This function will be passed to the StudentForm component
    // It triggers the refresh of the student list after form submission
    handleAddOrUpdate();
  };

  return (
    <div>
      <h1>Student Management System</h1>
      <StudentList students={students} />
      <StudentForm onSubmit={handleFormSubmit} initialData={selectedStudent} />
      <ul>
        {students.map((student) => (
          <StudentListItem
            key={student._id}
            student={student}
            onDelete={handleDelete}
            onUpdate={setSelectedStudent}
          />
        ))}
      </ul>
    </div>
  );
};

export default StudentManagement;
