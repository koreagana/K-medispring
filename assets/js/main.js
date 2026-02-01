/*
  Editorial by HTML5 UP
  Customized for K-Medi Spring
  Sidebar off-canvas = #sidebar
*/

(function ($) {

  var $window = $(window),
      $body   = $('body'),
      $sidebar = $('#sidebar'),
      $sidebarInner = $sidebar.children('.inner'),
      $toggle  = $('a.toggle[href="#sidebar"]');

  /* =========================
     Breakpoints (원본 유지)
     ========================= */
  breakpoints({
    xlarge:   [ '1281px',  '1680px' ],
    large:    [ '981px',   '1280px' ],
    medium:   [ '737px',   '980px'  ],
    small:    [ '481px',   '736px'  ],
    xsmall:   [ '361px',   '480px'  ],
    xxsmall:  [ null,      '360px'  ]
  });

  /* =========================
     Page preload
     ========================= */
  $window.on('load', function () {
    setTimeout(function () {
      $body.removeClass('is-preload');
    }, 100);
  });

  /* =========================
     Helpers
     ========================= */
  function isMobile() {
    return breakpoints.active('<=large');
  }

  function openMenu() {
    $body.addClass('is-menu-visible modal-open');
  }

  function closeMenu() {
    $body.removeClass('is-menu-visible modal-open');
  }

  function toggleMenu() {
    $body.hasClass('is-menu-visible') ? closeMenu() : openMenu();
  }

  /* =========================
     Toggle (HTML에 있는 것만 사용)
     ========================= */
  $toggle.on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (!isMobile()) return;
    toggleMenu();
  });

  /* =========================
     Sidebar 내부 클릭은 버블 차단
     ========================= */
  $sidebar.on('click touchstart touchmove', function (e) {
    if (!isMobile()) return;
    e.stopPropagation();
  });

  /* =========================
     메뉴 링크 클릭 → 닫고 이동
     ========================= */
  $sidebar.on('click', 'a[href]', function (e) {
    if (!isMobile()) return;

    var href = $(this).attr('href');
    if (!href || href === '#' || href.startsWith('#')) return;

    e.preventDefault();
    closeMenu();

    setTimeout(function () {
      window.location.href = href;
    }, 200);
  });

  /* =========================
     바깥 클릭 → 닫기
     ========================= */
  $body.on('click touchend', function () {
    if (!isMobile()) return;
    if ($body.hasClass('is-menu-visible')) {
      closeMenu();
    }
  });

  /* =========================
     ESC → 닫기
     ========================= */
  $window.on('keydown', function (e) {
    if (!isMobile()) return;
    if (e.key === 'Escape') closeMenu();
  });

  /* =========================
     브레이크포인트 전환 시 초기화
     ========================= */
  breakpoints.on('>large', function () {
    closeMenu();
  });

})(jQuery);
