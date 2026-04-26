/* ════════════════════════════════════════════
   MEDI SPRING Arabic — Main JavaScript
   Desktop: sidebar always visible (sticky right)
   Mobile (≤1024px): overlay toggle from right
   ════════════════════════════════════════════ */

(function () {
  'use strict';

  const sidebar  = document.getElementById('sidebar');
  const toggle   = document.getElementById('sidebar-toggle');
  const overlay  = document.getElementById('sidebar-overlay');

  const MOBILE_BP = 1024;
  const isMobile  = () => window.innerWidth <= MOBILE_BP;

  /* ── Mobile sidebar open/close ── */
  function openMobile() {
    sidebar.classList.add('mobile-open');
    overlay.classList.add('active');
    if (toggle) toggle.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
  function closeMobile() {
    sidebar.classList.remove('mobile-open');
    overlay.classList.remove('active');
    if (toggle) toggle.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  if (sidebar && toggle) {
    toggle.addEventListener('click', () => {
      if (sidebar.classList.contains('mobile-open')) {
        closeMobile();
      } else {
        openMobile();
      }
    });
  }

  if (overlay) {
    overlay.addEventListener('click', closeMobile);
  }

  /* ESC key */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMobile();
  });

  /* Close sidebar on nav link click (mobile) */
  if (sidebar) {
    sidebar.querySelectorAll('#menu a').forEach(a => {
      a.addEventListener('click', () => {
        if (isMobile()) closeMobile();
      });
    });
  }

  /* Re-init on resize */
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (!isMobile()) closeMobile();
    }, 120);
  });

  /* ── Active nav link ── */
  const path = window.location.pathname;
  document.querySelectorAll('#menu a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href === '/ar/' && (path === '/ar/' || path === '/ar/index.html')) {
      a.closest('li') && a.closest('li').classList.add('active');
    } else if (href !== '/ar/' && href.length > 4 && path.startsWith(href)) {
      a.closest('li') && a.closest('li').classList.add('active');
    }
  });

  /* ── Scroll Reveal ── */
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateY(0)';
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.features article, .posts article, .stat-item, .card').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      el.style.transition = 'opacity .4s ease, transform .4s ease';
      io.observe(el);
    });
  }

  /* ── WA float label hide on small screens ── */
  const waLabel = document.querySelector('.wa-float-label');
  if (waLabel && window.innerWidth < 480) waLabel.style.display = 'none';

})();
