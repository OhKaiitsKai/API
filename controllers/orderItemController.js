const db = require('../models/db');

// Obtener todos los items de pedidos
exports.getAllOrderItems = (req, res) => {
    const query = `
        SELECT oi.OrderItemID, oi.quantity, oi.price, o.OrderID, m.MenuItemID, m.name AS MenuItemName
        FROM OrderItem oi
        JOIN \`Order\` o ON oi.OrderID = o.OrderID
        JOIN MenuItem m ON oi.MenuItemID = m.MenuItemID`;
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
    const query = `
        SELECT oi.OrderItemID, oi.quantity, oi.price, o.OrderID, m.MenuItemID, m.name AS MenuItemName
        FROM OrderItem oi
        JOIN \`Order\` o ON oi.OrderID = o.OrderID
        JOIN MenuItem m ON oi.MenuItemID = m.MenuItemID
        WHERE oi.OrderItemID = ?`;
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
    const { quantity, price, OrderID, MenuItemID } = req.body;

    // Validar que el OrderID y MenuItemID existan
    const checkQuery = `
        SELECT EXISTS(SELECT 1 FROM \`Order\` WHERE OrderID = ?) AS orderExists,
               EXISTS(SELECT 1 FROM MenuItem WHERE MenuItemID = ?) AS menuItemExists`;
    db.query(checkQuery, [OrderID, MenuItemID], (err, results) => {
        if (err) {
            console.error('Error validating order or menu item:', err.message);
            return res.status(500).json({ error: 'Error validating order or menu item' });
        }
        const { orderExists, menuItemExists } = results[0];
        if (!orderExists || !menuItemExists) {
            return res.status(400).json({ error: 'Invalid OrderID or MenuItemID' });
        }

        // Insertar el item de pedido
        const insertQuery = `
            INSERT INTO OrderItem (quantity, price, OrderID, MenuItemID)
            VALUES (?, ?, ?, ?)`;
        db.query(insertQuery, [quantity, price, OrderID, MenuItemID], (err, result) => {
            if (err) {
                console.error('Error creating order item:', err.message);
                res.status(500).json({ error: 'Error creating order item' });
            } else {
                res.status(201).json({ message: 'Order item created successfully', orderItemId: result.insertId });
            }
        });
    });
};

// Actualizar un item de pedido
exports.updateOrderItem = (req, res) => {
    const { id } = req.params;
    const { quantity, price, OrderID, MenuItemID } = req.body;

    const query = `
        UPDATE OrderItem
        SET quantity = ?, price = ?, OrderID = ?, MenuItemID = ?
        WHERE OrderItemID = ?`;
    db.query(query, [quantity, price, OrderID, MenuItemID, id], (err, result) => {
        if (err) {
            console.error('Error updating order item:', err.message);
            res.status(500).json({ error: 'Error updating order item' });
        } else if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Order item not found' });
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
        } else if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Order item not found' });
        } else {
            res.json({ message: 'Order item deleted successfully' });
        }
    });
};
