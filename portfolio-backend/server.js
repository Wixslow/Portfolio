   const express = require('express');
   const bodyParser = require('body-parser');
   const nodemailer = require('nodemailer');
   const cors = require('cors');

   const app = express();
   const PORT = process.env.PORT || 3000;

   app.use(cors());
   app.use(bodyParser.json());
   app.use(bodyParser.urlencoded({ extended: true }));

   // Configura el transportador de Nodemailer
   const transporter = nodemailer.createTransport({
       service: 'gmail', // o el servicio que estés utilizando
       auth: {
           user: 'slowwix@gmail.com', // tu correo
           pass: 'tu_contraseña' // tu contraseña
       }
   });

   // Ruta para manejar el envío del formulario
   app.post('/send', (req, res) => {
       const { name, email, subject, message } = req.body;

       const mailOptions = {
           from: email,
           to: 'slowwix@gmail.com', // tu correo
           subject: subject,
           text: `Nombre: ${name}\nEmail: ${email}\nMensaje: ${message}`
       };

       transporter.sendMail(mailOptions, (error, info) => {
           if (error) {
               return res.status(500).send(error.toString());
           }
           res.status(200).send('Mensaje enviado: ' + info.response);
       });
   });

   app.listen(PORT, () => {
       console.log(`Servidor escuchando en http://localhost:${PORT}`);
   });
   
