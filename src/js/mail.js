function showToast(type, title, desc) {
  // Remove any existing toast
  const existing = document.getElementById('sh-toast');
  if (existing) existing.remove();

  const iconSuccess = `
    <svg viewBox="0 0 24 24" fill="none" stroke="#00c864" stroke-width="2.5"
      stroke-linecap="round" stroke-linejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>`;

  const iconError = `
    <svg viewBox="0 0 24 24" fill="none" stroke="#e8721e" stroke-width="2.5"
      stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="8" x2="12" y2="12"/>
      <line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>`;

  const toast = document.createElement('div');
  toast.id = 'sh-toast';
  toast.className = `sh-toast sh-toast--${type}`;
  toast.innerHTML = `
    <div class="sh-toast__icon">${type === 'success' ? iconSuccess : iconError}</div>
    <div class="sh-toast__body">
      <div class="sh-toast__title">${title}</div>
      <div class="sh-toast__desc">${desc}</div>
    </div>
    <button class="sh-toast__close" onclick="this.closest('.sh-toast').remove()">✕</button>
    <div class="sh-toast__progress">
      <div class="sh-toast__progress-bar"></div>
    </div>
  `;

  document.body.appendChild(toast);

  // Trigger show animation
  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add('sh-toast--show'));
  });

  // Auto dismiss after 4s
  setTimeout(() => {
    toast.classList.add('sh-toast--hide');
    setTimeout(() => toast.remove(), 500);
  }, 4000);
}


/* ── Main submit function ── */
window.submitForm = function () {
  const name    = document.getElementById('name')?.value.trim()    || '';
  const phone   = document.getElementById('phone')?.value.trim()   || '';
  const email   = document.getElementById('email')?.value.trim()   || '';
  const service = document.getElementById('service')?.value.trim() || '';
  const message = document.getElementById('message')?.value.trim() || '';

  // Validation
  if (!name || !phone || !email) {
    showToast(
      'error',
      'Missing Required Fields',
      'Please fill in your Name, Phone, and Email before submitting.'
    );
    return;
  }

  // Button — loading state ON
  const btn   = document.getElementById('submitBtn');
  const label = btn?.querySelector('.btn-label');
  if (btn) {
    btn.classList.add('is-loading');
    btn.disabled = true;
    if (label) label.textContent = 'Sending...';
  }

  // EmailJS send
  emailjs.send("service_gfyjzlr", "template_8ew6p74", {
    name : name,
    phone     : phone,
    email  : email,
    service   : service,
    message   : message
  })
  .then(() => {
    // Success
    if (btn) {
      btn.classList.remove('is-loading');
      btn.disabled = false;
      if (label) label.textContent = 'Send Enquiry →';
    }

    showToast(
      'success',
      'Message Sent!',
      'Thank you, ' + name + '. We\'ll get back to you shortly.'
    );

    // Clear fields
    ['name', 'phone', 'email', 'service', 'message'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
  })
  .catch((err) => {
    // Error
    if (btn) {
      btn.classList.remove('is-loading');
      btn.disabled = false;
      if (label) label.textContent = 'Send Enquiry →';
    }

    showToast(
      'error',
      'Failed to Send',
      'Something went wrong. Please try again or call us directly.'
    );

    console.error('EmailJS error:', err);
  });
};
