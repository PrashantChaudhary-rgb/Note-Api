// index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const validateNote = require('./Middlewares/validateNote');
const errorHandler = require('./Middlewares/errorHandler');
const basicAuth = require('express-basic-auth');
const noteSchema = require('./models/noteSchema');
const sequenceSchema = require('./models/sequenceSchema');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
const uri = process.env.MONGODB_URI;


// Connect to MongoDB
mongoose.connect(uri + "notes_db")
.then(()=>{console.log("connected to database")})
.catch((err)=>{console.error('MongoDB connection error:', err.message)});

// Middleware
app.use(bodyParser.json());

const auth = basicAuth({
  users: { 'Prashant': 'Password' }, // Add your username and password
  challenge: true,
  unauthorizedResponse: 'Unauthorized Access',
});

// Apply Basic Auth middleware to protect endpoints
app.use('/api/notes', auth)

  
const Sequence = mongoose.model('Sequence', sequenceSchema);
const Note = mongoose.model('Note', noteSchema);
  
  // Create Note
  app.post('/api/notes', validateNote, async (req, res) => {
    try {
      const { title, content } = req.body;
      const sequence = await Sequence.findOneAndUpdate(
        { model: 'Note', field: 'id' },
        { $inc: { count: 1 } },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
  
      // Create a new note with the provided data and the generated id
      const note = new Note({
        id: sequence.count,
        title,
        content,
      });
      await note.save();
      res.status(201).json(note);
    } catch (error) {
      next(error);
    }
  });
  
  // Retrieve Notes
  app.get('/api/notes', async (req, res, next) => {
    try {
      const notes = await Note.find();
      res.json(notes);
    } catch (error) {
      next(error);
    }
  });
  
  // Retrieve Single Note
  app.get('/api/notes/:id', async (req, res, next) => {
    try {
      const note = await Note.findOne({ id: req.params.id });
      if (!note) {
        return next(new Error('Not Found'));
      }
      res.json(note);
    } catch (error) {
      next(error);
    }
  });
  
  // Update Note
  app.put('/api/notes/:id', validateNote, async (req, res, next) => {
    try {
      const { title, content } = req.body;
      const note = await Note.findOneAndUpdate(
        { id: req.params.id },
        { title, content, updatedAt: Date.now() },
        { new: true }
      );
      if (!note) {
        return next(new Error('Not Found'));
      }
      res.json(note);
    } catch (error) {
      next(error);
    }
  });
  
  // Delete Note
  app.delete('/api/notes/:id', async (req, res, next) => {
    try {
      const note = await Note.findOneAndDelete({ id: req.params.id });
      res.json({ message: 'Note deleted successfully' });
    } catch (error) {
      next(error);
    }
  });
  
app.use(errorHandler);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  