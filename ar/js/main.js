/* ════════════════════════════════════════════
   K-Medi Spring Arabic — Main JavaScript
   Desktop: sidebar always visible, no toggle
   Mobile (≤1024px): overlay toggle
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
    sidebar.classList.remove('mobile-hidden');
    overlay.classList.add('active');
    toggle.classList.add('is-open');
  }
  function closeMobile() {
    sidebar.classList.remove('mobile-open');
    sidebar.classList.add('mobile-hidden');
    overlay.classList.remove('active');
    toggle.classList.remove('is-open');
  }

  /* ── Init based on viewport ── */
  function init() {
    if (isMobile()) {
      /* 모바일: 사이드바 숨김, 토글 보임 */
      sidebar.classList.add('mobile-hidden');
      sidebar.classList.remove('mobile-open');
      overlay.classList.remove('active');
      if (toggle) toggle.classList.remove('is-open');
    } else {
      /* 데스크탑: 사이드바 항상 표시, 토글 숨김 (CSS로 처리) */
      sidebar.classList.remove('mobile-hidden');
      sidebar.classList.remove('mobile-open');
      overlay.classList.remove('active');
    }
  }

  if (sidebar) {
    init();

    if (toggle) {
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

    /* 링크 클릭 시 모바일 사이드바 닫기 */
    sidebar.querySelectorAll('.sidebar-nav a').forEach(a => {
      a.addEventListener('click', () => {
        if (isMobile()) closeMobile();
      });
    });

    /* 리사이즈 대응 */
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(init, 120);
    });
  }

  /* ── Active nav link ── */
  const path = window.location.pathname;
  document.querySelectorAll('.sidebar-nav a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href === '/ar/' && (path === '/ar/' || path === '/ar/index.html')) {
      a.classList.add('active');
    } else if (href !== '/ar/' && href.length > 4 && path.startsWith(href)) {
      a.classList.add('active');
    }
  });

  /* ── FAQ Accordion ── */
  document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      const open = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!open) item.classList.add('open');
    });
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

    document.querySelectorAll('.card, .feature-item, .step-item, .partner-card').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(18px)';
      el.style.transition = 'opacity .4s ease, transform .4s ease';
      io.observe(el);
    });
  }

  /* ── WA label 소형 화면 숨김 ── */
  const waLabel = document.querySelector('.wa-float-label');
  if (waLabel && window.innerWidth < 480) waLabel.style.display = 'none';

})();
