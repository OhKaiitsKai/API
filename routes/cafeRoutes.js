const express = require('express');
const cafeController = require('../controllers/cafeController');

const router = express.Router();

// Rutas
router.get('/', cafeController.getAllCafes); // Obtener todas las cafeterías
router.get('/:id', cafeController.getCafeById); // Obtener una cafetería por ID
router.post('/', cafeController.createCafe); // Crear una nueva cafetería
router.put('/:id', cafeController.updateCafe); // Actualizar una cafetería
router.delete('/:id', cafeController.deleteCafe); // Eliminar una cafetería

module.exports = router;
