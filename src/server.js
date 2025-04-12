const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const booksRoutes = require('./routes/books');
const initMongo = require('./scripts/init-mongo');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Rutas
app.get('/', (req, res) => {
  res.send('API de Libros funcionando correctamente');
});

// Rutas de libros
app.use('/api/books', booksRoutes);

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
  console.log('Conexión a MongoDB establecida correctamente');
  // Inicializar la base de datos si está vacía
  initMongo();
})
.catch(err => {
  console.error('Error al conectar a MongoDB:', err);
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});