document.getElementById('contact-form').addEventListener('submit', function (event) {
  event.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const message = document.getElementById('message').value.trim();
  const feedbackElement = document.getElementById('form-feedback');

  // Validación básica en el frontend
  if (!name || !email || !phone || !message) {
    feedbackElement.innerHTML = 'Todos los campos son obligatorios.';
    feedbackElement.style.color = 'red';
    return;
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    feedbackElement.innerHTML = 'Por favor, ingresa un correo electrónico válido.';
    feedbackElement.style.color = 'red';
    return;
  }

  fetch('/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, phone, message }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      feedbackElement.innerHTML = data.message;
      feedbackElement.style.color = 'green';

      // Restablecer el formulario
      document.getElementById('contact-form').reset();
    })
    .catch(error => {
      feedbackElement.innerHTML =
        'Hubo un error al enviar el formulario. Inténtalo de nuevo más tarde.';
      feedbackElement.style.color = 'red';
      console.error('Error:', error);
    });
});
