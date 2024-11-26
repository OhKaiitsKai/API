const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Endpoints
router.get('/', userController.getAllUsers); // Obtener todos los usuarios
router.post('/', userController.createUser); // Crear un nuevo usuario

module.exports = router;
