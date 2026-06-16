// ManaHindu — Language Toggle (Telugu ↔ English)
// Usage: wrap Telugu content in <span class="te"> and English in <span class="en">

const ManaHinduLang = {

  // Get saved language
  getLang() {
    return localStorage.getItem('mh_lang') || 'te';
  },

  // Switch language
  switchTo(lang) {
    localStorage.setItem('mh_lang', lang);
    this.apply(lang);
  },

  // Apply language to page
  apply(lang) {
    // Show/hide content spans
    document.querySelectorAll('.te').forEach(el => {
      el.style.display = lang === 'te' ? '' : 'none';
    });
    document.querySelectorAll('.en').forEach(el => {
      el.style.display = lang === 'en' ? '' : 'none';
    });

    // Update toggle buttons
    document.querySelectorAll('.lang-te-btn').forEach(btn => {
      btn.classList.toggle('active', lang === 'te');
    });
    document.querySelectorAll('.lang-en-btn').forEach(btn => {
      btn.classList.toggle('active', lang === 'en');
    });

    // Update html lang attribute
    document.documentElement.lang = lang === 'te' ? 'te' : 'en';
  },

  init() {
    const lang = this.getLang();
    this.apply(lang);
  }
};

document.addEventListener('DOMContentLoaded', () => ManaHinduLang.init());
