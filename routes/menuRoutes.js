const express = require('express');
const menuController = require('../controllers/menuController');

const router = express.Router();

// Rutas
router.get('/', menuController.getAllMenuItems); // Obtener todos los elementos del menú
router.get('/:id', menuController.getMenuItemById); // Obtener un elemento del menú por ID
router.post('/', menuController.createMenuItem); // Crear un nuevo elemento del menú
router.put('/:id', menuController.updateMenuItem); // Actualizar un elemento del menú
router.delete('/:id', menuController.deleteMenuItem); // Eliminar un elemento del menú

module.exports = router;
