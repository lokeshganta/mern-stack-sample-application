// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Student = require('./models/Student');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB Atlas connection string (replace with your actual connection string)
const MONGODB_URI = 'mongodb+srv://root:root@sample-app.atqkepc.mongodb.net/students?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());
app.use(cors());
// API routes

// Get all students
app.get('/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Add a new student
app.post('/students', async (req, res) => {
  const { firstName, lastName, age, grade } = req.body;

  try {
    const newStudent = new Student({ firstName, lastName, age, grade });
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (error) {
    console.error('Error adding student:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Update a student
app.put('/students/:id', async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, age, grade } = req.body;

  try {
    const updatedStudent = await Student.findByIdAndUpdate(id, { firstName, lastName, age, grade }, { new: true });
    res.json(updatedStudent);
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Delete a student
app.delete('/students/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Student.findByIdAndDelete(id);
    res.status(204).send(); // No content
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
