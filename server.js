// server.js
const express = require('express');
const app = express();
const port = 3000;

// Middleware para parsear el body de las peticiones POST
app.use(express.json());
app.use(express.static('public'));

// Endpoint para recibir el formulario de contacto
app.post('/api/contact', (req, res) => {
  const { name, email, phone, message } = req.body;
  // Aquí podrías guardar los datos en una base de datos o enviar un correo
  console.log('Datos recibidos:', { name, email, phone, message });

  res.json({ message: 'Formulario enviado con éxito' });
});

// Servir el sitio web estático
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
