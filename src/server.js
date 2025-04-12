const express = require('express');
const mongose = require('mongoose');
require('dotenv').config();
const booksRoutes = require('./routes/books');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('API de Libros funcionando!!');
});

//Rutas de libros
app.use('/api/books', booksRoutes);

// Conexión a MongoDB
mongose.connect(process.env.MONGODB_URI)
  .then(() => {
  console.log('Conexión a MongoDB exitosa!!'); 
  })
  .catch((error) => {
    console.error('Error de conexión a MongoDB:', error); 
  });

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});