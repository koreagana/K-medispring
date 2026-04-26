/* ================================================
   한강애봄 Arabic Site — Main JavaScript
   ================================================ */

// ── Mobile Nav Toggle ──
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');

if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
    hamburger.classList.toggle('active');
  });
  // Close on link click
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      hamburger.classList.remove('active');
    });
  });
}

// ── Sticky Header Shadow ──
const header = document.querySelector('.site-header');
if (header) {
  window.addEventListener('scroll', () => {
    header.style.boxShadow = window.scrollY > 10
      ? '0 4px 24px rgba(27,58,107,.14)'
      : '0 2px 8px rgba(27,58,107,.08)';
  });
}

// ── FAQ Accordion ──
document.querySelectorAll('.faq-q').forEach(q => {
  q.addEventListener('click', () => {
    const item = q.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// ── Scroll Reveal ──
const revealEls = document.querySelectorAll('.card, .feature-item, .step-item, .partner-card, .split-section');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity .5s ease, transform .5s ease';
    io.observe(el);
  });
}

// ── WhatsApp float label hide on mobile ──
const waLabel = document.querySelector('.wa-float-label');
if (waLabel && window.innerWidth < 480) {
  waLabel.style.display = 'none';
}

// ── Active Nav highlight ──
const currentPath = window.location.pathname;
document.querySelectorAll('.main-nav a').forEach(a => {
  if (currentPath.includes(a.getAttribute('href'))) {
    a.classList.add('active');
  }
});
