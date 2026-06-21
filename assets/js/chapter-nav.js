// ManaHindu — Chapter Navigation for Life Story pages
// Click sidebar item -> shows that chapter, hides others. No page scroll needed.

const ManaHinduChapters = {
  show(id) {
    document.querySelectorAll('.chapter-section').forEach(el => {
      el.classList.toggle('active', el.id === id);
    });
    document.querySelectorAll('.chapter-nav-item').forEach(el => {
      el.classList.toggle('active', el.dataset.chapter === id);
    });
    // Scroll chapter content to top (not whole page)
    const content = document.querySelector('.chapter-content');
    if (content) content.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // Save state
    sessionStorage.setItem('mh_chapter_' + window.location.pathname, id);
  },
  init() {
    const saved = sessionStorage.getItem('mh_chapter_' + window.location.pathname);
    const first = document.querySelector('.chapter-nav-item');
    if (saved && document.getElementById(saved)) {
      this.show(saved);
    } else if (first) {
      this.show(first.dataset.chapter);
    }
  }
};

document.addEventListener('DOMContentLoaded', () => ManaHinduChapters.init());
