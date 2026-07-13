/* ManaHindu — bookmarks (బుక్‌మార్క్‌లు)
   A ☆ button on every content page. Saved pages live in the browser's
   own storage on that device — no account, no server, nothing sent anywhere.
   A 🔖 button in the header opens the saved list. */
(function () {
  'use strict';

  var KEY = 'mh_bookmarks';

  var ROOT = (function () {
    var s = document.currentScript;
    if (!s) {
      var all = document.getElementsByTagName('script');
      for (var i = all.length - 1; i >= 0; i--) {
        if ((all[i].src || '').indexOf('bookmarks.js') !== -1) { s = all[i]; break; }
      }
    }
    if (s) {
      var m = (s.getAttribute('src') || '').match(/^(.*?)assets\/js\/bookmarks\.js/);
      if (m) return m[1];
    }
    return '';
  })();

  function read() {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; }
    catch (e) { return []; }
  }
  function write(list) {
    try { localStorage.setItem(KEY, JSON.stringify(list)); } catch (e) {}
  }

  /* This page's identity — a site-relative path, so it works from any depth. */
  function pageId() {
    var p = location.pathname.replace(/^.*?(?=pages\/|index\.html|404\.html)/, '');
    return p || location.pathname;
  }

  function pageInfo() {
    var cfg = window.MHPage || {};
    var crumbs = cfg.breadcrumb || [];
    return {
      u: pageId(),
      t: cfg.title || document.title.replace(/\s*\|.*$/, ''),
      s: cfg.sub || '',
      c: crumbs.length > 2 ? crumbs[1].label : (crumbs.length ? crumbs[crumbs.length - 1].label : ''),
      d: Date.now()
    };
  }

  function isSaved() {
    var id = pageId();
    return read().some(function (b) { return b.u === id; });
  }

  function css() {
    if (document.getElementById('mh-bm-css')) return;
    var st = document.createElement('style');
    st.id = 'mh-bm-css';
    st.textContent = [
      /* header button */
      '.mh-bm-btn{background:none;border:1px solid rgba(212,175,55,0.45);color:#e8cf8a;',
      '  border-radius:20px;width:38px;height:38px;cursor:pointer;font-size:0.95rem;',
      '  display:flex;align-items:center;justify-content:center;flex:0 0 auto;',
      '  margin-right:8px;transition:background .2s;position:relative;}',
      '.mh-bm-btn:hover{background:rgba(212,175,55,0.18);}',
      '.mh-bm-count{position:absolute;top:-4px;right:-4px;background:#d4af37;color:#2a1810;',
      '  border-radius:9px;min-width:16px;height:16px;font-size:0.62rem;font-weight:700;',
      '  display:flex;align-items:center;justify-content:center;padding:0 3px;',
      '  font-family:"Poppins",sans-serif;}',

      /* save star on the page */
      '.mh-save{display:inline-flex;align-items:center;gap:7px;background:linear-gradient(135deg,#fff,#fdf6e8);',
      '  border:1px solid #ecd9a8;border-radius:22px;padding:8px 16px;cursor:pointer;',
      '  font-family:"Tiro Telugu",serif;font-size:0.88rem;color:#5a2e14;',
      '  transition:border-color .2s,transform .12s;}',
      '.mh-save:hover{border-color:#d4af37;}',
      '.mh-save:active{transform:scale(0.97);}',
      '.mh-save.on{background:linear-gradient(135deg,#e8cf8a,#d4af37);border-color:#d4af37;',
      '  color:#2a1810;font-weight:600;}',
      '.mh-save-bar{display:flex;justify-content:center;margin:0 0 14px;}',

      /* saved-list overlay */
      '.mh-bm-ov{position:fixed;inset:0;z-index:2000;background:rgba(8,6,12,0.88);',
      '  backdrop-filter:blur(6px);display:none;padding:66px 16px 20px;box-sizing:border-box;}',
      '.mh-bm-ov.on{display:block;}',
      '.mh-bm-box{max-width:620px;margin:0 auto;}',
      '.mh-bm-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;}',
      '.mh-bm-head h3{color:#e8cf8a;font-family:"Tiro Telugu",serif;font-weight:400;',
      '  font-size:1.2rem;margin:0;}',
      '.mh-bm-x{background:none;border:none;color:#e8cf8a;font-size:1.5rem;cursor:pointer;}',
      '.mh-bm-list{max-height:66vh;overflow-y:auto;}',
      '.mh-bm-row{display:flex;align-items:center;gap:10px;padding:12px 14px;border-radius:12px;',
      '  border:1px solid rgba(212,175,55,0.2);margin-bottom:7px;background:rgba(212,175,55,0.05);}',
      '.mh-bm-row a{flex:1;text-decoration:none;}',
      '.mh-bm-t{color:#e8cf8a;font-family:"Tiro Telugu",serif;font-size:0.98rem;}',
      '.mh-bm-c{color:#8a7f6e;font-size:0.74rem;margin-top:2px;}',
      '.mh-bm-del{background:none;border:none;color:#8a7f6e;font-size:1.1rem;cursor:pointer;',
      '  padding:4px 6px;border-radius:6px;}',
      '.mh-bm-del:hover{color:#c0392b;background:rgba(192,57,43,0.1);}',
      '.mh-bm-none{color:#8a7f6e;text-align:center;padding:34px 20px;',
      '  font-family:"Tiro Telugu",serif;line-height:1.9;}',
      '@media print{.mh-bm-btn,.mh-bm-ov,.mh-save-bar{display:none !important;}}'
    ].join('\n');
    document.head.appendChild(st);
  }

  function init() {
    css();

    /* ---- the saved-list overlay ---- */
    var ov = document.createElement('div');
    ov.className = 'mh-bm-ov';
    ov.innerHTML =
      '<div class="mh-bm-box">' +
      '<div class="mh-bm-head"><h3>🔖 సేవ్ చేసిన పేజీలు</h3>' +
      '<button class="mh-bm-x" aria-label="మూసివేయి">✕</button></div>' +
      '<div class="mh-bm-list"></div></div>';
    document.body.appendChild(ov);

    var list = ov.querySelector('.mh-bm-list');

    function renderList() {
      var bms = read().sort(function (a, b) { return b.d - a.d; });
      if (!bms.length) {
        list.innerHTML = '<div class="mh-bm-none">ఇంకా ఏ పేజీనీ సేవ్ చేయలేదు.<br/>' +
                         'ఏ పేజీలోనైనా <strong>☆ సేవ్ చేయండి</strong> నొక్కండి. 🙏</div>';
        return;
      }
      list.innerHTML = bms.map(function (b) {
        return '<div class="mh-bm-row" data-u="' + b.u + '">' +
               '<a href="' + ROOT + b.u + '">' +
               '<div class="mh-bm-t">' + b.t + '</div>' +
               (b.c ? '<div class="mh-bm-c">' + b.c + '</div>' : '') +
               '</a>' +
               '<button class="mh-bm-del" title="తొలగించు">🗑</button></div>';
      }).join('');

      var dels = list.querySelectorAll('.mh-bm-del');
      for (var i = 0; i < dels.length; i++) {
        dels[i].onclick = function () {
          var u = this.parentNode.getAttribute('data-u');
          write(read().filter(function (b) { return b.u !== u; }));
          renderList();
          refreshCount();
          refreshStar();
        };
      }
    }

    function open() { renderList(); ov.classList.add('on'); }
    function close() { ov.classList.remove('on'); }

    ov.querySelector('.mh-bm-x').onclick = close;
    ov.onclick = function (e) { if (e.target === ov) close(); };
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });

    /* ---- header button with a count badge ---- */
    var headBtn = null;
    function refreshCount() {
      if (!headBtn) return;
      var n = read().length;
      var badge = headBtn.querySelector('.mh-bm-count');
      if (n > 0) {
        if (!badge) {
          badge = document.createElement('span');
          badge.className = 'mh-bm-count';
          headBtn.appendChild(badge);
        }
        badge.textContent = n > 99 ? '99' : String(n);
      } else if (badge) {
        badge.parentNode.removeChild(badge);
      }
    }

    function placeHeaderButton() {
      var bar = document.querySelector('.header-inner');
      if (!bar || bar.querySelector('.mh-bm-btn')) return false;
      headBtn = document.createElement('button');
      headBtn.className = 'mh-bm-btn';
      headBtn.innerHTML = '🔖';
      headBtn.title = 'సేవ్ చేసిన పేజీలు';
      headBtn.setAttribute('aria-label', 'సేవ్ చేసిన పేజీలు');
      headBtn.onclick = open;
      var toggle = bar.querySelector('.sidebar-toggle');
      toggle ? bar.insertBefore(headBtn, toggle) : bar.appendChild(headBtn);
      refreshCount();
      return true;
    }

    /* ---- the save button on the page ---- */
    var star = null;
    function refreshStar() {
      if (!star) return;
      var on = isSaved();
      star.className = 'mh-save' + (on ? ' on' : '');
      star.innerHTML = on ? '★ సేవ్ చేయబడింది' : '☆ సేవ్ చేయండి';
    }

    function placeStar() {
      // only on real content pages
      if (!window.MHPage) return;
      if (!document.querySelector('.chapter-content, .article-body, .page-card')) return;
      var anchor = document.querySelector('.satakam-intro') ||
                   document.querySelector('.page-card') ||
                   document.querySelector('.article-body');
      if (!anchor || !anchor.parentNode || document.querySelector('.mh-save')) return;

      var bar = document.createElement('div');
      bar.className = 'mh-save-bar';
      star = document.createElement('button');
      star.className = 'mh-save';
      star.onclick = function () {
        var id = pageId();
        var bms = read();
        if (bms.some(function (b) { return b.u === id; })) {
          write(bms.filter(function (b) { return b.u !== id; }));
        } else {
          bms.push(pageInfo());
          write(bms);
        }
        refreshStar();
        refreshCount();
      };
      bar.appendChild(star);
      anchor.parentNode.insertBefore(bar, anchor.nextSibling);
      refreshStar();
    }

    // The header is injected at runtime, so poll briefly for it.
    var tries = 0;
    var t = setInterval(function () {
      var done = placeHeaderButton();
      placeStar();
      if ((done && star) || ++tries > 40) clearInterval(t);
    }, 50);
    placeHeaderButton();
    placeStar();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
