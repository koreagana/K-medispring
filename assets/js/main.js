/*
	Editorial by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var $window = $(window),
		$head = $('head'),
		$body = $('body');

	// Breakpoints.
	breakpoints({
		xlarge:   [ '1281px',  '1680px' ],
		large:    [ '981px',   '1280px' ],
		medium:   [ '737px',   '980px'  ],
		small:    [ '481px',   '736px'  ],
		xsmall:   [ '361px',   '480px'  ],
		xxsmall:  [ null,      '360px'  ],
		'xlarge-to-max':    '(min-width: 1681px)',
		'small-to-xlarge':  '(min-width: 481px) and (max-width: 1680px)'
	});

	// Stops animations/transitions until the page has loaded.
	$window.on('load', function() {
		window.setTimeout(function() {
			$body.removeClass('is-preload');
		}, 100);
	});

	// Stops animations/transitions while resizing.
	var resizeTimeout;
	$window.on('resize', function() {
		$body.addClass('is-resizing');

		clearTimeout(resizeTimeout);
		resizeTimeout = setTimeout(function() {
			$body.removeClass('is-resizing');
		}, 100);
	});

	// Fixes.

	// Object fit images.
	if (!browser.canUse('object-fit') || browser.name == 'safari')
		$('.image.object').each(function() {

			var $this = $(this),
				$img = $this.children('img');

			// Hide original image.
			$img.css('opacity', '0');

			// Set background.
			$this
				.css('background-image', 'url("' + $img.attr('src') + '")')
				.css('background-size', $img.css('object-fit') ? $img.css('object-fit') : 'cover')
				.css('background-position', $img.css('object-position') ? $img.css('object-position') : 'center');

		});

	// Sidebar.
	var $sidebar = $('#sidebar'),
		$sidebar_inner = $sidebar.children('.inner');

	// Hack: Workaround for Chrome/Android scrollbar position bug.
	if (browser.os == 'android' && browser.name == 'chrome')
		$('<style>#sidebar .inner::-webkit-scrollbar { display: none; }</style>')
			.appendTo($head);

	/* ============================================================
	   ✅ KMS Mobile Off-canvas Sidebar Toggle (body.is-menu-visible)
	   - CSS 기준: body.is-menu-visible #sidebar { left:0; }
	   - 기존 Editorial(inactive) 방식과 충돌 제거/정리
	   ============================================================ */

	var isMenuVisible = function() {
		return $body.hasClass('is-menu-visible');
	};

	var showMenu = function() {
		$body.addClass('is-menu-visible');
		$body.addClass('modal-open'); // (선택) 너 CSS에 modal-open scroll lock 쓰고 있으면 같이 잠금
	};

	var hideMenu = function() {
		$body.removeClass('is-menu-visible');
		$body.removeClass('modal-open');
	};

	var toggleMenu = function() {
		if (isMenuVisible()) hideMenu();
		else showMenu();
	};

	// Inactive by default on <= large (원본 호환용: 데스크톱에서 sidebar 고정 동작과 충돌 방지)
	breakpoints.on('<=large', function() {
		$sidebar.addClass('inactive');   // 원본 클래스는 남겨두되, 실제 슬라이드는 body class로 제어
		hideMenu();                      // 브레이크포인트 진입 시 닫힌 상태로
	});

	breakpoints.on('>large', function() {
		$sidebar.removeClass('inactive');
		hideMenu();                      // 데스크톱에서는 off-canvas 개념 자체를 끔
	});

	// ✅ Toggle element: HTML에 이미 있으면 그걸 사용 / 없으면 생성
	var $toggle = $('a.toggle[href="#sidebar"]').first();

	if ($toggle.length == 0) {
		$toggle = $('<a href="#sidebar" class="toggle" aria-label="Menu">Menu</a>')
			.appendTo($body);
	} else {
		// 접근성용 라벨만 보강
		if (!$toggle.attr('aria-label')) $toggle.attr('aria-label', 'Menu');
	}

	// ✅ 토글 클릭: 모바일/아이패드에서만 작동
	$toggle.on('click', function(event) {
		event.preventDefault();
		event.stopPropagation();

		if (breakpoints.active('>large')) return;

		toggleMenu();
	});

	// Prevent certain events inside the panel from bubbling.
	$sidebar.on('click touchend touchstart touchmove', function(event) {
		if (breakpoints.active('>large')) return;
		event.stopPropagation();
	});

	// Link clicks: 모바일에서 링크 클릭하면 메뉴 닫고 이동
	$sidebar.on('click', 'a', function(event) {

		if (breakpoints.active('>large')) return;

		var $a = $(this),
			href = $a.attr('href'),
			target = $a.attr('target');

		// opener(서브메뉴)면 그냥 토글만 하고 종료
		if ($a.hasClass('opener')) return;

		// 유효 URL 아니면 종료
		if (!href || href == '#' || href == '') return;

		event.preventDefault();
		event.stopPropagation();

		hideMenu();

		setTimeout(function() {
			if (target == '_blank') window.open(href);
			else window.location.href = href;
		}, 250);

	});

	// Hide panel on body click/tap.
	$body.on('click touchend', function(event) {
		if (breakpoints.active('>large')) return;
		if (!isMenuVisible()) return;
		hideMenu();
	});

	// ESC 닫기
	$window.on('keydown', function(event) {
		if (breakpoints.active('>large')) return;
		if (event.key === 'Escape' || event.keyCode === 27) {
			hideMenu();
		}
	});

	// Scroll lock (원본 유지)
	$window.on('load.sidebar-lock', function() {

		var sh, wh;

		// Reset scroll position to 0 if it's 1.
		if ($window.scrollTop() == 1)
			$window.scrollTop(0);

		$window
			.on('scroll.sidebar-lock', function() {

				var x, y;

				// <=large? Bail.
				if (breakpoints.active('<=large')) {

					$sidebar_inner
						.data('locked', 0)
						.css('position', '')
						.css('top', '');

					return;

				}

				// Calculate positions.
				x = Math.max(sh - wh, 0);
				y = Math.max(0, $window.scrollTop() - x);

				// Lock/unlock.
				if ($sidebar_inner.data('locked') == 1) {

					if (y <= 0)
						$sidebar_inner
							.data('locked', 0)
							.css('position', '')
							.css('top', '');
					else
						$sidebar_inner
							.css('top', -1 * x);

				}
				else {

					if (y > 0)
						$sidebar_inner
							.data('locked', 1)
							.css('position', 'fixed')
							.css('top', -1 * x);

				}

			})
			.on('resize.sidebar-lock', function() {

				wh = $window.height();
				sh = $sidebar_inner.outerHeight() + 30;

				$window.trigger('scroll.sidebar-lock');

			})
			.trigger('resize.sidebar-lock');

	});

})(jQuery);
