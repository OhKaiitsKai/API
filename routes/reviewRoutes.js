const express = require('express');
const reviewController = require('../controllers/reviewController');

const router = express.Router();

// Rutas
router.get('/cafe/:cafeId', reviewController.getReviewsByCafe); // Obtener todas las reseñas de un café
router.post('/', reviewController.createReview); // Crear una nueva reseña
router.put('/:id', reviewController.updateReview); // Actualizar una reseña
router.delete('/:id', reviewController.deleteReview); // Eliminar una reseña

module.exports = router;
