/* ════════════════════════════════════════════
   K-Medi Spring Arabic — Main JavaScript
   Editorial sidebar layout
   ════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── Sidebar Toggle ──
  const sidebar  = document.getElementById('sidebar');
  const toggle   = document.getElementById('sidebar-toggle');
  const overlay  = document.getElementById('sidebar-overlay');
  const wrapper  = document.getElementById('main-wrapper');

  // Desktop: sidebar visible by default (no .collapsed)
  // Mobile (≤1024px): sidebar hidden by default
  const isMobile = () => window.innerWidth <= 1024;

  function openSidebar() {
    sidebar.classList.remove('collapsed');
    sidebar.classList.add('open');
    overlay.classList.add('active');
    toggle.classList.remove('sidebar-hidden');
    if (!isMobile()) wrapper.classList.remove('sidebar-hidden');
  }

  function closeSidebar() {
    sidebar.classList.add('collapsed');
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
    toggle.classList.add('sidebar-hidden');
    if (!isMobile()) wrapper.classList.add('sidebar-hidden');
  }

  function initSidebarState() {
    if (isMobile()) {
      // Mobile: start closed
      sidebar.classList.add('collapsed');
      sidebar.classList.remove('open');
      overlay.classList.remove('active');
      toggle.classList.add('sidebar-hidden');
    } else {
      // Desktop: start open
      sidebar.classList.remove('collapsed');
      sidebar.classList.remove('open');
      overlay.classList.remove('active');
      toggle.classList.remove('sidebar-hidden');
      wrapper.classList.remove('sidebar-hidden');
    }
  }

  if (toggle && sidebar) {
    initSidebarState();

    toggle.addEventListener('click', () => {
      const isCollapsed = sidebar.classList.contains('collapsed');
      if (isCollapsed) openSidebar(); else closeSidebar();
    });

    if (overlay) {
      overlay.addEventListener('click', closeSidebar);
    }

    // Close sidebar on nav link click (mobile)
    sidebar.querySelectorAll('.sidebar-nav a').forEach(a => {
      a.addEventListener('click', () => {
        if (isMobile()) closeSidebar();
      });
    });

    // Re-init on resize
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(initSidebarState, 150);
    });
  }

  // ── Active Nav Link ──
  const currentPath = window.location.pathname;
  document.querySelectorAll('.sidebar-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href && href !== '/ar/' && currentPath.includes(href)) {
      a.classList.add('active');
    } else if (href === '/ar/' && (currentPath === '/ar/' || currentPath === '/ar/index.html')) {
      a.classList.add('active');
    }
  });

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
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateY(0)';
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.card, .feature-item, .step-item, .partner-card').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity .45s ease, transform .45s ease';
      io.observe(el);
    });
  }

  // ── WhatsApp float label hide on small screens ──
  const waLabel = document.querySelector('.wa-float-label');
  if (waLabel && window.innerWidth < 480) waLabel.style.display = 'none';

})();
