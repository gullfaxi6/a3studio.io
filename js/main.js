/* ═══════════════════════════════════════════
   A3 STUDIO — JavaScript principal
   Navigation · Hamburger · Onglets · Scroll
   ═══════════════════════════════════════════ */

(function () {
  'use strict';

  /* --- Navigation scroll --- */
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });
  }

  /* --- Hamburger menu --- */
  const hamburger = document.querySelector('.nav__hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const overlay = document.querySelector('.mobile-overlay');

  function openMenu() {
    if (!hamburger || !mobileMenu || !overlay) return;
    hamburger.setAttribute('aria-expanded', 'true');
    mobileMenu.classList.add('active');
    overlay.classList.add('active');
    document.body.classList.add('menu-open');
  }

  function closeMenu() {
    if (!hamburger || !mobileMenu || !overlay) return;
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('active');
    overlay.classList.remove('active');
    document.body.classList.remove('menu-open');
  }

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      var expanded = this.getAttribute('aria-expanded') === 'true';
      expanded ? closeMenu() : openMenu();
    });
  }

  if (overlay) {
    overlay.addEventListener('click', closeMenu);
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
      closeMenu();
      hamburger.focus();
    }
  });

  // Close menu on link click
  if (mobileMenu) {
    var mobileLinks = mobileMenu.querySelectorAll('.mobile-menu__link');
    mobileLinks.forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
  }

  /* --- Onglets (tabs) --- */
  var tabContainer = document.querySelector('.tabs');
  if (tabContainer) {
    var tabButtons = tabContainer.querySelectorAll('.tabs__btn');
    var tabPanels = tabContainer.querySelectorAll('.tabs__panel');

    function activateTab(btn) {
      tabButtons.forEach(function (b) {
        b.setAttribute('aria-selected', 'false');
        b.setAttribute('tabindex', '-1');
      });
      tabPanels.forEach(function (p) {
        p.classList.remove('active');
      });

      btn.setAttribute('aria-selected', 'true');
      btn.setAttribute('tabindex', '0');
      btn.focus();

      var panelId = btn.getAttribute('aria-controls');
      var panel = document.getElementById(panelId);
      if (panel) {
        panel.classList.add('active');
      }
    }

    tabButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        activateTab(this);
      });
    });

    // Keyboard navigation
    tabContainer.querySelector('[role="tablist"]').addEventListener('keydown', function (e) {
      var index = Array.from(tabButtons).indexOf(document.activeElement);
      if (index === -1) return;

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        var next = (index + 1) % tabButtons.length;
        activateTab(tabButtons[next]);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        var prev = (index - 1 + tabButtons.length) % tabButtons.length;
        activateTab(tabButtons[prev]);
      }
    });
  }

  /* --- Tally form fallback --- */
  var tallyIframe = document.querySelector('.tally-iframe');
  var tallyFallback = document.querySelector('.form-fallback');

  if (tallyIframe && tallyFallback) {
    tallyIframe.addEventListener('load', function () {
      tallyFallback.style.display = 'none';
    });
  }

})();
