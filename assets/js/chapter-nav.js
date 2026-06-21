// ManaHindu — Chapter Navigation for Life Story / Satakam pages
// Click sidebar item -> shows that chapter, hides others. No page scroll jump.

const ManaHinduChapters = {
  getChapterIds() {
    return Array.from(document.querySelectorAll('.chapter-nav-item')).map(el => el.dataset.chapter);
  },

  show(id, scrollToTop) {
    document.querySelectorAll('.chapter-section').forEach(el => {
      el.classList.toggle('active', el.id === id);
    });
    document.querySelectorAll('.chapter-nav-item').forEach(el => {
      el.classList.toggle('active', el.dataset.chapter === id);
    });

    // Scroll the chapter-content container itself to its top,
    // WITHOUT moving the whole page scroll position.
    if (scrollToTop !== false) {
      const content = document.querySelector('.chapter-content');
      if (content) {
        const rect = content.getBoundingClientRect();
        const offset = window.pageYOffset + rect.top - 90; // 90px header offset
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
    }

    sessionStorage.setItem('mh_chapter_' + window.location.pathname, id);
    this.renderNextButton(id);
  },

  renderNextButton(currentId) {
    const ids = this.getChapterIds();
    const idx = ids.indexOf(currentId);
    const activeSection = document.getElementById(currentId);
    if (!activeSection) return;

    // Remove any existing nav buttons in this section
    const existing = activeSection.querySelector('.chapter-nav-buttons');
    if (existing) existing.remove();

    const navItems = document.querySelectorAll('.chapter-nav-item');
    const nextIdx = idx + 1;
    const prevIdx = idx - 1;

    let html = '<div class="chapter-nav-buttons">';
    if (prevIdx >= 0) {
      const prevTitle = navItems[prevIdx].textContent;
      html += `<button class="chapter-btn chapter-btn-prev" onclick="ManaHinduChapters.show('${ids[prevIdx]}')">← ${prevTitle}</button>`;
    } else {
      html += '<span></span>';
    }
    if (nextIdx < ids.length) {
      const nextTitle = navItems[nextIdx].textContent;
      html += `<button class="chapter-btn chapter-btn-next" onclick="ManaHinduChapters.show('${ids[nextIdx]}')">${nextTitle} →</button>`;
    }
    html += '</div>';

    activeSection.insertAdjacentHTML('beforeend', html);
  },

  init() {
    const saved = sessionStorage.getItem('mh_chapter_' + window.location.pathname);
    const first = document.querySelector('.chapter-nav-item');
    if (saved && document.getElementById(saved)) {
      this.show(saved, false);
    } else if (first) {
      this.show(first.dataset.chapter, false);
    }
  }
};

document.addEventListener('DOMContentLoaded', () => ManaHinduChapters.init());
