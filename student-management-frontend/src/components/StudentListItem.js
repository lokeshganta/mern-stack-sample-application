// StudentListItem.js
import React from 'react';

const StudentListItem = ({ student, onDelete, onUpdate }) => {
  const handleDelete = async () => {
    try {
      await onDelete(student._id);
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const handleUpdate = () => {
    onUpdate(student)
  };

  return (
    <li className="student-list-item">
      <div className="student-details">
        {student.firstName} {student.lastName} (Age: {student.age}, Grade: {student.grade})
      </div>
      <div className="button-container">
        <button onClick={handleUpdate}>Update</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </li>
  );
};

export default StudentListItem;
