const db = require('../models/db'); // Importa la conexión a la base de datos
const nodemailer = require('nodemailer'); // Para enviar correos electrónicos
require('dotenv').config(); // Carga las variables del archivo .env

// Configurar Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail', // Cambia esto si usas otro proveedor
    auth: {
        user: process.env.EMAIL_USER, // Correo del remitente
        pass: process.env.EMAIL_PASS, // Contraseña de aplicación
    },
});

// Obtener todas las órdenes
exports.getAllOrders = (req, res) => {
    const query = 'SELECT * FROM `Order`';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching orders:', err.message);
            res.status(500).json({ error: 'Error fetching orders' });
        } else {
            res.json(results);
        }
    });
};

// Obtener una orden por ID
exports.getOrderById = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM `Order` WHERE OrderID = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error fetching order:', err.message);
            res.status(500).json({ error: 'Error fetching order' });
        } else if (result.length === 0) {
            res.status(404).json({ message: 'Order not found' });
        } else {
            res.json(result[0]);
        }
    });
};

// Crear una nueva orden y enviar código de confirmación por email
exports.createOrder = (req, res) => {
    const { totalAmount, status, orderTime, pickupTime, UserID, CafeID } = req.body;

    // Generar un código de confirmación
    const confirmationCode = Math.floor(1000 + Math.random() * 9000).toString();

    const query = `
        INSERT INTO \`Order\` (totalAmount, status, orderTime, pickupTime, confirmationCode, UserID, CafeID)
        VALUES (?, ?, ?, ?, ?, ?, ?)`;

    db.query(query, [totalAmount, status, orderTime, pickupTime, confirmationCode, UserID, CafeID], (err, result) => {
        if (err) {
            console.error('Error creating order:', err.message);
            res.status(500).json({ error: 'Error creating order' });
        } else {
            // Obtener el email del usuario
            const userEmailQuery = 'SELECT email FROM User WHERE UserID = ?';
            db.query(userEmailQuery, [UserID], (err, userResult) => {
                if (err || userResult.length === 0) {
                    console.error('Error fetching user email:', err ? err.message : 'User not found');
                    res.status(500).json({ error: 'Error sending confirmation email' });
                } else {
                    const userEmail = userResult[0].email;
                    // Enviar correo electrónico con el código de confirmación
                    const mailOptions = {
                        from: process.env.EMAIL_USER,
                        to: userEmail,
                        subject: 'Order Confirmation Code',
                        text: `Your confirmation code is: ${confirmationCode}`,
                        html: `<h1>Order Confirmation</h1><p>Your confirmation code is: <b>${confirmationCode}</b></p>`,
                    };

                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            console.error('Error sending email:', error.message);
                            res.status(500).json({
                                error: 'Order created but failed to send confirmation email',
                            });
                        } else {
                            console.log('Email sent:', info.response);
                            res.status(201).json({
                                message: 'Order created successfully and confirmation email sent',
                                orderId: result.insertId,
                                confirmationCode,
                            });
                        }
                    });
                }
            });
        }
    });
};

// Actualizar una orden
exports.updateOrder = (req, res) => {
    const { id } = req.params;
    const { totalAmount, status, orderTime, pickupTime, confirmationCode, UserID, CafeID } = req.body;

    const query = `
        UPDATE \`Order\`
        SET totalAmount = ?, status = ?, orderTime = ?, pickupTime = ?, confirmationCode = ?, UserID = ?, CafeID = ?
        WHERE OrderID = ?`;

    db.query(query, [totalAmount, status, orderTime, pickupTime, confirmationCode, UserID, CafeID, id], (err, result) => {
        if (err) {
            console.error('Error updating order:', err.message);
            res.status(500).json({ error: 'Error updating order' });
        } else {
            res.json({ message: 'Order updated successfully' });
        }
    });
};

// Eliminar una orden
exports.deleteOrder = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM `Order` WHERE OrderID = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error deleting order:', err.message);
            res.status(500).json({ error: 'Error deleting order' });
        } else {
            res.json({ message: 'Order deleted successfully' });
        }
    });
};
