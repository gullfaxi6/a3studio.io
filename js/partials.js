/* ============================================================
   A3 STUDIO — partials.js
   Navigation et Footer partagés
   Injecter via : document.getElementById('nav-placeholder').innerHTML = NAV_HTML;
   ============================================================ */

const NAV_HTML = `
<!-- ═══════════════════════════════════════════
     NAVIGATION — identique sur toutes les pages
     ═══════════════════════════════════════════ -->
<a href="#main" class="skip-nav">Aller au contenu</a>

<!-- TICKER -->
<div class="ticker" aria-hidden="true">
  <div class="ticker-track">
    <div class="ticker-item"><div class="ticker-dot"></div><strong>SCAN TO BIM</strong>&nbsp;·&nbsp;Relevé laser · LOD 200 → 400 · Livraison 15 jours</div>
    <div class="ticker-item"><div class="ticker-dot"></div><strong>OFFRE</strong>&nbsp;·&nbsp;Devis gratuit sous 48h · contact@a3studio.fr</div>
    <div class="ticker-item"><div class="ticker-dot"></div><strong>STANDARD</strong>&nbsp;·&nbsp;IFC 4 · ISO 19650 · Revit · Paris, France</div>
    <div class="ticker-item"><div class="ticker-dot"></div><strong>EXPERTISE</strong>&nbsp;·&nbsp;Architecte HMONP · BIM Manager depuis 2012</div>
    <div class="ticker-item"><div class="ticker-dot"></div><strong>SCAN TO BIM</strong>&nbsp;·&nbsp;Relevé laser · LOD 200 → 400 · Livraison 15 jours</div>
    <div class="ticker-item"><div class="ticker-dot"></div><strong>OFFRE</strong>&nbsp;·&nbsp;Devis gratuit sous 48h · contact@a3studio.fr</div>
    <div class="ticker-item"><div class="ticker-dot"></div><strong>STANDARD</strong>&nbsp;·&nbsp;IFC 4 · ISO 19650 · Revit · Paris, France</div>
    <div class="ticker-item"><div class="ticker-dot"></div><strong>EXPERTISE</strong>&nbsp;·&nbsp;Architecte HMONP · BIM Manager depuis 2012</div>
  </div>
</div>

<!-- NAV -->
<nav class="site-nav" role="banner" aria-label="Navigation principale">
  <a href="index.html" class="nav-logo" aria-label="A3 Studio — Accueil">A3<span> STUDIO</span></a>
  <div class="nav-links" role="navigation">
    <a href="realisations.html" class="nav-link">Projets</a>
    <a href="offres.html"       class="nav-link">Expertise</a>
    <a href="apropos.html"      class="nav-link">À propos</a>
    <a href="contact.html"      class="nav-link">Contact</a>
    <a href="contact.html"      class="btn-p" style="margin-left:8px">Déposer un brief →</a>
  </div>
  <button class="nav-hamburger" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="mobile-menu">
    <span></span><span></span><span></span>
  </button>
</nav>

<!-- MENU MOBILE -->
<div class="mobile-overlay" aria-hidden="true"></div>
<div class="mobile-menu" id="mobile-menu" role="dialog" aria-label="Menu de navigation">
  <a href="realisations.html" class="mobile-nav-link">Projets</a>
  <a href="offres.html"       class="mobile-nav-link">Expertise</a>
  <a href="apropos.html"      class="mobile-nav-link">À propos</a>
  <a href="contact.html"      class="mobile-nav-link">Contact</a>
  <a href="contact.html"      class="btn-p" style="margin-top:32px;justify-content:center">Déposer un brief →</a>
</div>
`;

const FOOTER_HTML = `
<!-- ═══════════════════════════════════════════
     FOOTER — identique sur toutes les pages
     ═══════════════════════════════════════════ -->
<footer class="site-footer" role="contentinfo">
  <div class="footer-inner">
    <div class="footer-top">
      <div>
        <div class="footer-logo">A3<span> STUDIO</span></div>
        <p class="footer-tagline">Agence d'architecture augmentée — Scan-to-BIM · BIM avancé · Paris</p>
        <div class="footer-contact-info">
          <a href="mailto:contact@a3studio.fr">contact@a3studio.fr</a>
          <a href="#" target="_blank" rel="noopener"><!-- [LINKEDIN URL] -->LinkedIn · A3 Studio</a>
        </div>
      </div>
      <div>
        <div class="footer-col-title">Navigation</div>
        <nav class="footer-links" aria-label="Navigation footer">
          <a href="index.html">Accueil</a>
          <a href="realisations.html">Projets</a>
          <a href="offres.html">Expertise</a>
          <a href="apropos.html">À propos</a>
        </nav>
      </div>
      <div>
        <div class="footer-col-title">Prestations</div>
        <nav class="footer-links" aria-label="Prestations footer">
          <a href="offres.html#scan-to-bim">Scan to BIM</a>
          <a href="offres.html#bim-management">BIM Management</a>
          <a href="offres.html#audit">Audit &amp; Conseil</a>
          <a href="contact.html">Devis gratuit</a>
        </nav>
      </div>
      <div>
        <div class="footer-col-title">Légal</div>
        <nav class="footer-links" aria-label="Liens légaux footer">
          <a href="mentions.html">Mentions légales</a>
          <a href="mentions.html#rgpd">Politique RGPD</a>
          <a href="sitemap.xml">Sitemap</a>
        </nav>
      </div>
    </div>
    <div class="footer-bottom">
      <p class="footer-copy">© 2025 A3 Studio — Tous droits réservés · SASU · Paris, France</p>
      <div class="footer-stack" aria-label="Technologies maîtrisées">
        <span class="footer-stack-item">Revit</span>
        <span class="footer-stack-sep">·</span>
        <span class="footer-stack-item">IFC 4</span>
        <span class="footer-stack-sep">·</span>
        <span class="footer-stack-item">ISO 19650</span>
        <span class="footer-stack-sep">·</span>
        <span class="footer-stack-item">Scan-to-BIM</span>
      </div>
    </div>
  </div>
</footer>
`;

/* Auto-inject si placeholders présents */
document.addEventListener('DOMContentLoaded', () => {
  const navPh = document.getElementById('nav-placeholder');
  if (navPh) navPh.outerHTML = NAV_HTML;

  const footPh = document.getElementById('footer-placeholder');
  if (footPh) footPh.outerHTML = FOOTER_HTML;
});
