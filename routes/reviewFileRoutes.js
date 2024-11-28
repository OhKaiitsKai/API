const express = require('express');
const multer = require('multer'); // Para manejar la carga de archivos
const reviewFileController = require('../controllers/reviewFileController');

const router = express.Router();

// Configurar multer para la carga de archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/reviewFiles'); // Carpeta donde se guardarán los archivos
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName); // Nombre único para evitar colisiones
    },
});
const upload = multer({ storage: storage });

// Rutas
router.get('/review/:reviewId', reviewFileController.getFilesByReview); // Obtener archivos de una reseña
router.post('/upload', upload.single('file'), reviewFileController.uploadFile); // Subir un archivo asociado a una reseña
router.delete('/:id', reviewFileController.deleteFile); // Eliminar un archivo

module.exports = router;
