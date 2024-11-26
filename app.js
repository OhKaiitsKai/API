const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

// Importar rutas
const userRoutes = require('./routes/userRoutes');
const cafeRoutes = require('./routes/cafeRoutes');
const menuRoutes = require('./routes/menuRoutes');
const orderItemRoutes = require('./routes/orderItemRoutes'); // Rutas de OrderItem

const app = express();

// Middleware para procesar JSON
app.use(bodyParser.json());

// Rutas principales
app.use('/api/users', userRoutes);
app.use('/api/cafes', cafeRoutes);
app.use('/api/menuitems', menuRoutes);
app.use('/api/orderitems', orderItemRoutes); // Conectar rutas de OrderItem

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('Welcome to Campus Café API!');
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
