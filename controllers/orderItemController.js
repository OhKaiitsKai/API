const db = require('../models/db');

// Obtener todos los items de pedidos
exports.getAllOrderItems = (req, res) => {
    const query = 'SELECT * FROM OrderItem';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching order items:', err.message);
            res.status(500).json({ error: 'Error fetching order items' });
        } else {
            res.json(results);
        }
    });
};

// Obtener un item de pedido por ID
exports.getOrderItemById = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM OrderItem WHERE OrderItemID = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error fetching order item:', err.message);
            res.status(500).json({ error: 'Error fetching order item' });
        } else if (result.length === 0) {
            res.status(404).json({ message: 'Order item not found' });
        } else {
            res.json(result[0]);
        }
    });
};

// Crear un nuevo item de pedido
exports.createOrderItem = (req, res) => {
    const { quantity, price, MenuItemID } = req.body;
    const query = `
        INSERT INTO OrderItem (quantity, price, MenuItemID)
        VALUES (?, ?, ?)`;
    db.query(query, [quantity, price, MenuItemID], (err, result) => {
        if (err) {
            console.error('Error creating order item:', err.message);
            res.status(500).json({ error: 'Error creating order item' });
        } else {
            res.status(201).json({ message: 'Order item created successfully', orderItemId: result.insertId });
        }
    });
};

// Actualizar un item de pedido
exports.updateOrderItem = (req, res) => {
    const { id } = req.params;
    const { quantity, price, MenuItemID } = req.body;
    const query = `
        UPDATE OrderItem
        SET quantity = ?, price = ?, MenuItemID = ?
        WHERE OrderItemID = ?`;
    db.query(query, [quantity, price, MenuItemID, id], (err, result) => {
        if (err) {
            console.error('Error updating order item:', err.message);
            res.status(500).json({ error: 'Error updating order item' });
        } else {
            res.json({ message: 'Order item updated successfully' });
        }
    });
};

// Eliminar un item de pedido
exports.deleteOrderItem = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM OrderItem WHERE OrderItemID = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error deleting order item:', err.message);
            res.status(500).json({ error: 'Error deleting order item' });
        } else {
            res.json({ message: 'Order item deleted successfully' });
        }
    });
};
