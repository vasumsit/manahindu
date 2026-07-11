/*!
 * ManaHindu — Shared Header/Footer (site-chrome)
 * Single source of truth for the site nav + footer.
 * Edit the menu HERE ONLY; all pages update automatically.
 *
 * How paths work:
 *   Every link in the templates below uses the {ROOT} token.
 *   This script figures out the correct relative path back to the site
 *   root by reading its OWN <script> tag's src, then swaps {ROOT} for it.
 *   Works from any folder depth, on file://, GitHub Pages, or Azure.
 *
 * Future-proofing:
 *   - Moving to Vue/Angular later? The HTML below becomes a component;
 *     the {ROOT} logic is replaced by the framework's router base.
 *   - Adding an Azure Web API backend? The static shell is untouched;
 *     dynamic bits (reactions, comments) already call their APIs separately.
 */
(function () {
  "use strict";

  // 1) Determine ROOT prefix from this script's own src.
  function computeRoot() {
    var el = document.currentScript;
    if (!el) {
      // Fallback for older browsers: find by filename.
      var list = document.getElementsByTagName('script');
      for (var i = 0; i < list.length; i++) {
        if (list[i].src && list[i].src.indexOf('site-chrome.js') !== -1) { el = list[i]; break; }
      }
    }
    if (!el || !el.getAttribute('src')) return '';
    var src = el.getAttribute('src');                 // e.g. ../../../assets/js/site-chrome.js
    var idx = src.indexOf('assets/js/site-chrome.js');
    return idx >= 0 ? src.substring(0, idx) : '';      // e.g. ../../../
  }

  var ROOT = computeRoot();

  // 2) Templates (root-relative via {ROOT} token).
  var HEADER = `
<style>
/* ── Master header — same look as the root home page ── */
.header{background:rgba(13,11,18,0.97)!important;border-bottom:1px solid rgba(212,175,55,0.2)!important;
  box-shadow:0 4px 20px rgba(0,0,0,0.3);position:sticky!important;top:0;z-index:500;}
.header .header-inner{display:flex!important;align-items:center!important;justify-content:space-between!important;
  flex-wrap:nowrap!important;padding:12px 20px!important;max-width:none!important;width:100%!important;margin:0!important;box-sizing:border-box;}
.header .logo{display:flex!important;flex-direction:row!important;align-items:center!important;gap:8px!important;
  text-decoration:none!important;margin:0!important;flex:0 0 auto;}
.header .logo-om{font-size:1.6rem!important;color:#d4af37!important;line-height:1!important;}
.header .logo-title{font-family:'Tiro Telugu',serif!important;font-size:1.15rem!important;color:#f4ecdd!important;
  font-weight:400!important;line-height:1.2!important;}
.header .sidebar-toggle{margin:0!important;flex:0 0 auto;display:inline-block!important;white-space:nowrap;
  background:linear-gradient(135deg,#e8cf8a,#d4af37)!important;color:#0d0b12!important;border:none!important;
  border-radius:22px!important;padding:9px 20px!important;font-family:'Tiro Telugu',serif!important;
  font-size:0.95rem!important;font-weight:600!important;cursor:pointer;}
.header .sidebar-toggle:active{transform:scale(0.96);}
</style>
<header class="header">
<div class="header-inner">
<a class="logo" href="{ROOT}index.html">
<span class="logo-om">ॐ</span><span class="logo-title">మన హిందూ</span>
</a>
<button class="sidebar-toggle" onclick="window.MHSidebar&&window.MHSidebar.open()" aria-label="మెను">☰ మెను</button>
</div>
</header>
<div class="sidebar-backdrop" id="mhSidebarBackdrop" onclick="window.MHSidebar&&window.MHSidebar.close()"></div>
<nav class="nav" id="mhSidebar">
<div class="sidebar-head"><span>🕉️ మెను</span><button class="sidebar-close" onclick="window.MHSidebar&&window.MHSidebar.close()" aria-label="మూసివేయి">✕</button></div>
<a href="{ROOT}index.html">🏠 హోమ్</a>
<a href="{ROOT}pages/sanatana-dharma/index.html">🕉️ సనాతన ధర్మం</a>
<a href="{ROOT}pages/hinduism/index.html">📖 హిందూమతం</a>
<a href="{ROOT}pages/temples/index.html">🛕 దేవాలయాలు</a>
<a href="{ROOT}pages/hinduism/puranas/index.html">📚 18 మహాపురాణాలు</a>
<a href="{ROOT}pages/festivals/index.html">🪔 పండుగలు</a>
<a href="{ROOT}pages/slokalu/index.html">📜 శ్లోకాలు</a>
<a href="{ROOT}pages/gallery/index.html">📸 ఫోటో గ్యాలరీ</a>
<a href="{ROOT}pages/news/index.html">📰 వార్తలు</a>
<a href="{ROOT}pages/vlogs/index.html">🎬 వ్లాగ్స్</a>
<a href="{ROOT}pages/about/index.html">🙏 మా గురించి</a>
</nav>`;



  var FOOTER = `<footer class="footer">
<div class="container footer-simple">
<div class="footer-om">ॐ</div>
<div class="footer-name">మన హిందూ · ManaHindu</div>
<div class="footer-nav">
<a href="{ROOT}pages/temples/index.html">దేవాలయాలు</a>
<a href="{ROOT}pages/hinduism/puranas/index.html">పురాణాలు</a>
<a href="{ROOT}pages/festivals/index.html">పండుగలు</a>
<a href="{ROOT}pages/slokalu/index.html">శ్లోకాలు</a>
<a href="{ROOT}pages/about/index.html">మా గురించి</a>
<a href="{ROOT}pages/contact/index.html">సంప్రదించండి</a>
<a href="{ROOT}pages/privacy/index.html">గోప్యత</a>
<a href="https://www.youtube.com/@Vasu11tv" target="_blank" rel="noopener">▶ YouTube</a>
</div>
<div class="footer-copy">© 2026 మన హిందూ — జై శ్రీ వేంకటేశ్వర 🙏</div>
<div class="footer-visits">👁️ సందర్శకులు: <strong id="mh-site-visits">…</strong></div>
</div>
</footer>`;


  function applyRoot(html) { return html.split('{ROOT}').join(ROOT); }

  // 3) Inject into placeholders.
  function inject() {
    var h = document.getElementById('site-header');
    var f = document.getElementById('site-footer');
    if (h) h.innerHTML = applyRoot(HEADER);
    if (f) f.innerHTML = applyRoot(FOOTER);
    buildHero();
    highlightActive();
    showSiteVisits();
    setupSidebar();
    // Re-bind the mobile hamburger + dropdown toggles if main.js exposes them.
    if (window.ManaHinduNav && typeof window.ManaHinduNav.bind === 'function') {
      try { window.ManaHinduNav.bind(); } catch (e) {}
    }
  }

  // 3b) MASTER HERO + BREADCRUMB — defined ONCE here, injected into every page.
  //     A page declares its data via window.MHPage or a #mh-hero placeholder's data-* attrs.
  //     This guarantees identical ribbon + breadcrumb position on every page.
  function buildHero() {
    var slot = document.getElementById('mh-hero');
    if (!slot) return;  // page opted out (e.g. splash home)
    var cfg = window.MHPage || {};
    // fallback to data-attributes
    var title = cfg.title || slot.getAttribute('data-title') || '';
    var sub   = cfg.sub   || slot.getAttribute('data-sub')   || '';
    var crumbs = cfg.breadcrumb || null;

    // Build breadcrumb HTML from array [{label, href}] (last item = current, no link)
    var bcHtml = '';
    if (crumbs && crumbs.length) {
      for (var i = 0; i < crumbs.length; i++) {
        var c = crumbs[i];
        if (i > 0) bcHtml += '<span>›</span>';
        if (c.href && i < crumbs.length - 1) {
          bcHtml += '<a href="' + applyRoot(c.href) + '">' + c.label + '</a>';
        } else {
          bcHtml += '<span class="bc-current">' + c.label + '</span>';
        }
      }
    }

    var heroHtml =
      '<div class="ribbon-band">' +
        '<span class="rb-om">ॐ</span>' +
        '<h1>' + title + '</h1>' +
        (sub ? '<p>' + sub + '</p>' : '') +
        '<div class="ribbon-deco"><span>❖</span></div>' +
      '</div>' +
      (bcHtml ? '<div class="row-bc">' + bcHtml + '</div>' : '');

    slot.innerHTML = heroHtml;
  }

  // 4) Highlight the link matching the current page.
  function highlightActive() {
    var here = window.location.pathname;
    // Look in the sidebar (it now lives outside <header>) plus the header itself.
    var links = document.querySelectorAll('#mhSidebar a[href], #site-header a[href]');
    var bestEl = null, bestLen = -1;
    for (var i = 0; i < links.length; i++) {
      var a = links[i];
      var path = a.pathname || '';
      if (!path) continue;
      // Section folder for this link, e.g. /pages/temples/
      var dir = path.replace(/[^/]*$/, '');
      var isHome = /\/index\.html$/.test(path) && dir.replace(/\/$/, '').split('/').filter(Boolean).length === 0;

      var match = false;
      if (isHome) {
        // Home only lights up on the actual root page.
        match = /(^|\/)index\.html$/.test(here) && here.split('/').filter(Boolean).length <= 1;
      } else {
        // Any page inside this section (including detail pages) counts.
        match = here.indexOf(dir) === 0;
      }
      if (match && dir.length > bestLen) { bestEl = a; bestLen = dir.length; }
    }
    if (bestEl) bestEl.classList.add('active');
  }

  // 5) Whole-site visitor total in the footer.
  //    Reads the shared JSONBin store and SUMS every page's visit count,
  //    so the site total always stays consistent with the per-page numbers
  //    (no separate counter to drift). Read-only here; per-page visits are
  //    recorded by temple-reactions.js on the content pages.
  var VISITS = {
    BIN_ID:  '6a3168a5da38895dfeca560b',
    API_KEY: '$2a$10$qKtXWnseApIuvvFkuCcYqeiGduPMLn3VKQnTyGYk1X5ZXlgLDPcYG',
    BASE_URL: 'https://api.jsonbin.io/v3/b'
  };
  function fmt(n) { return (n || 0).toLocaleString('en-IN'); }
  function showSiteVisits() {
    var el = document.getElementById('mh-site-visits');
    if (!el) return;
    fetch(VISITS.BASE_URL + '/' + VISITS.BIN_ID + '/latest', {
      headers: { 'X-Master-Key': VISITS.API_KEY }
    }).then(function (r) { return r.json(); }).then(function (json) {
      var rec = (json && json.record) || {};
      var reactions = rec.reactions || {};
      var total = 0;
      for (var k in reactions) {
        if (reactions.hasOwnProperty(k)) total += (reactions[k].visits || 0);
      }
      el.textContent = fmt(total);
    }).catch(function () {
      // Fallback: local backup if the API is unreachable.
      try {
        var d = JSON.parse(localStorage.getItem('mh_global_data') || '{"reactions":{}}');
        var t = 0, rr = d.reactions || {};
        for (var k in rr) { if (rr.hasOwnProperty(k)) t += (rr[k].visits || 0); }
        el.textContent = fmt(t);
      } catch (e) { el.textContent = '—'; }
    });
  }

  // 6) Sidebar: expandable slide-in menu, remembers open/closed state.
  function setupSidebar() {
    if (document.getElementById('mh-sidebar-css')) return afterCss();
    var css = document.createElement('style');
    css.id = 'mh-sidebar-css';
    css.textContent = [
      '.sidebar-backdrop{position:fixed;inset:0;z-index:900;background:rgba(0,0,0,0.6);backdrop-filter:blur(3px);opacity:0;visibility:hidden;transition:opacity .3s;}',
      'body.mh-sidebar-open .sidebar-backdrop{opacity:1;visibility:visible;}',
      'nav.nav#mhSidebar{display:flex !important;position:fixed !important;top:0;right:0;height:100%;width:min(320px,85vw);z-index:1000;flex-direction:column;gap:0;background:linear-gradient(180deg,#15121c,#0d0b12);border-left:1px solid rgba(212,175,55,0.25);padding:20px;overflow-y:auto;box-shadow:-10px 0 40px rgba(0,0,0,0.5);transform:translateX(100%);transition:transform .3s ease;}',
      'body.mh-sidebar-open nav.nav#mhSidebar{transform:translateX(0) !important;}',
      '.sidebar-head{display:flex;align-items:center;justify-content:space-between;padding-bottom:14px;margin-bottom:12px;border-bottom:1px solid rgba(212,175,55,0.2);color:#e8cf8a;font-family:\'Tiro Telugu\',serif;font-size:1.2rem;}',
      '.sidebar-close{background:none;border:none;color:#e8cf8a;font-size:1.4rem;cursor:pointer;width:36px;height:36px;border-radius:50%;transition:background .2s;}',
      '.sidebar-close:hover{background:rgba(212,175,55,0.15);}',
      'nav.nav#mhSidebar{align-items:stretch !important;text-align:left !important;}',
      'nav.nav#mhSidebar > a{display:block !important;width:100% !important;text-align:left !important;color:#f4ecdd;text-decoration:none;padding:13px 14px;border-radius:10px;font-size:1.05rem;margin-bottom:4px;font-family:\'Tiro Telugu\',serif;transition:background .2s,padding-left .2s;}',
      'nav.nav#mhSidebar > a:hover{background:rgba(212,175,55,0.14);color:#e8cf8a;padding-left:20px;}',
      'nav.nav#mhSidebar > a.active{background:linear-gradient(135deg,rgba(232,207,138,0.22),rgba(212,175,55,0.10)) !important;color:#e8cf8a !important;font-weight:600;border-left:3px solid #d4af37;padding-left:14px;}',
      '.sidebar-toggle{display:inline-block !important;}',
      '.hamburger{display:none !important;}',
      '@media(max-width:768px){nav.nav#mhSidebar{display:flex !important;}.sidebar-toggle{display:inline-block !important;}}'
    ].join('\n');
    document.head.appendChild(css);
    afterCss();

    function afterCss() {
      var backdrop = document.getElementById('mhSidebarBackdrop');
      var sidebar = document.getElementById('mhSidebar');
      if (!sidebar) return;

      window.MHSidebar = {
        open: function () { document.body.classList.add('mh-sidebar-open'); try{localStorage.setItem('mh_sidebar','open');}catch(e){} },
        close: function () { document.body.classList.remove('mh-sidebar-open'); try{localStorage.setItem('mh_sidebar','closed');}catch(e){} }
      };

      // Expand/collapse dropdown sections on tap (these do NOT navigate or close)
      var items = sidebar.querySelectorAll('.nav-item');
      for (var i = 0; i < items.length; i++) {
        (function (item) {
          var link = item.querySelector(':scope > a');
          var dd = item.querySelector(':scope > .dropdown');
          if (!link || !dd) return;
          link.setAttribute('data-section', '1');
          link.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            item.classList.toggle('expanded');
          });
        })(items[i]);
      }

      // Clicking any REAL link (not a section header) closes the sidebar
      var allLinks = sidebar.querySelectorAll('a[href]');
      for (var j = 0; j < allLinks.length; j++) {
        if (allLinks[j].getAttribute('data-section') === '1') continue;
        allLinks[j].addEventListener('click', function () { window.MHSidebar.close(); });
      }

      // Closed by default — exactly like the home page menu (opens only on ☰ tap).
      document.body.classList.remove('mh-sidebar-open');

      // Escape closes
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape') window.MHSidebar.close(); });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
