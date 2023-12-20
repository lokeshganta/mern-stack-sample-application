const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/lokesh', { useNewUrlParser: true, useUnifiedTopology: true });

const studentsRouter = require('./routes/students');
app.use('/students', studentsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
