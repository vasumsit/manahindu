/* ManaHindu — site search
   A search box in the header that finds any page instantly.
   The index is built at load from a small JSON file, so it works
   on GitHub Pages with no server. Telugu-aware, forgiving of typos. */
(function () {
  'use strict';

  var INDEX = null;
  var loading = false;

  function root() {
    // Work out the path back to site root from the current page.
    var s = document.querySelector('script[src*="site-search.js"]');
    if (s) {
      var m = s.getAttribute('src').match(/^(.*?)assets\/js\/site-search\.js/);
      if (m) return m[1];
    }
    var depth = location.pathname.split('/').filter(Boolean).length - 1;
    return depth > 0 ? new Array(depth + 1).join('../') : '';
  }

  function css() {
    if (document.getElementById('mh-search-css')) return;
    var st = document.createElement('style');
    st.id = 'mh-search-css';
    st.textContent = [
      /* the button that opens search */
      '.mh-search-btn{background:none;border:1px solid rgba(212,175,55,0.45);color:#e8cf8a;',
      '  border-radius:20px;width:38px;height:38px;cursor:pointer;font-size:1rem;',
      '  display:flex;align-items:center;justify-content:center;flex:0 0 auto;',
      '  margin-right:10px;transition:background .2s;}',
      '.mh-search-btn:hover{background:rgba(212,175,55,0.18);}',

      /* overlay */
      '.mh-search-ov{position:fixed;inset:0;z-index:2000;background:rgba(8,6,12,0.88);',
      '  backdrop-filter:blur(6px);display:none;padding:70px 16px 20px;box-sizing:border-box;}',
      '.mh-search-ov.on{display:block;}',
      '.mh-search-box{max-width:640px;margin:0 auto;}',
      '.mh-search-in{width:100%;box-sizing:border-box;padding:16px 18px;font-size:1.05rem;',
      '  font-family:"Tiro Telugu",serif;border-radius:14px;border:1px solid rgba(212,175,55,0.5);',
      '  background:#15121c;color:#f4ecdd;outline:none;}',
      '.mh-search-in::placeholder{color:#8a7f6e;}',
      '.mh-search-in:focus{border-color:#d4af37;box-shadow:0 0 0 3px rgba(212,175,55,0.15);}',
      '.mh-search-hint{color:#8a7f6e;font-size:0.78rem;margin:10px 2px;font-family:"Tiro Telugu",serif;}',

      '.mh-search-res{margin-top:6px;max-height:60vh;overflow-y:auto;}',
      '.mh-hit{display:block;padding:12px 14px;border-radius:12px;text-decoration:none;',
      '  border:1px solid transparent;margin-bottom:6px;transition:background .15s;}',
      '.mh-hit:hover,.mh-hit.sel{background:rgba(212,175,55,0.13);border-color:rgba(212,175,55,0.35);}',
      '.mh-hit-t{color:#e8cf8a;font-family:"Tiro Telugu",serif;font-size:1rem;}',
      '.mh-hit-s{color:#a89f8e;font-size:0.8rem;margin-top:2px;}',
      '.mh-hit-c{color:#8a7f6e;font-size:0.72rem;margin-top:3px;}',
      '.mh-search-none{color:#8a7f6e;text-align:center;padding:26px;font-family:"Tiro Telugu",serif;}',

      '.mh-search-x{position:absolute;top:16px;right:18px;background:none;border:none;',
      '  color:#e8cf8a;font-size:1.6rem;cursor:pointer;}',
      '@media print{.mh-search-btn,.mh-search-ov{display:none !important;}}'
    ].join('\n');
    document.head.appendChild(st);
  }

  /* Substring match only. Fuzzy scatter-matching produced nonsense
     (searching "narmada" surfaced temples), so we require the query to
     appear as a real substring. Earlier position = stronger match. */
  function score(q, text) {
    if (!q || !text) return 0;
    var t = text.toLowerCase();
    q = q.toLowerCase().trim();

    var at = t.indexOf(q);
    if (at !== -1) {
      var s = 100 - Math.min(at, 60) * 0.5;
      if (at === 0 || /[\s·—,(]/.test(t[at - 1])) s += 25;   // word start
      return s;
    }

    // Stem fallback: Telugu words take suffixes (మంగళసూత్రం vs మంగళసూత్ర).
    // Try the query minus its last 1-2 characters, but only if it stays long.
    if (q.length >= 6) {
      for (var cut = 1; cut <= 2; cut++) {
        var stem = q.slice(0, q.length - cut);
        if (stem.length >= 5 && t.indexOf(stem) !== -1) {
          return 55 - cut * 5;                                  // weaker than a true hit
        }
      }
    }
    return 0;
  }

  function search(q) {
    if (!INDEX || !q.trim()) return [];
    var out = [];
    for (var i = 0; i < INDEX.length; i++) {
      var p = INDEX[i];
      var s = Math.max(
        score(q, p.t) * 3,                 // title matters most
        score(q, p.s || '') * 1.5,         // subtitle
        score(q, p.k || '') * 1            // keywords
      );
      if (s > 0) out.push({ p: p, s: s });
    }
    out.sort(function (a, b) { return b.s - a.s; });
    return out.slice(0, 12).map(function (x) { return x.p; });
  }

  function load(cb) {
    if (INDEX) { cb(); return; }
    if (loading) return;
    loading = true;
    var x = new XMLHttpRequest();
    x.open('GET', root() + 'assets/search-index.json', true);
    x.onload = function () {
      try { INDEX = JSON.parse(x.responseText); } catch (e) { INDEX = []; }
      loading = false;
      cb();
    };
    x.onerror = function () { INDEX = []; loading = false; cb(); };
    x.send();
  }

  function init() {
    css();

    // overlay
    var ov = document.createElement('div');
    ov.className = 'mh-search-ov';
    ov.innerHTML =
      '<button class="mh-search-x" aria-label="మూసివేయి">✕</button>' +
      '<div class="mh-search-box">' +
      '<input class="mh-search-in" type="search" placeholder="వెతకండి — దేవాలయం, శ్లోకం, పండుగ…" aria-label="వెతకండి"/>' +
      '<div class="mh-search-hint">↑ ↓ కదలండి · Enter తెరవండి · Esc మూసివేయండి</div>' +
      '<div class="mh-search-res"></div>' +
      '</div>';
    document.body.appendChild(ov);

    var input = ov.querySelector('.mh-search-in');
    var res = ov.querySelector('.mh-search-res');
    var sel = -1, hits = [];

    function render(list) {
      hits = list; sel = -1;
      if (!input.value.trim()) { res.innerHTML = ''; return; }
      if (!list.length) {
        res.innerHTML = '<div class="mh-search-none">ఏమీ దొరకలేదు 🙏</div>';
        return;
      }
      res.innerHTML = list.map(function (p) {
        return '<a class="mh-hit" href="' + root() + p.u + '">' +
               '<div class="mh-hit-t">' + p.t + '</div>' +
               (p.s ? '<div class="mh-hit-s">' + p.s + '</div>' : '') +
               (p.c ? '<div class="mh-hit-c">' + p.c + '</div>' : '') +
               '</a>';
      }).join('');
    }

    function highlight() {
      var els = res.querySelectorAll('.mh-hit');
      for (var i = 0; i < els.length; i++) {
        els[i].className = 'mh-hit' + (i === sel ? ' sel' : '');
      }
      if (sel >= 0 && els[sel]) els[sel].scrollIntoView({ block: 'nearest' });
    }

    function open() {
      load(function () {
        ov.classList.add('on');
        input.value = '';
        res.innerHTML = '';
        setTimeout(function () { input.focus(); }, 40);
      });
    }
    function close() { ov.classList.remove('on'); }

    input.oninput = function () { render(search(input.value)); };

    input.onkeydown = function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); sel = Math.min(sel + 1, hits.length - 1); highlight(); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); sel = Math.max(sel - 1, 0); highlight(); }
      else if (e.key === 'Enter' && sel >= 0 && hits[sel]) { location.href = root() + hits[sel].u; }
      else if (e.key === 'Escape') { close(); }
    };

    ov.querySelector('.mh-search-x').onclick = close;
    ov.onclick = function (e) { if (e.target === ov) close(); };

    document.addEventListener('keydown', function (e) {
      // "/" opens search, Esc closes
      if (e.key === '/' && !/input|textarea/i.test((e.target.tagName || ''))) {
        e.preventDefault(); open();
      } else if (e.key === 'Escape') close();
    });

    // Put the search button in the header, left of the menu button.
    function placeButton() {
      var bar = document.querySelector('.header-inner');
      if (!bar || bar.querySelector('.mh-search-btn')) return false;
      var btn = document.createElement('button');
      btn.className = 'mh-search-btn';
      btn.innerHTML = '🔍';
      btn.title = 'వెతకండి (/)';
      btn.setAttribute('aria-label', 'వెతకండి');
      btn.onclick = open;
      var toggle = bar.querySelector('.sidebar-toggle');
      toggle ? bar.insertBefore(btn, toggle) : bar.appendChild(btn);
      return true;
    }

    // The header is injected by site-chrome.js, so wait for it.
    if (!placeButton()) {
      var tries = 0;
      var t = setInterval(function () {
        if (placeButton() || ++tries > 40) clearInterval(t);
      }, 50);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
