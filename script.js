// N8 Global Enterprises — dependency-free interactions for GitHub Pages.
(function () {
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');
  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', function () {
      const open = mobileNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.innerHTML = open
        ? '<span class="icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg></span>'
        : '<span class="icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg></span>';
    });
    mobileNav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        mobileNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const slides = Array.from(document.querySelectorAll('.slide'));
  const dots = Array.from(document.querySelectorAll('.dot-btn'));
  const heroMedia = document.getElementById('heroMedia');
  let current = 0, paused = false;

  function showSlide(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach(function (slide, i) {
      slide.classList.toggle('active', i === current);
      slide.setAttribute('aria-hidden', i === current ? 'false' : 'true');
    });
    dots.forEach(function (dot, i) { dot.classList.toggle('active', i === current); });
  }
  function next(dir) { showSlide(current + dir); }
  document.getElementById('prevSlide')?.addEventListener('click', function(){ next(-1); });
  document.getElementById('nextSlide')?.addEventListener('click', function(){ next(1); });
  dots.forEach(function(dot){ dot.addEventListener('click', function(){ showSlide(Number(dot.dataset.slide)); }); });
  heroMedia?.addEventListener('mouseenter', function(){ paused = true; });
  heroMedia?.addEventListener('mouseleave', function(){ paused = false; });
  heroMedia?.addEventListener('focusin', function(){ paused = true; });
  heroMedia?.addEventListener('focusout', function(){ paused = false; });
  setInterval(function(){ if (!paused && slides.length) next(1); }, 5000);

  document.querySelectorAll('.choice').forEach(function(choice) {
    choice.addEventListener('click', function() {
      document.querySelectorAll('.choice').forEach(function(x){x.classList.remove('selected')});
      choice.classList.add('selected');
      const input = choice.querySelector('input'); if (input) input.checked = true;
    });
  });
  document.querySelectorAll('.pill').forEach(function(pill) {
    pill.addEventListener('click', function() {
      document.querySelectorAll('.pill').forEach(function(x){x.classList.remove('selected')});
      pill.classList.add('selected');
      const input = pill.querySelector('input'); if (input) input.checked = true;
    });
  });

  const fileInput = document.getElementById('files');
  const fileText = document.querySelector('.file-text');
  fileInput?.addEventListener('change', function() {
    const names = Array.from(fileInput.files || []).map(function(f){return f.name});
    if (fileText) fileText.textContent = names.length ? names.join(', ') : 'PDF, DOCX, PNG or JPG — up to 10 MB each';
  });

  const form = document.getElementById('inquiryForm');
  const status = document.getElementById('formStatus');
  form?.addEventListener('submit', function(event) {
    event.preventDefault();
    const data = new FormData(form);
    const get = function(key){ return String(data.get(key) || '').trim(); };
    const service = get('service'), category = get('category');
    const subject = 'Wholesale inquiry (' + service + ') — ' + (get('company') || get('name'));
    const lines = [
      'Buyer type: ' + service,
      'Product category: ' + category,
      '',
      'Name: ' + get('name'),
      'Shop / Company: ' + get('company'),
      'Email: ' + get('email'),
      'Phone / WhatsApp: ' + get('phone'),
      'City / State: ' + get('location'),
      'GSTIN: ' + get('gstin'),
      'Estimated quantity: ' + get('quantity'),
      '',
      'Requirement details:',
      get('details')
    ];
    const names = Array.from(fileInput?.files || []).map(function(f){return f.name});
    if (names.length) lines.push('', 'Files to attach: ' + names.join(', '), '(Please attach these files before sending.)');
    window.location.href = 'mailto:info@n8global.in?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(lines.join('\\n'));
    if (status) status.textContent = 'Email draft opened. Please attach any selected files before sending.';
    const submitText = document.getElementById('submitText');
    if (submitText) submitText.textContent = 'Email draft opened';
  });

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();