const db = require('../models/db'); // Importa la conexión a la base de datos

// Obtener todas las reseñas de un café específico
exports.getReviewsByCafe = (req, res) => {
    const { cafeId } = req.params; // Obtén el ID del café desde los parámetros
    const query = 'SELECT * FROM Review WHERE CafeID = ?';

    db.query(query, [cafeId], (err, results) => {
        if (err) {
            console.error('Error fetching reviews:', err.message);
            res.status(500).json({ error: 'Error fetching reviews' });
        } else {
            res.json(results);
        }
    });
};

// Crear una nueva reseña
exports.createReview = (req, res) => {
    const { rating, title, comment, date, UserID, CafeID } = req.body;

    const query = `
        INSERT INTO Review (rating, title, comment, date, UserID, CafeID)
        VALUES (?, ?, ?, ?, ?, ?)`;

    db.query(query, [rating, title, comment, date, UserID, CafeID], (err, result) => {
        if (err) {
            console.error('Error creating review:', err.message);
            res.status(500).json({ error: 'Error creating review' });
        } else {
            res.status(201).json({
                message: 'Review created successfully',
                reviewId: result.insertId,
            });
        }
    });
};

// Actualizar una reseña
exports.updateReview = (req, res) => {
    const { id } = req.params; // ID de la reseña a actualizar
    const { rating, title, comment } = req.body;

    const query = `
        UPDATE Review
        SET rating = ?, title = ?, comment = ?
        WHERE ReviewID = ?`;

    db.query(query, [rating, title, comment, id], (err, result) => {
        if (err) {
            console.error('Error updating review:', err.message);
            res.status(500).json({ error: 'Error updating review' });
        } else if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Review not found' });
        } else {
            res.json({ message: 'Review updated successfully' });
        }
    });
};

// Eliminar una reseña
exports.deleteReview = (req, res) => {
    const { id } = req.params; // ID de la reseña a eliminar
    const query = 'DELETE FROM Review WHERE ReviewID = ?';

    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error deleting review:', err.message);
            res.status(500).json({ error: 'Error deleting review' });
        } else if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Review not found' });
        } else {
            res.json({ message: 'Review deleted successfully' });
        }
    });
};
