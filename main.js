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

  // Filtres des offres d'emploi
  var chips = document.querySelectorAll('.chip');
  var jobCards = document.querySelectorAll('.job-card');
  if (chips.length && jobCards.length) {
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        var filter = chip.getAttribute('data-filter');
        chips.forEach(function (item) { item.classList.remove('active'); });
        chip.classList.add('active');

        jobCards.forEach(function (card) {
          var category = card.getAttribute('data-category');
          var visible = filter === 'all' || category === filter;
          card.classList.toggle('is-hidden', !visible);
        });
      });
    });
  }

  // Ajout dynamique d'une offre depuis le formulaire front-end
  var offerForm = document.getElementById('offerForm');
  var previewList = document.getElementById('previewList');
  if (offerForm && previewList) {
    offerForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var title = document.getElementById('offerTitle').value.trim();
      var location = document.getElementById('offerLocation').value.trim();
      var type = document.getElementById('offerType').value.trim();
      var details = document.getElementById('offerDetails').value.trim();
      var message = document.getElementById('offerMessage');

      if (!title || !location || !type || !details) {
        if (message) {
          message.textContent = 'Veuillez remplir tous les champs pour publier une offre.';
          message.style.color = '#e74c3c';
        }
        return;
      }

      var card = document.createElement('article');
      card.className = 'preview-card';
      card.innerHTML = '<div class="preview-heading"><strong>' + title + '</strong><span>' + type + '</span></div><p>' + details + '</p><div class="job-meta"><span>' + location + '</span><span>Ajoutée à la visite</span></div>';
      previewList.prepend(card);

      offerForm.reset();
      if (message) {
        message.textContent = 'Offre ajoutée à la liste avec succès. Elle apparaîtra immédiatement dans la prévisualisation.';
        message.style.color = '#27ae60';
      }
    });
  }

  // Gestion du formulaire de contact
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var submitBtn = document.getElementById('submitBtn');
      var formMessage = document.getElementById('formMessage');
      var btnText = submitBtn ? submitBtn.textContent : 'Envoyer la demande';
      var formAction = contactForm.getAttribute('action') || 'https://formsubmit.co/ajax/ekoulepaulpatrice@gmail.com';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Envoi en cours...';
      }

      var formData = new FormData(contactForm);

      fetch(formAction, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(function(response) {
        if (response.ok) {
          if (formMessage) {
            formMessage.style.display = 'block';
            formMessage.style.color = '#27ae60';
            formMessage.textContent = '✓ Votre message a été envoyé avec succès ! Nous vous recontacterons bientôt.';
          }
          contactForm.reset();
          if (submitBtn) {
            submitBtn.textContent = btnText;
            submitBtn.disabled = false;
          }

          setTimeout(function() {
            if (formMessage) {
              formMessage.style.display = 'none';
            }
          }, 5000);
        } else {
          throw new Error('Erreur lors de l\'envoi');
        }
      })
      .catch(function(error) {
        if (formMessage) {
          formMessage.style.display = 'block';
          formMessage.style.color = '#e74c3c';
          formMessage.textContent = '✗ Erreur lors de l\'envoi. Veuillez réessayer ou nous contacter directement.';
        }
        if (submitBtn) {
          submitBtn.textContent = btnText;
          submitBtn.disabled = false;
        }
      });
    });
  }
});
