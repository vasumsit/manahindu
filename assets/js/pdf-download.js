/* ManaHindu — PDF / Print download for sloka pages
   Adds a "PDF డౌన్‌లోడ్" button. On click it reveals every verse
   (they are normally paginated), applies print styles, and opens the
   browser's print dialog — where the user chooses "Save as PDF".
   Works on desktop and mobile. No server needed. */
(function () {
  'use strict';

  function injectPrintCss() {
    if (document.getElementById('mh-print-css')) return;
    var st = document.createElement('style');
    st.id = 'mh-print-css';
    st.textContent = [
      /* Button */
      '.mh-pdf-btn{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,#e8cf8a,#d4af37);',
      'color:#2a1810;border:none;border-radius:24px;padding:11px 22px;font-family:"Tiro Telugu",serif;',
      'font-size:0.95rem;font-weight:600;cursor:pointer;box-shadow:0 4px 14px rgba(212,175,55,0.3);',
      'transition:transform .15s;margin:0 auto 1.4rem;}',
      '.mh-pdf-btn:hover{filter:brightness(1.06);}',
      '.mh-pdf-btn:active{transform:scale(0.97);}',
      '.mh-pdf-wrap{display:flex;justify-content:center;}',

      /* While printing: show ALL verses, hide site chrome */
      '@media print{',
      '  #site-header,#site-footer,#mh-hero,.row-bc,.chapter-nav,.mh-pdf-wrap,',
      '  .side-nav,#mh-reactions,#mh-comments,.mh-share-container,',
      '  .topbar,.sidebar-backdrop,nav.nav{display:none !important;}',
      '  .chapter-section{display:block !important;page-break-inside:auto;}',
      '  .life-story-layout{display:block !important;}',
      '  .chapter-content{display:block !important;width:100% !important;}',
      '  .padyam-card{page-break-inside:avoid;break-inside:avoid;border:1px solid #ddd !important;',
      '    box-shadow:none !important;margin-bottom:12px !important;}',
      '  body{background:#fff !important;color:#000 !important;}',
      '  .container{max-width:100% !important;padding:0 !important;}',
      '  .satakam-intro{border:none !important;box-shadow:none !important;}',
      '  a[href]:after{content:"";}',           /* don't print URLs */
      '  .mh-print-title{display:block !important;text-align:center;margin-bottom:14px;}',
      '}',
      '.mh-print-title{display:none;}'
    ].join('\n');
    document.head.appendChild(st);
  }

  function pageTitle() {
    var cfg = window.MHPage || {};
    return (cfg.title || document.title || '').replace(/\s*\|\s*.*$/, '');
  }

  function doPrint() {
    // Reveal every paginated section so the PDF contains all verses.
    var hidden = [];
    var secs = document.querySelectorAll('.chapter-section');
    for (var i = 0; i < secs.length; i++) {
      if (!secs[i].classList.contains('active')) {
        secs[i].classList.add('active');
        hidden.push(secs[i]);
      }
    }
    window.print();
    // Restore pagination afterwards.
    setTimeout(function () {
      for (var j = 0; j < hidden.length; j++) hidden[j].classList.remove('active');
    }, 500);
  }

  function init() {
    // Only on pages that actually have verses.
    if (!document.querySelector('.padyam-card')) return;
    injectPrintCss();

    // Heading shown only in the printed PDF.
    var intro = document.querySelector('.satakam-intro');
    if (intro && !document.querySelector('.mh-print-title')) {
      var h = document.createElement('h1');
      h.className = 'mh-print-title';
      h.textContent = pageTitle();
      intro.parentNode.insertBefore(h, intro);
    }

    var wrap = document.createElement('div');
    wrap.className = 'mh-pdf-wrap';
    var btn = document.createElement('button');
    btn.className = 'mh-pdf-btn';
    btn.innerHTML = '📄 PDF డౌన్‌లోడ్ / ప్రింట్';
    btn.title = 'అన్ని శ్లోకాలను PDFగా సేవ్ చేసుకోండి';
    btn.onclick = doPrint;
    wrap.appendChild(btn);

    if (intro && intro.parentNode) {
      intro.parentNode.insertBefore(wrap, intro.nextSibling);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
