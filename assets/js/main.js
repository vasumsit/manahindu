/**
 * ManaHindu — main.js
 * Global JS: nav toggle, topbar date, shared utilities
 * Used by: ALL pages
 * Future: migrate to Vue/Angular router
 */

// ── Telugu Data ────────────────────────────────────────────
const MH = {
  days:   ['ఆదివారం','సోమవారం','మంగళవారం','బుధవారం','గురువారం','శుక్రవారం','శనివారం'],
  months: ['జనవరి','ఫిబ్రవరి','మార్చి','ఏప్రిల్','మే','జూన్','జులై','ఆగస్టు','సెప్టెంబర్','అక్టోబర్','నవంబర్','డిసెంబర్'],

  // Format today's date in Telugu
  formatDate(d = new Date()) {
    return `${this.days[d.getDay()]}, ${d.getDate()} ${this.months[d.getMonth()]} ${d.getFullYear()}`;
  }
};

// ── Topbar Date ────────────────────────────────────────────
(function initTopbar() {
  const el = document.getElementById('topdate');
  if (el) el.textContent = MH.formatDate();
})();

// ── Mobile Nav Toggle ──────────────────────────────────────
function toggleMenu() {
  const nav = document.getElementById('mobileNav');
  if (nav) {
    const willOpen = !nav.classList.contains('open');
    nav.classList.toggle('open');
    // Reset submenus closed whenever the main mobile nav is closed or freshly opened
    if (!willOpen) {
      document.querySelectorAll('.mobile-nav-submenu.open').forEach(el => el.classList.remove('open'));
      document.querySelectorAll('.mobile-nav-toggle.open').forEach(el => el.classList.remove('open'));
    }
  }
}

// Close mobile nav on outside click
document.addEventListener('click', function(e) {
  const nav = document.getElementById('mobileNav');
  const btn = document.querySelector('.hamburger');
  if (nav && btn && !nav.contains(e.target) && !btn.contains(e.target)) {
    nav.classList.remove('open');
  }
});

// ── Export for future Vue/Angular use ─────────────────────
// When migrating to Vue: import { MH } from '@/utils/main.js'
if (typeof module !== 'undefined') module.exports = { MH };

// Reset dropdown scroll to top on open
document.querySelectorAll('.nav-item').forEach(function(item) {
  item.addEventListener('mouseenter', function() {
    var dropdown = item.querySelector('.dropdown');
    if (dropdown) dropdown.scrollTop = 0;
  });
});

// ── Mobile Accordion Submenu Toggle ───────────────────────
function toggleMobileSubmenu(id) {
  const submenu = document.getElementById(id);
  const toggle = document.querySelector('[data-toggle="' + id + '"]');
  if (submenu) submenu.classList.toggle('open');
  if (toggle) toggle.classList.toggle('open');
}

// ── Nested dropdown submenu (మరిన్ని) — click toggle for touch devices ──
document.addEventListener('click', function(e) {
  const trigger = e.target.closest('.submenu-trigger');
  if (trigger) {
    e.stopPropagation();
    const panel = trigger.nextElementSibling;
    const isOpen = panel.style.display === 'block';
    // Close all other open submenu panels first
    document.querySelectorAll('.submenu-panel').forEach(p => p.style.display = 'none');
    panel.style.display = isOpen ? 'none' : 'block';
  } else if (!e.target.closest('.submenu-panel')) {
    document.querySelectorAll('.submenu-panel').forEach(p => p.style.display = 'none');
  }
});
