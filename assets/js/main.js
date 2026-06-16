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
  if (nav) nav.classList.toggle('open');
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
