const db = require('../models/db');

// Obtener todas las cafeterías
exports.getAllCafes = (req, res) => {
    const query = 'SELECT * FROM Cafe';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching cafes:', err.message);
            res.status(500).json({ error: 'Error fetching cafes' });
        } else {
            res.json(results);
        }
    });
};

// Obtener una cafetería por ID
exports.getCafeById = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM Cafe WHERE CafeID = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error fetching cafe:', err.message);
            res.status(500).json({ error: 'Error fetching cafe' });
        } else if (result.length === 0) {
            res.status(404).json({ message: 'Cafe not found' });
        } else {
            res.json(result[0]);
        }
    });
};

// Crear una nueva cafetería
exports.createCafe = (req, res) => {
    const { name, location, rating, hours, image } = req.body;
    const query = `
        INSERT INTO Cafe (name, location, rating, hours, image)
        VALUES (?, ?, ?, ?, ?)`;
    db.query(query, [name, location, rating, hours, image], (err, result) => {
        if (err) {
            console.error('Error creating cafe:', err.message);
            res.status(500).json({ error: 'Error creating cafe' });
        } else {
            res.status(201).json({ message: 'Cafe created successfully', cafeId: result.insertId });
        }
    });
};

// Actualizar una cafetería
exports.updateCafe = (req, res) => {
    const { id } = req.params;
    const { name, location, rating, hours, image } = req.body;
    const query = `
        UPDATE Cafe
        SET name = ?, location = ?, rating = ?, hours = ?, image = ?
        WHERE CafeID = ?`;
    db.query(query, [name, location, rating, hours, image, id], (err, result) => {
        if (err) {
            console.error('Error updating cafe:', err.message);
            res.status(500).json({ error: 'Error updating cafe' });
        } else {
            res.json({ message: 'Cafe updated successfully' });
        }
    });
};

// Eliminar una cafetería
exports.deleteCafe = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM Cafe WHERE CafeID = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error deleting cafe:', err.message);
            res.status(500).json({ error: 'Error deleting cafe' });
        } else {
            res.json({ message: 'Cafe deleted successfully' });
        }
    });
};
