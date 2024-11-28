const db = require('../models/db'); // Importa la conexión a la base de datos
const path = require('path'); // Para manejar rutas de archivos
const fs = require('fs'); // Para manejar archivos

// Obtener archivos asociados a una reseña
exports.getFilesByReview = (req, res) => {
    const { reviewId } = req.params; // Obtén el ID de la reseña desde los parámetros
    const query = 'SELECT * FROM ReviewFile WHERE ReviewID = ?';

    db.query(query, [reviewId], (err, results) => {
        if (err) {
            console.error('Error fetching review files:', err.message);
            res.status(500).json({ error: 'Error fetching review files' });
        } else {
            res.json(results);
        }
    });
};

// Subir un archivo asociado a una reseña
exports.uploadFile = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const { reviewId } = req.body; // Obtén el ID de la reseña del cuerpo de la solicitud
    const filePath = req.file.path; // Ruta del archivo cargado

    const query = `
        INSERT INTO ReviewFile (reviewimg, ReviewID)
        VALUES (?, ?)`;

    db.query(query, [filePath, reviewId], (err, result) => {
        if (err) {
            console.error('Error saving file to database:', err.message);
            res.status(500).json({ error: 'Error saving file to database' });
        } else {
            res.status(201).json({
                message: 'File uploaded successfully',
                fileId: result.insertId,
            });
        }
    });
};

// Eliminar un archivo asociado a una reseña
exports.deleteFile = (req, res) => {
    const { id } = req.params; // ID del archivo a eliminar

    // Primero, obtén la ruta del archivo desde la base de datos
    const getFileQuery = 'SELECT reviewimg FROM ReviewFile WHERE ReviewFileID = ?';

    db.query(getFileQuery, [id], (err, result) => {
        if (err || result.length === 0) {
            console.error('Error fetching file:', err ? err.message : 'File not found');
            res.status(500).json({ error: 'Error fetching file' });
        } else {
            const filePath = result[0].reviewimg;

            // Elimina el archivo físicamente del sistema de archivos
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error('Error deleting file from filesystem:', err.message);
                    res.status(500).json({ error: 'Error deleting file from filesystem' });
                } else {
                    // Luego, elimina el registro de la base de datos
                    const deleteQuery = 'DELETE FROM ReviewFile WHERE ReviewFileID = ?';

                    db.query(deleteQuery, [id], (err, result) => {
                        if (err) {
                            console.error('Error deleting file from database:', err.message);
                            res.status(500).json({ error: 'Error deleting file from database' });
                        } else {
                            res.json({ message: 'File deleted successfully' });
                        }
                    });
                }
            });
        }
    });
};
