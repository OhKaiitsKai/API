const express = require('express');
const orderItemController = require('../controllers/orderItemController');

const router = express.Router();

// Rutas
router.get('/', orderItemController.getAllOrderItems); // Obtener todos los items de pedidos
router.get('/:id', orderItemController.getOrderItemById); // Obtener un item de pedido por ID
router.post('/', orderItemController.createOrderItem); // Crear un nuevo item de pedido
router.put('/:id', orderItemController.updateOrderItem); // Actualizar un item de pedido
router.delete('/:id', orderItemController.deleteOrderItem); // Eliminar un item de pedido

module.exports = router;
