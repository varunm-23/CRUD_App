const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const studentsRoutes = require('./routes/students');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(express.static('public'));

// Basic protected middleware
app.use((req, res, next) => {
  const token = req.headers['authorization'];
  if (token === 'Bearer mysecrettoken') next();
  else res.status(403).json({ message: 'Forbidden. Token required.' });
});

app.use('/api/students', studentsRoutes);

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
