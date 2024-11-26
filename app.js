const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

// Importar rutas
const userRoutes = require('./routes/userRoutes');

// Crear la aplicación
const app = express();

// Middleware para procesar JSON
app.use(bodyParser.json());

// Ruta de prueba para verificar el servidor
app.get('/', (req, res) => {
    res.send('Welcome to Campus Café API!');
});

// Rutas de la API
app.use('/api/users', userRoutes);

// Configurar el puerto
const PORT = process.env.PORT || 3000;

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
