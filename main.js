document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
      var expanded = links.classList.contains('open');
      toggle.setAttribute('aria-expanded', expanded);
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('open'); });
    });
  }

  var year = document.querySelector('[data-year]');
  if (year) { year.textContent = new Date().getFullYear(); }

  // Gestion du formulaire de contact
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      
      var submitBtn = document.getElementById('submitBtn');
      var formMessage = document.getElementById('formMessage');
      var btnText = submitBtn.textContent;
      
      // Désactiver le bouton pendant l'envoi
      submitBtn.disabled = true;
      submitBtn.textContent = 'Envoi en cours...';
      
      // Recueillir les données du formulaire
      var formData = new FormData(contactForm);
      
      // Envoyer via FormSubmit.co
      fetch('https://formsubmit.co/ajax/borelkombou5@gmail.com', {
        method: 'POST',
        body: formData
      })
      .then(function(response) {
        if (response.ok) {
          formMessage.style.display = 'block';
          formMessage.style.color = '#27ae60';
          formMessage.textContent = '✓ Votre message a été envoyé avec succès ! Nous vous recontacterons bientôt.';
          contactForm.reset();
          submitBtn.textContent = btnText;
          submitBtn.disabled = false;
          
          // Masquer le message après 5 secondes
          setTimeout(function() {
            formMessage.style.display = 'none';
          }, 5000);
        } else {
          throw new Error('Erreur lors de l\'envoi');
        }
      })
      .catch(function(error) {
        formMessage.style.display = 'block';
        formMessage.style.color = '#e74c3c';
        formMessage.textContent = '✗ Erreur lors de l\'envoi. Veuillez réessayer ou nous contacter directement.';
        submitBtn.textContent = btnText;
        submitBtn.disabled = false;
      });
    });
  }
});
