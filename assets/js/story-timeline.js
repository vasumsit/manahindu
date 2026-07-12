/* ManaHindu — animated story timeline
   A horizontal, swipeable sequence of story cards that slide in
   left-to-right, with a progress rail, auto-play, and arrow controls.
   Reads its data from window.MHStory (set by the page). */
(function () {
  'use strict';

  function css() {
    if (document.getElementById('mh-story-css')) return;
    var st = document.createElement('style');
    st.id = 'mh-story-css';
    st.textContent = [
      '.mh-story{position:relative;margin:0 0 2rem;overflow:hidden;border-radius:18px;',
      '  background:linear-gradient(135deg,#3a2416,#1c1826);border:1px solid rgba(212,175,55,0.3);',
      '  box-shadow:0 8px 30px rgba(0,0,0,0.25);}',
      '.mh-story-head{display:flex;align-items:center;justify-content:space-between;',
      '  padding:14px 18px;border-bottom:1px solid rgba(212,175,55,0.2);}',
      '.mh-story-title{font-family:"Tiro Telugu",serif;color:#e8cf8a;font-size:1.05rem;}',
      '.mh-story-play{background:rgba(212,175,55,0.15);border:1px solid rgba(212,175,55,0.4);',
      '  color:#e8cf8a;border-radius:20px;padding:6px 14px;font-size:0.8rem;cursor:pointer;',
      '  font-family:"Tiro Telugu",serif;}',
      '.mh-story-play:hover{background:rgba(212,175,55,0.28);}',

      /* the moving track */
      '.mh-story-view{position:relative;overflow:hidden;}',
      '.mh-story-track{display:flex;transition:transform .55s cubic-bezier(.35,.9,.35,1);}',
      '.mh-slide{flex:0 0 100%;padding:26px 24px 30px;box-sizing:border-box;min-height:210px;}',
      '.mh-slide-no{display:inline-block;font-family:"Poppins",sans-serif;font-size:0.68rem;',
      '  letter-spacing:0.12em;color:#0d0b12;background:linear-gradient(135deg,#e8cf8a,#d4af37);',
      '  padding:3px 10px;border-radius:12px;font-weight:700;margin-bottom:12px;}',
      '.mh-slide-icon{font-size:2.2rem;margin-bottom:8px;}',
      '.mh-slide h3{font-family:"Tiro Telugu",serif;color:#e8cf8a;font-size:1.35rem;',
      '  font-weight:400;margin:0 0 8px;}',
      '.mh-slide p{font-family:"Tiro Telugu",serif;color:#e0d3ba;font-size:0.98rem;',
      '  line-height:1.85;margin:0 0 12px;}',
      '.mh-slide a.mh-slide-more{color:#d4af37;text-decoration:none;font-family:"Tiro Telugu",serif;',
      '  font-size:0.88rem;font-weight:600;}',
      '.mh-slide a.mh-slide-more:hover{text-decoration:underline;}',

      /* animate contents in when the slide becomes active */
      '.mh-slide > *{opacity:0;transform:translateX(26px);}',
      '.mh-slide.on > *{animation:mhSlideIn .5s ease forwards;}',
      '.mh-slide.on > *:nth-child(1){animation-delay:.05s}',
      '.mh-slide.on > *:nth-child(2){animation-delay:.12s}',
      '.mh-slide.on > *:nth-child(3){animation-delay:.19s}',
      '.mh-slide.on > *:nth-child(4){animation-delay:.26s}',
      '.mh-slide.on > *:nth-child(5){animation-delay:.33s}',
      '@keyframes mhSlideIn{to{opacity:1;transform:translateX(0);}}',

      /* progress rail */
      '.mh-rail{display:flex;gap:5px;padding:0 18px 16px;}',
      '.mh-rail span{flex:1;height:4px;border-radius:3px;background:rgba(212,175,55,0.18);',
      '  cursor:pointer;transition:background .3s;}',
      '.mh-rail span.done{background:rgba(212,175,55,0.5);}',
      '.mh-rail span.now{background:linear-gradient(90deg,#e8cf8a,#d4af37);}',

      /* arrows */
      '.mh-story-nav{position:absolute;top:50%;transform:translateY(-50%);width:38px;height:38px;',
      '  border-radius:50%;border:1px solid rgba(212,175,55,0.4);background:rgba(13,11,18,0.75);',
      '  color:#e8cf8a;font-size:1.3rem;cursor:pointer;z-index:3;display:flex;',
      '  align-items:center;justify-content:center;transition:background .2s;}',
      '.mh-story-nav:hover{background:rgba(212,175,55,0.3);}',
      '.mh-story-nav[disabled]{opacity:0.25;cursor:default;}',
      '.mh-story-nav.l{left:8px;} .mh-story-nav.r{right:8px;}',

      '@media(max-width:640px){',
      '  .mh-slide{padding:22px 18px 26px;min-height:230px;}',
      '  .mh-slide h3{font-size:1.2rem;}',
      '  .mh-story-nav{width:32px;height:32px;font-size:1.1rem;}',
      '}',
      '@media print{.mh-story{display:none !important;}}'
    ].join('\n');
    document.head.appendChild(st);
  }

  function init() {
    var data = window.MHStory;
    if (!data || !data.slides || !data.slides.length) return;

    var anchor = document.querySelector('.satakam-intro');
    if (!anchor || !anchor.parentNode) return;

    css();

    var n = data.slides.length;
    var i = 0;
    var timer = null;
    var playing = false;

    var box = document.createElement('div');
    box.className = 'mh-story';

    // header
    var head = document.createElement('div');
    head.className = 'mh-story-head';
    var ttl = document.createElement('span');
    ttl.className = 'mh-story-title';
    ttl.textContent = data.title || '📖 కథ';
    var play = document.createElement('button');
    play.className = 'mh-story-play';
    play.textContent = '▶ ఆటో ప్లే';
    head.appendChild(ttl);
    head.appendChild(play);

    // track
    var view = document.createElement('div');
    view.className = 'mh-story-view';
    var track = document.createElement('div');
    track.className = 'mh-story-track';

    data.slides.forEach(function (s, k) {
      var sl = document.createElement('div');
      sl.className = 'mh-slide';
      var html = '<span class="mh-slide-no">' + (k + 1) + ' / ' + n + '</span>';
      if (s.icon) html += '<div class="mh-slide-icon">' + s.icon + '</div>';
      html += '<h3>' + s.title + '</h3>';
      html += '<p>' + s.text + '</p>';
      if (s.href) html += '<a class="mh-slide-more" href="' + s.href + '">' + (s.link || 'పూర్తిగా చదవండి →') + '</a>';
      sl.innerHTML = html;
      track.appendChild(sl);
    });

    var prev = document.createElement('button');
    prev.className = 'mh-story-nav l';
    prev.innerHTML = '‹';
    var next = document.createElement('button');
    next.className = 'mh-story-nav r';
    next.innerHTML = '›';

    view.appendChild(track);
    view.appendChild(prev);
    view.appendChild(next);

    // rail
    var rail = document.createElement('div');
    rail.className = 'mh-rail';
    var pips = [];
    for (var k = 0; k < n; k++) {
      var p = document.createElement('span');
      (function (idx) { p.onclick = function () { stop(); go(idx); }; })(k);
      rail.appendChild(p);
      pips.push(p);
    }

    box.appendChild(head);
    box.appendChild(view);
    box.appendChild(rail);

    function go(k) {
      i = Math.max(0, Math.min(n - 1, k));
      track.style.transform = 'translateX(-' + (i * 100) + '%)';
      var slides = track.children;
      for (var j = 0; j < slides.length; j++) slides[j].classList.remove('on');
      // re-trigger the entry animation
      void slides[i].offsetWidth;
      slides[i].classList.add('on');
      for (var j2 = 0; j2 < n; j2++) {
        pips[j2].className = j2 < i ? 'done' : (j2 === i ? 'now' : '');
      }
      prev.disabled = (i === 0);
      next.disabled = (i === n - 1);
    }

    function stop() {
      playing = false;
      if (timer) { clearInterval(timer); timer = null; }
      play.textContent = '▶ ఆటో ప్లే';
    }

    play.onclick = function () {
      if (playing) { stop(); return; }
      playing = true;
      play.textContent = '⏸ ఆపు';
      if (i === n - 1) go(0);
      timer = setInterval(function () {
        if (i >= n - 1) { stop(); return; }
        go(i + 1);
      }, 4200);
    };

    prev.onclick = function () { stop(); go(i - 1); };
    next.onclick = function () { stop(); go(i + 1); };

    // swipe on touch
    var x0 = null;
    view.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    view.addEventListener('touchend', function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 45) { stop(); go(dx < 0 ? i + 1 : i - 1); }
      x0 = null;
    }, { passive: true });

    anchor.parentNode.insertBefore(box, anchor.nextSibling);
    go(0);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
