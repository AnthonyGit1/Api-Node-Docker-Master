const mongoose = require('mongoose');
const Book = require('../models/Book');

// Datos de ejemplo para libros
const booksData = [
  {
    title: 'Cien años de soledad',
    author: 'Gabriel García Márquez',
    year: 1967,
    genre: 'Realismo mágico',
    pages: 471,
    isbn: '9780307474728',
    available: true
  },
  {
    title: '1984',
    author: 'George Orwell',
    year: 1949,
    genre: 'Distopía',
    pages: 328,
    isbn: '9780451524935',
    available: true
  },
  {
    title: 'El Hobbit',
    author: 'J.R.R. Tolkien',
    year: 1937,
    genre: 'Fantasía',
    pages: 310,
    isbn: '9780547928227',
    available: false
  },
  {
    title: 'Don Quijote de la Mancha',
    author: 'Miguel de Cervantes',
    year: 1605,
    genre: 'Novela',
    pages: 863,
    isbn: '9788420412146',
    available: true
  },
  {
    title: 'Harry Potter y la piedra filosofal',
    author: 'J.K. Rowling',
    year: 1997,
    genre: 'Fantasía',
    pages: 223,
    isbn: '9788478884452',
    available: true
  }
];

// Función para sembrar datos
const initMongo = async () => {
  try {
    // Conectar a la base de datos
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conexión a MongoDB establecida para inicialización');

    // Verificar si ya hay datos
    const count = await Book.countDocuments();
    
    if (count === 0) {
      // Insertar datos de ejemplo
      await Book.insertMany(booksData);
      console.log('Base de datos inicializada con datos de ejemplo');
    } else {
      console.log('La base de datos ya contiene datos, omitiendo inicialización');
    }
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
  }
};

module.exports = initMongo;