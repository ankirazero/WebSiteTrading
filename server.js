const express = require('express');
const path = require('path');
const bodyParser = require('body-parser'); // Necesario para procesar los datos del formulario
const app = express();
const port = 3000;

// Middleware para poder procesar datos JSON enviados en el formulario
app.use(bodyParser.json());

// Servir archivos estáticos (CSS, JS, imágenes, HTML)
app.use(express.static(path.join(__dirname, '')));

// Ruta para la página principal (index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Ruta para la página de contacto (contacto.html)
app.get('/contacto', (req, res) => {
  res.sendFile(path.join(__dirname, 'contacto.html'));
});

// Ruta para recibir los datos del formulario de contacto
app.post('/api/contact', (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !phone || !message) {
    return res.status(400).json({ message: 'Todos los campos son requeridos' });
  }

  // Aquí podrías hacer lo que necesites con los datos (guardar en base de datos, enviar email, etc.)
  console.log('Datos recibidos:', { name, email, phone, message });

  // Responder con un mensaje de éxito
  res.status(200).json({ message: 'Formulario enviado con éxito' });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
