/* ManaHindu — reader font size control (A− / A / A+)
   Scales ONLY the reading text (paragraphs, verses, meanings).
   Deliberately does NOT touch headers, menu, cards or layout,
   so it cannot break the page. Choice is remembered per device. */
(function () {
  'use strict';

  var KEY = 'mh_font_scale';
  var MIN = 0.85, MAX = 1.45, STEP = 0.1, DEFAULT = 1;

  function clamp(v) { return Math.min(MAX, Math.max(MIN, Math.round(v * 100) / 100)); }

  function load() {
    try {
      var v = parseFloat(localStorage.getItem(KEY));
      return isNaN(v) ? DEFAULT : clamp(v);
    } catch (e) { return DEFAULT; }
  }

  function save(v) {
    try { localStorage.setItem(KEY, String(v)); } catch (e) {}
  }

  function injectCss() {
    if (document.getElementById('mh-font-css')) return;
    var st = document.createElement('style');
    st.id = 'mh-font-css';
    st.textContent = [
      /* Scale only reading text — never headings, nav or chrome */
      '.chapter-content p,.chapter-content li,.article-body p,.article-body li,',
      '.padyam-text,.padyam-meaning,.satakam-intro p,.chapter-section p,',
      '.info-box p,.source-note{font-size:calc(1em * var(--mh-fs,1)) !important;}',

      /* Control widget */
      '.mh-fs{display:flex;align-items:center;gap:6px;justify-content:center;margin:0 0 1.2rem;}',
      '.mh-fs-btn{width:34px;height:34px;border-radius:50%;border:1px solid #ecd9a8;',
      'background:linear-gradient(135deg,#fff,#fdf6e8);color:#5a2e14;cursor:pointer;',
      'font-family:"Poppins",sans-serif;font-weight:600;line-height:1;',
      'display:flex;align-items:center;justify-content:center;transition:transform .12s;}',
      '.mh-fs-btn:hover{border-color:#d4af37;}',
      '.mh-fs-btn:active{transform:scale(0.93);}',
      '.mh-fs-btn[disabled]{opacity:0.35;cursor:default;}',
      '.mh-fs-sm{font-size:0.78rem;}',
      '.mh-fs-lg{font-size:1.12rem;}',
      '.mh-fs-lbl{font-family:"Tiro Telugu",serif;font-size:0.8rem;color:#8a7f6e;margin-right:4px;}',
      '.mh-fs-val{font-family:"Poppins",sans-serif;font-size:0.72rem;color:#a8862a;min-width:34px;text-align:center;}',
      '@media print{.mh-fs{display:none !important;}}'
    ].join('\n');
    document.head.appendChild(st);
  }

  function apply(v) {
    document.documentElement.style.setProperty('--mh-fs', v);
  }

  function init() {
    // Only on pages with actual reading content.
    var anchor = document.querySelector('.satakam-intro') ||
                 document.querySelector('.chapter-content') ||
                 document.querySelector('.article-body');
    if (!anchor) return;

    injectCss();

    var scale = load();
    apply(scale);

    var wrap = document.createElement('div');
    wrap.className = 'mh-fs';

    var lbl = document.createElement('span');
    lbl.className = 'mh-fs-lbl';
    lbl.textContent = 'అక్షర పరిమాణం';

    var minus = document.createElement('button');
    minus.className = 'mh-fs-btn mh-fs-sm';
    minus.textContent = 'A−';
    minus.title = 'చిన్నది';

    var val = document.createElement('span');
    val.className = 'mh-fs-val';

    var plus = document.createElement('button');
    plus.className = 'mh-fs-btn mh-fs-lg';
    plus.textContent = 'A+';
    plus.title = 'పెద్దది';

    var reset = document.createElement('button');
    reset.className = 'mh-fs-btn';
    reset.textContent = '↺';
    reset.title = 'మామూలు';
    reset.style.fontSize = '0.9rem';

    function refresh() {
      val.textContent = Math.round(scale * 100) + '%';
      minus.disabled = scale <= MIN;
      plus.disabled = scale >= MAX;
    }

    minus.onclick = function () { scale = clamp(scale - STEP); apply(scale); save(scale); refresh(); };
    plus.onclick  = function () { scale = clamp(scale + STEP); apply(scale); save(scale); refresh(); };
    reset.onclick = function () { scale = DEFAULT; apply(scale); save(scale); refresh(); };

    refresh();

    wrap.appendChild(lbl);
    wrap.appendChild(minus);
    wrap.appendChild(val);
    wrap.appendChild(plus);
    wrap.appendChild(reset);

    if (anchor.parentNode) {
      anchor.parentNode.insertBefore(wrap, anchor.nextSibling);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
