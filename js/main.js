/* ============================================================
   A3 STUDIO — main.js
   Navigation scroll · Hamburger · Onglets · Tally fallback
   ============================================================ */

(function () {
  'use strict';

  /* ── NAV SCROLL ── */
  const nav = document.querySelector('.site-nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });
  }

  /* ── HAMBURGER MENU ── */
  const hamburger   = document.querySelector('.nav-hamburger');
  const mobileMenu  = document.querySelector('.mobile-menu');
  const overlay     = document.querySelector('.mobile-overlay');

  function openMenu() {
    mobileMenu?.classList.add('open');
    overlay?.classList.add('open');
    document.body.style.overflow = 'hidden';
    hamburger?.classList.add('open');
    hamburger?.setAttribute('aria-expanded', 'true');
  }
  function closeMenu() {
    mobileMenu?.classList.remove('open');
    overlay?.classList.remove('open');
    document.body.style.overflow = '';
    hamburger?.classList.remove('open');
    hamburger?.setAttribute('aria-expanded', 'false');
  }

  hamburger?.addEventListener('click', () => {
    const isOpen = mobileMenu?.classList.contains('open');
    isOpen ? closeMenu() : openMenu();
  });
  overlay?.addEventListener('click', closeMenu);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });
  document.querySelectorAll('.mobile-nav-link').forEach(l => {
    l.addEventListener('click', closeMenu);
  });

  /* ── ONGLETS (tabs) ── */
  function initTabs(container) {
    const btns   = container.querySelectorAll('.tab-btn');
    const panels = container.querySelectorAll('.tab-panel');

    function activate(idx) {
      btns.forEach((b, i) => {
        const active = i === idx;
        b.classList.toggle('active', active);
        b.setAttribute('aria-selected', active);
        b.setAttribute('tabindex', active ? '0' : '-1');
      });
      panels.forEach((p, i) => {
        p.classList.toggle('active', i === idx);
      });
    }

    btns.forEach((btn, i) => {
      btn.addEventListener('click', () => activate(i));
      btn.addEventListener('keydown', e => {
        if (e.key === 'ArrowRight') { e.preventDefault(); activate((i + 1) % btns.length); btns[(i + 1) % btns.length].focus(); }
        if (e.key === 'ArrowLeft')  { e.preventDefault(); activate((i - 1 + btns.length) % btns.length); btns[(i - 1 + btns.length) % btns.length].focus(); }
      });
    });
  }

  document.querySelectorAll('[data-tabs]').forEach(initTabs);

  /* ── ACTIVE NAV LINK (page courante) ── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link[href], .mobile-nav-link[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ── TALLY FALLBACK ── */
  document.querySelectorAll('iframe[data-tally]').forEach(iframe => {
    const fallback = iframe.nextElementSibling;
    if (fallback && fallback.classList.contains('tally-fallback')) {
      iframe.addEventListener('load', () => { fallback.style.display = 'none'; });
      setTimeout(() => {
        if (iframe.offsetHeight < 50) fallback.style.display = 'block';
      }, 3000);
    }
  });

  /* ── HOVER APPROCHE — "En savoir plus" ── */
  document.querySelectorAll('.app-card').forEach(card => {
    const more = card.querySelector('.app-card-more');
    if (!more) return;
    card.addEventListener('mouseenter', () => { more.style.opacity = '1'; });
    card.addEventListener('mouseleave', () => { more.style.opacity = '0'; });
  });

})();
