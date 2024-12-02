// js/app.js

document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const message = document.getElementById('message').value;

  fetch('/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, phone, message }),
  })
    .then(response => response.json())
    .then(data => {
      document.getElementById('form-feedback').innerHTML = data.message;
      document.getElementById('form-feedback').style.color = 'green';
    })
    .catch(error => {
      document.getElementById('form-feedback').innerHTML = 'Error al enviar el formulario';
      document.getElementById('form-feedback').style.color = 'red';
    });
});
