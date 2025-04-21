const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const dbPath = path.join(__dirname, '../data/students.json');

const readStudents = () => JSON.parse(fs.readFileSync(dbPath, 'utf8'));
const writeStudents = (data) => fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

router.get('/', (req, res) => {
  res.json(readStudents());
});

router.post('/', (req, res) => {
  const { StudentName, Mobile, City } = req.body;
  const imageFile = req.files?.Image;

  if (!StudentName || !Mobile || !City || !imageFile) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const fileName = `${Date.now()}_${imageFile.name}`;
  const filePath = path.join(__dirname, '../public/uploads', fileName);

  imageFile.mv(filePath, (err) => {
    if (err) return res.status(500).send(err);

    const students = readStudents();
    const newStudent = { id: Date.now(), StudentName, Mobile, City, Image: `/uploads/${fileName}` };
    students.push(newStudent);
    writeStudents(students);

    res.status(201).json(newStudent);
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { StudentName, Mobile, City } = req.body;

  const students = readStudents();
  const student = students.find(s => s.id == id);
  if (!student) return res.status(404).json({ message: 'Student not found.' });

  student.StudentName = StudentName || student.StudentName;
  student.Mobile = Mobile || student.Mobile;
  student.City = City || student.City;
  writeStudents(students);

  res.json(student);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  let students = readStudents();
  const student = students.find(s => s.id == id);
  if (!student) return res.status(404).json({ message: 'Student not found.' });

  const imagePath = path.join(__dirname, '../public', student.Image);
  if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);

  students = students.filter(s => s.id != id);
  writeStudents(students);

  res.json({ message: 'Deleted successfully.' });
});

module.exports = router;
