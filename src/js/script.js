// Particles
const pc = document.getElementById('particles');
if (pc) {
  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDuration = (6 + Math.random() * 10) + 's';
    p.style.animationDelay = (Math.random() * 10) + 's';
    p.style.width = p.style.height = (2 + Math.random() * 3) + 'px';
    pc.appendChild(p);
  }
}

// Scroll reveal
const obs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(r => obs.observe(r));

// Count-up for stats
const cObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const target = parseInt(e.target.dataset.target);
      let cur = 0;
      const step = target / 60;
      const t = setInterval(() => {
        cur += step;
        if (cur >= target) { 
          cur = target; 
          clearInterval(t);
          e.target.textContent = target + (e.target.dataset.target.includes('%') ? '%' : '+');
        } else {
          e.target.textContent = Math.floor(cur) + (e.target.dataset.target.includes('%') ? '%' : '+');
        }
      }, 25);
      cObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num[data-target]').forEach(c => cObs.observe(c));

// Active nav highlighting
const secs = document.querySelectorAll('section[id]');
const links = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let cur = '';
  secs.forEach(s => { 
    if (window.scrollY >= s.offsetTop - 100) cur = s.id; 
  });
  
  links.forEach(a => { 
    if (!a.classList.contains('nav-cta')) {
      a.style.color = (a.getAttribute('href') === '#' + cur) ? '#E8721E' : '';
    }
  });
});

// Form submission function
window.submitForm = function() {
  const name = document.getElementById('name')?.value || '';
  const phone = document.getElementById('phone')?.value || '';
  const email = document.getElementById('email')?.value || '';
  const service = document.getElementById('service')?.value || '';
  const message = document.getElementById('message')?.value || '';
  
  if (!name || !phone || !email) {
    alert('Please fill in all required fields (Name, Phone, Email)');
    return;
  }
  
  // Here you would typically send the data to your backend
  console.log('Form submitted:', { name, phone, email, service, message });
  alert('Thank you! We will contact you shortly.');
  
  // Clear form
  document.getElementById('name').value = '';
  document.getElementById('phone').value = '';
  document.getElementById('email').value = '';
  document.getElementById('service').value = '';
  document.getElementById('message').value = '';
};

