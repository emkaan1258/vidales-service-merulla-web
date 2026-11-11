/* VIDALES SERVICEL L C: small progressive-enhancement script (no dependencies).
   Adds the mobile menu toggle and services dropdown. Without JavaScript the
   navigation is shown expanded, so every link still works. */
(function () {
  'use strict';

  var header = document.getElementById('siteHeader');
  var menuBtn = document.getElementById('menuBtn');
  var nav = document.getElementById('primaryNav');
  var dropdown = document.getElementById('svcDropdown');
  var ddBtn = dropdown ? dropdown.querySelector('.dd-btn') : null;

  function setMenu(open) {
    if (!menuBtn || !nav) return;
    nav.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  function setDropdown(open) {
    if (!dropdown || !ddBtn) return;
    dropdown.classList.toggle('open', open);
    ddBtn.setAttribute('aria-expanded', String(open));
  }

  // Mobile menu toggle
  if (menuBtn) {
    menuBtn.addEventListener('click', function () {
      setMenu(menuBtn.getAttribute('aria-expanded') !== 'true');
    });
  }

  // Services dropdown toggle (click / tap / keyboard)
  if (ddBtn) {
    ddBtn.addEventListener('click', function () {
      setDropdown(!dropdown.classList.contains('open'));
    });
  }

  // Close menus when a link is chosen
  if (nav) {
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        setMenu(false);
        setDropdown(false);
      }
    });
  }

  // Close on Escape, or when clicking outside the header
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      setMenu(false);
      setDropdown(false);
    }
  });
  document.addEventListener('click', function (e) {
    if (header && !header.contains(e.target)) {
      setMenu(false);
      setDropdown(false);
    }
  });

  // Reset the mobile menu if the window is resized to desktop width
  window.addEventListener('resize', function () {
    if (window.innerWidth > 960) setMenu(false);
  });

  // Header shadow once the page scrolls
  function onScroll() {
    if (header) header.classList.toggle('scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
