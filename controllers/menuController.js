const db = require('../models/db');

// Obtener todos los elementos del menú
exports.getAllMenuItems = (req, res) => {
    const query = 'SELECT * FROM MenuItem';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching menu items:', err.message);
            res.status(500).json({ error: 'Error fetching menu items' });
        } else {
            res.json(results);
        }
    });
};

// Obtener un elemento del menú por ID
exports.getMenuItemById = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM MenuItem WHERE MenuItemID = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error fetching menu item:', err.message);
            res.status(500).json({ error: 'Error fetching menu item' });
        } else if (result.length === 0) {
            res.status(404).json({ message: 'Menu item not found' });
        } else {
            res.json(result[0]);
        }
    });
};

// Crear un nuevo elemento del menú
exports.createMenuItem = (req, res) => {
    const { name, description, price, category, image, availability, CafeID } = req.body;
    const query = `
        INSERT INTO MenuItem (name, description, price, category, image, availability, CafeID)
        VALUES (?, ?, ?, ?, ?, ?, ?)`;
    db.query(query, [name, description, price, category, image, availability, CafeID], (err, result) => {
        if (err) {
            console.error('Error creating menu item:', err.message);
            res.status(500).json({ error: 'Error creating menu item' });
        } else {
            res.status(201).json({ message: 'Menu item created successfully', menuItemId: result.insertId });
        }
    });
};

// Actualizar un elemento del menú
exports.updateMenuItem = (req, res) => {
    const { id } = req.params;
    const { name, description, price, category, image, availability, CafeID } = req.body;
    const query = `
        UPDATE MenuItem
        SET name = ?, description = ?, price = ?, category = ?, image = ?, availability = ?, CafeID = ?
        WHERE MenuItemID = ?`;
    db.query(query, [name, description, price, category, image, availability, CafeID, id], (err, result) => {
        if (err) {
            console.error('Error updating menu item:', err.message);
            res.status(500).json({ error: 'Error updating menu item' });
        } else {
            res.json({ message: 'Menu item updated successfully' });
        }
    });
};

// Eliminar un elemento del menú
exports.deleteMenuItem = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM MenuItem WHERE MenuItemID = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error deleting menu item:', err.message);
            res.status(500).json({ error: 'Error deleting menu item' });
        } else {
            res.json({ message: 'Menu item deleted successfully' });
        }
    });
};
