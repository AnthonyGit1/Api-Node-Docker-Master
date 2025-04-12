const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// GET - Obtener todos los libros
router.get('/', async (req, res) => {
  try {
    // Si hay query params, filtramos por ellos
    const filter = {};
    
    if (req.query.author) filter.author = req.query.author;
    if (req.query.genre) filter.genre = req.query.genre;
    if (req.query.year) filter.year = parseInt(req.query.year);
    if (req.query.available) filter.available = req.query.available === 'true';
    
    const books = await Book.find(filter);
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET - Obtener un libro específico por ISBN
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findOne({ isbn: id });
    
    if (!book) {
      return res.status(404).json({ message: 'Libro no encontrado' });
    }
    
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST - Crear un nuevo libro
router.post('/', async (req, res) => {
  try {
    // Verificar si el libro ya existe por ISBN
    const existingBook = await Book.findOne({ isbn: req.body.isbn });
    
    if (existingBook) {
      return res.status(409).json({ 
        message: 'Ya existe un libro con este ISBN',
        book: existingBook
      });
    }
    
    // Crear nuevo libro
    const newBook = new Book(req.body);
    await newBook.save();
    
    res.status(201).json(newBook);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
});

// PUT - Actualizar un libro existente o crear uno nuevo si no existe
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findOne({ isbn: id });
    
    if (!book) {
      // Si no existe, creamos uno nuevo
      const newBook = new Book({
        ...req.body,
        isbn: id
      });
      await newBook.save();
      return res.status(201).json({
        message: 'Libro creado correctamente',
        book: newBook
      });
    }
    
    // Si existe, lo actualizamos
    const updatedBook = await Book.findOneAndUpdate(
      { isbn: id },
      req.body,
      { new: true }
    );
    
    res.status(200).json({
      message: 'Libro actualizado correctamente',
      book: updatedBook
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
});

// DELETE - Eliminar un libro
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findOne({ isbn: id });
    
    if (!book) {
      // Si no existe, no hacemos nada
      return res.status(204).send();
    }
    
    // Si existe, lo eliminamos
    await Book.findOneAndDelete({ isbn: id });
    res.status(200).json({ 
      message: 'Libro eliminado correctamente',
      book: book
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;