// Menu burger responsive
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
burger?.addEventListener('click', () => {
  navLinks.classList.toggle('nav-active');
});

// Smooth scroll for anchor links
const links = document.querySelectorAll('a[href^="#"]');
for (const link of links) {
  link.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

// Mode sombre/clair
const themeBtn = document.getElementById('theme-toggle');
function setTheme(dark) {
  if (dark) {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeBtn.textContent = '☀️';
    localStorage.setItem('site-theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    themeBtn.textContent = '🌙';
    localStorage.setItem('site-theme', 'light');
  }
}
if (themeBtn) {
  // Init theme
  const stored = localStorage.getItem('site-theme');
  if (stored) setTheme(stored === 'dark');
  else if (window.matchMedia('(prefers-color-scheme: dark)').matches) setTheme(true);
  themeBtn.addEventListener('click', () => {
    setTheme(document.documentElement.getAttribute('data-theme') !== 'dark');
  });
}

// Progress bar de lecture
const progressBar = document.getElementById('progress-bar');
window.addEventListener('scroll', () => {
  const h = document.documentElement,
    st = h.scrollTop || document.body.scrollTop,
    sh = h.scrollHeight - h.clientHeight;
  const percent = sh ? (st / sh) * 100 : 0;
  if (progressBar) progressBar.style.width = percent + '%';
});

// Calculateur interactif
const calcForm = document.getElementById('calc-form');
const calcResult = document.getElementById('calc-result');
if (calcForm && calcResult) {
  calcForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const pieces = parseInt(document.getElementById('piece').value, 10);
    const volume = parseInt(document.getElementById('volume').value, 10);
    if (pieces > 0 && volume > 0) {
      // Débit conseillé = volume * 0.5 (renouvellement 0.5 vol/h)
      const debit = Math.round(volume * 0.5);
      calcResult.textContent = `Débit conseillé : ${debit} m³/h pour ${pieces} pièce(s)`;
    } else {
      calcResult.textContent = 'Veuillez remplir tous les champs.';
    }
  });
}

// Recherche instantanée dans la FAQ
const faqSearch = document.getElementById('faq-search');
const faqDetails = document.querySelectorAll('.faq-list details');
if (faqSearch) {
  faqSearch.addEventListener('input', function() {
    const val = this.value.toLowerCase();
    faqDetails.forEach(d => {
      const txt = d.textContent.toLowerCase();
      d.hidden = val && !txt.includes(val);
    });
  });
}

// Simple form handler (contact)
document.querySelector('form')?.addEventListener('submit', function(e) {
  e.preventDefault();
  alert('Merci pour votre message ! (Démo)');
  this.reset();
});

// Animation d’apparition des sections
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('section, .card').forEach(el => {
  observer.observe(el);
});

// Accessibilité : focus visible
document.body.addEventListener('keyup', function(e) {
  if (e.key === 'Tab') document.body.classList.add('user-is-tabbing');
});
document.body.addEventListener('mousedown', function() {
  document.body.classList.remove('user-is-tabbing');
});
    const term = input.value.trim().toLowerCase();
    if (!term) return loadContent('verification-debit');
    const results = [];
    const vmc = window.vmcContent || {};
    Object.keys(vmc).forEach(k => {
      const s = vmc[k];
      if (!s || !s.content) return;
      if (s.content.toLowerCase().includes(term) || (s.title && s.title.toLowerCase().includes(term))) {
        results.push(`<div class="card"><h3>${s.title || k}</h3>${s.content}</div>`);
      }
    });
    const contentDiv = document.getElementById('content');
    if (contentDiv) contentDiv.innerHTML = results.join('\n') || '<p class="text-muted">Aucun résultat</p>';
  };
  input.addEventListener('keypress', (ev) => { if (ev.key === 'Enter') doSearch(); });
  button.addEventListener('click', doSearch);
}

function initThemeToggle() {
  const stored = localStorage.getItem('site-theme');
  if (stored === 'light') document.documentElement.setAttribute('data-theme', 'light');
  const header = document.querySelector('.site-header .wrap');
  if (!header) return;
  if (document.getElementById('theme-toggle')) return;
  const btn = document.createElement('button');
  btn.id = 'theme-toggle';
  btn.type = 'button';
  btn.className = 'btn ghost';
  const currentIsDark = document.documentElement.getAttribute('data-theme') !== 'light';
  btn.textContent = currentIsDark ? '☀️' : '🌙';
  btn.addEventListener('click', () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    if (isLight) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('site-theme', 'dark');
      btn.textContent = '☀️';
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('site-theme', 'light');
      btn.textContent = '🌙';
    }
  });
  header.appendChild(btn);
}

// Initialisation générale (progressive migration)
window.addEventListener('DOMContentLoaded', () => {
  initMenuBehavior();
  initSearch();
  initThemeToggle();
  // charge la section par défaut si aucune autre initialisation
  setTimeout(() => loadContent('verification-debit'), 100);
});

export default {
  loadContent
};
