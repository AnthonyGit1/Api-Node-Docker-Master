const mongoose = require('mongoose');
require('dotenv').config();
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
const seedBooks = async () => {
  try {
    // Conectar a la base de datos
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conexión a MongoDB establecida para el seeder');

    // Eliminar datos existentes
    await Book.deleteMany({});
    console.log('Colección de libros limpiada');

    // Insertar nuevos datos
    await Book.insertMany(booksData);
    console.log('Datos de libros insertados correctamente');

    // Cerrar conexión
    await mongoose.connection.close();
    console.log('Conexión a MongoDB cerrada');

    process.exit(0);
  } catch (error) {
    console.error('Error al sembrar datos:', error);
    process.exit(1);
  }
};

// Ejecutar el seeder
seedBooks();