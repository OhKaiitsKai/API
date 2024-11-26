const db = require('../models/db');

// Obtener todos los usuarios
exports.getAllUsers = (req, res) => {
    const query = 'SELECT * FROM User';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching users:', err.message);
            res.status(500).json({ error: 'Error fetching users' });
        } else {
            res.json(results);
        }
    });
};

// Crear un nuevo usuario
exports.createUser = (req, res) => {
    const { name, lastname, email, password, phone, role, alias, profilepic, address } = req.body;
    const query = `
        INSERT INTO User (name, lastname, email, password, phone, role, alias, profilepic, address)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    db.query(query, [name, lastname, email, password, phone, role, alias, profilepic, address], (err, result) => {
        if (err) {
            console.error('Error creating user:', err.message);
            res.status(500).json({ error: 'Error creating user' });
        } else {
            res.status(201).json({ message: 'User created successfully', userId: result.insertId });
        }
    });
};
