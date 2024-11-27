document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el envío del formulario por defecto
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();
    const feedback = document.getElementById('form-feedback');
    
    feedback.textContent = ''; 
  
    if (name === '' || name.length < 10) {
      feedback.textContent = 'Por favor, ingresa un nombre válido (mínimo 10 caracteres).';
      return;
    }
    
    if (!validateEmail(email)) {
      feedback.textContent = 'Por favor, ingresa un correo electrónico válido.';
      return;
    }
    
    if (!validatePhone(phone)) {
      feedback.textContent = 'Por favor, ingresa un número de teléfono válido (formato: 123-456-7890).';
      return;
    }
    
    if (message === '' || message.length < 30) {
      feedback.textContent = 'El mensaje debe tener al menos 30 caracteres.';
      return;
    }
    
    feedback.style.color = 'green';
    feedback.textContent = 'Formulario enviado con éxito.';

  });
  
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  
  function validatePhone(phone) {
    const re = /^\d{3}-\d{3}-\d{4}$/; // Formato: 123-456-7890
    return re.test(phone);
  }
  