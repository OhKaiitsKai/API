const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

// Importar rutas
const userRoutes = require('./routes/userRoutes');
const cafeRoutes = require('./routes/cafeRoutes');
const menuRoutes = require('./routes/menuRoutes');
const orderItemRoutes = require('./routes/orderItemRoutes');
const orderRoutes = require('./routes/orderRoutes'); 
const reviewRoutes = require('./routes/reviewRoutes');
const reviewFileRoutes = require('./routes/reviewFileRoutes');

const app = express();

// Middleware para procesar JSON
app.use(bodyParser.json());

// Rutas principales
app.use('/api/users', userRoutes);
app.use('/api/cafes', cafeRoutes);
app.use('/api/menuitems', menuRoutes);
app.use('/api/orderitems', orderItemRoutes);
app.use('/api/orders', orderRoutes); 
app.use('/api/reviews', reviewRoutes);
app.use('/api/reviewfiles', reviewFileRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('Welcome to Campus Café API!');
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
