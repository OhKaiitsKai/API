const express = require('express');
const orderController = require('../controllers/orderController');

const router = express.Router();

// Rutas
router.get('/', orderController.getAllOrders); // Obtener todas las órdenes
router.get('/:id', orderController.getOrderById); // Obtener una orden por ID
router.post('/', orderController.createOrder); // Crear una nueva orden
router.put('/:id', orderController.updateOrder); // Actualizar una orden
router.delete('/:id', orderController.deleteOrder); // Eliminar una orden

module.exports = router;
