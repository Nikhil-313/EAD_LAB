require('dotenv').config();
const express = require('express');
const connectDB = require('./db');
const Student = require('./models/students');

const app = express();
app.use(express.json()); // To read JSON body

// 🔍 DEBUG: log every incoming request
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

connectDB();

// ➕ CREATE (Add new student)
app.post('/students', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json({ message: 'Student added successfully', student });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 📄 READ (Get all students)
app.get('/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔍 READ (Get single student)
app.get('/students/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✏️ UPDATE (Update student info)
app.put('/students/:id', async (req, res) => {
  try {
    const updated = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ message: 'Student not found' });
    res.json({ message: 'Student updated successfully', updated });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ❌ DELETE (Remove student)
app.delete('/students/:id', async (req, res) => {
  try {
    const deleted = await Student.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Student not found' });
    res.json({ message: 'Student deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(process.env.PORT, () =>
  console.log(`🚀 Server running on port ${process.env.PORT}`)
);
