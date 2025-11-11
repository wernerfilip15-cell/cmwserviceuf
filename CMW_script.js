// Enkel interaktivitet: mobilmeny, formulärhantering och enkel localStorage
document.addEventListener('DOMContentLoaded', function () {
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');

  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    if (mainNav.style.display === 'block') {
      mainNav.style.display = '';
    } else {
      mainNav.style.display = 'block';
    }
  });

  // Smidig scroll för inre länkar
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const target = document.querySelector(this.getAttribute('href'));
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
        // stäng mobilmenyn
        if(window.innerWidth < 700){ mainNav.style.display = ''; navToggle.setAttribute('aria-expanded','false'); }
      }
    });
  });

  // Formulärhantering
  const form = document.getElementById('contactForm');
  const msg = document.getElementById('formMessage');
  const clearBtn = document.getElementById('clearBtn');

  form.addEventListener('submit', function(e){
    e.preventDefault();
    const data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      message: form.message.value.trim(),
      time: new Date().toISOString()
    };

    if(!data.name || !data.email || !data.message){
      msg.textContent = 'Vänligen fyll i alla fält.';
      msg.style.color = 'crimson';
      return;
    }

    // Simulerad "skickning" — spara i localStorage som demonstraton
    const stored = JSON.parse(localStorage.getItem('cmw_messages')||'[]');
    stored.push(data);
    localStorage.setItem('cmw_messages', JSON.stringify(stored));

    form.reset();
    msg.style.color = '';
    msg.textContent = 'Tack! Vi har mottagit din förfrågan och återkommer inom 48 timmar.';
  });

  clearBtn.addEventListener('click', function(){
    form.reset();
    msg.textContent = '';
    localStorage.removeItem('cmw_messages');
  });
});
