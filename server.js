const express = require('express');
const path = require('path');
const bodyParser = require('body-parser'); // Necesario para procesar los datos del formulario
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 3000;

// Middleware para procesar datos JSON enviados en el formulario
app.use(bodyParser.json());

// Habilitar CORS para permitir solicitudes desde dominios diferentes
app.use(cors());

// Registrar solicitudes en la consola (solo para desarrollo)
app.use(morgan('dev'));

// Servir archivos estáticos (CSS, JS, imágenes, HTML) desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para la página principal (index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta para la página de contacto (contacto.html)
app.get('/contacto', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contacto.html'));
});

// API para manejar el formulario de contacto
app.post('/api/contact', (req, res) => {
  const { name, email, phone, message } = req.body;

  // Validación de los datos enviados
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!name || !email || !phone || !message) {
    return res.status(400).json({ message: 'Todos los campos son requeridos' });
  }
  if (!validateEmail(email)) {
    return res.status(400).json({ message: 'Email no válido' });
  }

  // Aquí podrías guardar los datos en una base de datos o enviar un correo electrónico
  console.log('Datos recibidos:', { name, email, phone, message });

  // Responder con un mensaje de éxito al cliente
  res.status(200).json({ message: 'Formulario enviado con éxito' });
});

// Ruta para devolver datos de prueba en formato JSON
app.get('/api/data', (req, res) => {
  const exampleData = [
    { id: 1, title: 'Dato 1', description: 'Descripción del dato 1' },
    { id: 2, title: 'Dato 2', description: 'Descripción del dato 2' },
    { id: 3, title: 'Dato 3', description: 'Descripción del dato 3' },
  ];
  res.status(200).json(exampleData);
});

// Ruta para manejar errores 404
app.use((req, res) => {
  res.status(404).send('Página no encontrada');
});

// Middleware para manejar errores globales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Algo salió mal en el servidor' });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
