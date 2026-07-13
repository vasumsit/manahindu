/* ManaHindu — animated home cards
   Gives each doorway card a living visual:
     • photos  → auto cross-fading real photographs
     • story   → auto-advancing story lines (Ramayana / Mahabharata)
     • motion  → an animated gold motif (for sections with no photos)
   Config comes from window.MHCards, keyed by the card's href.
   Pauses when off-screen, and respects prefers-reduced-motion. */
(function () {
  'use strict';

  var reduce = false;
  try {
    reduce = window.matchMedia &&
             window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch (e) {}

  function css() {
    if (document.getElementById('mh-cards-css')) return;
    var st = document.createElement('style');
    st.id = 'mh-cards-css';
    st.textContent = [
      '.door{position:relative;overflow:hidden;}',

      /* photo stage sits behind the card's text */
      '.mh-stage{position:absolute;inset:0;z-index:0;overflow:hidden;border-radius:inherit;}',
      '.mh-stage img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;',
      '  opacity:0;transform:scale(1.14);filter:saturate(1.05);',
      '  transition:opacity 1.8s ease-in-out, transform 9s ease-out;}',
      '.mh-stage img.on{opacity:0.5;transform:scale(1.01);}',
      /* warm veil — keeps Telugu crisp, keeps the gold feeling */
      '.mh-stage:after{content:"";position:absolute;inset:0;',
      '  background:linear-gradient(175deg,rgba(20,12,8,0.42) 0%,rgba(13,11,18,0.80) 55%,rgba(13,11,18,0.94) 100%);}',
      /* faint gold wash so photos sit in the site palette */
      '.mh-stage:before{content:"";position:absolute;inset:0;z-index:1;',
      '  background:radial-gradient(circle at 70% 20%,rgba(212,175,55,0.14),transparent 60%);}',
      '.door:hover .mh-stage img.on{opacity:0.62;}',
      '.door > *:not(.mh-stage){position:relative;z-index:1;}',

      /* story line that swaps in and out */
      '.mh-story-line{display:block;margin-top:10px;min-height:3em;',
      '  color:#e8cf8a;font-family:"Tiro Telugu",serif;font-size:1rem;line-height:1.75;',
      '  opacity:0;transform:translateX(14px);transition:opacity .5s ease, transform .5s ease;}',
      '.mh-story-line.on{opacity:1;transform:translateX(0);}',
      '.mh-dots{display:flex;gap:4px;margin-top:8px;}',
      '.mh-dots i{width:14px;height:3px;border-radius:2px;background:rgba(212,175,55,0.25);',
      '  transition:background .3s;}',
      '.mh-dots i.on{background:#d4af37;}',

      /* motion motif for photo-less sections */
      '.mh-motif{position:absolute;right:-10px;bottom:-14px;font-size:5.2rem;',
      '  color:rgba(212,175,55,0.10);pointer-events:none;z-index:0;',
      '  animation:mhFloat 7s ease-in-out infinite;}',
      '@keyframes mhFloat{0%,100%{transform:translateY(0) rotate(0deg);}',
      '  50%{transform:translateY(-9px) rotate(-4deg);}}',
      '.mh-sheen{position:absolute;inset:0;z-index:0;pointer-events:none;border-radius:inherit;',
      '  background:linear-gradient(115deg,transparent 30%,rgba(212,175,55,0.12) 48%,transparent 62%);',
      '  background-size:250% 100%;animation:mhSheen 5.5s linear infinite;}',
      '@keyframes mhSheen{0%{background-position:180% 0}100%{background-position:-80% 0}}',

      '@media(prefers-reduced-motion:reduce){',
      '  .mh-stage img,.mh-motif,.mh-sheen{animation:none !important;transition:none !important;}',
      '}'
    ].join('\n');
    document.head.appendChild(st);
  }

  /* Only run the timer while the card is actually on screen. */
  function whileVisible(el, tick, ms) {
    var timer = null;
    function start() { if (!timer) timer = setInterval(tick, ms); }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }
    if (typeof IntersectionObserver === 'function') {
      new IntersectionObserver(function (es) {
        es[0].isIntersecting ? start() : stop();
      }, { threshold: 0.1 }).observe(el);
    } else {
      start();
    }
  }

  function photos(card, list) {
    if (!list || !list.length) return;
    var stage = document.createElement('div');
    stage.className = 'mh-stage';
    var imgs = [];
    list.forEach(function (src, i) {
      var im = document.createElement('img');
      im.src = src;
      im.alt = '';
      im.loading = 'lazy';
      if (i === 0) im.classList.add('on');
      stage.appendChild(im);
      imgs.push(im);
    });
    card.insertBefore(stage, card.firstChild);
    if (reduce || imgs.length < 2) return;

    var i = 0;
    whileVisible(card, function () {
      imgs[i].classList.remove('on');
      i = (i + 1) % imgs.length;
      imgs[i].classList.add('on');
    }, 4500);
  }

  function story(card, lines) {
    if (!lines || !lines.length) return;
    var line = document.createElement('span');
    line.className = 'mh-story-line';
    line.classList.add('on');
    line.innerHTML = lines[0];

    var dots = document.createElement('div');
    dots.className = 'mh-dots';
    var pips = lines.map(function (_, k) {
      var d = document.createElement('i');
      if (k === 0) d.classList.add('on');
      dots.appendChild(d);
      return d;
    });

    var go = card.querySelector('.go');
    if (go) { card.insertBefore(line, go); card.insertBefore(dots, go); }
    else { card.appendChild(line); card.appendChild(dots); }

    if (reduce || lines.length < 2) return;

    var i = 0;
    whileVisible(card, function () {
      line.classList.remove('on');
      setTimeout(function () {
        i = (i + 1) % lines.length;
        line.innerHTML = lines[i];
        line.classList.add('on');
        pips.forEach(function (p, k) { k === i ? p.classList.add('on') : p.classList.remove('on'); });
      }, 380);
    }, 3800);
  }

  function motion(card, glyph) {
    var m = document.createElement('div');
    m.className = 'mh-motif';
    m.textContent = glyph || 'ॐ';
    card.insertBefore(m, card.firstChild);
    var sh = document.createElement('div');
    sh.className = 'mh-sheen';
    card.insertBefore(sh, card.firstChild);
  }

  function init() {
    var cfg = window.MHCards;
    if (!cfg) return;
    css();

    var cards = document.querySelectorAll('a.door');
    for (var i = 0; i < cards.length; i++) {
      var card = cards[i];
      var href = card.getAttribute('href') || '';
      var c = cfg[href];
      if (!c) continue;
      if (c.photos) photos(card, c.photos);
      else if (c.story) story(card, c.story);
      else if (c.motion) motion(card, c.motion);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
