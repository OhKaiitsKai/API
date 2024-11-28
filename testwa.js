const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'aymeealvarezv@gmail.com', // Tu correo de Gmail
        pass: 'arhjdbcwazjwbwxa',     // Tu contraseña de Gmail
    },
});

const mailOptions = {
    from: 'aymeealvarezv@gmail.com',
    to: 'mabelation@gmail.com',
    subject: 'Prueba desde Nodemailer',
    text: '¡Hola! Este es un correo de prueba.',
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error('Error al enviar el correo:', error);
    } else {
        console.log('Correo enviado:', info.response);
    }
});
