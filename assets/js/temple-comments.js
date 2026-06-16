// ManaHindu — Temple Comments System
// Uses JSONBin.io for persistent global storage
// Once submitted, comments cannot be edited

const ManaHinduComments = {

  BIN_ID:  '6a3168a5da38895dfeca560b',
  API_KEY: '$2a$10$qKtXWnseApIuvvFkuCcYqeiGduPMLn3VKQnTyGYk1X5ZXlgLDPcYG',
  BASE_URL: 'https://api.jsonbin.io/v3/b',
  _cache: null,

  getPageKey() {
    const path = window.location.pathname;
    const match = path.match(/\/([^\/]+)\.html$/);
    return 'comments_' + (match ? match[1] : 'home');
  },

  async loadAll() {
    if (this._cache) return this._cache;
    try {
      const res = await fetch(`${this.BASE_URL}/${this.BIN_ID}/latest`, {
        headers: { 'X-Master-Key': this.API_KEY }
      });
      const json = await res.json();
      this._cache = json.record || { reactions: {}, comments: {} };
    } catch {
      this._cache = JSON.parse(localStorage.getItem('mh_global_data') || '{"reactions":{},"comments":{}}');
    }
    return this._cache;
  },

  async saveAll(data) {
    this._cache = data;
    localStorage.setItem('mh_global_data', JSON.stringify(data));
    try {
      await fetch(`${this.BASE_URL}/${this.BIN_ID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': this.API_KEY
        },
        body: JSON.stringify(data)
      });
    } catch {}
  },

  // Check if user already commented on this page
  hasCommented(key) {
    return !!localStorage.getItem('mh_commented_' + key);
  },

  markCommented(key) {
    localStorage.setItem('mh_commented_' + key, '1');
  },

  // Format date nicely
  formatDate(isoString) {
    const d = new Date(isoString);
    const day = d.getDate().toString().padStart(2,'0');
    const months = ['జన','ఫిబ్ర','మార్చి','ఏప్రి','మే','జూన్','జులై','ఆగ','సెప్ట','అక్టో','నవం','డిసెం'];
    return `${day} ${months[d.getMonth()]} ${d.getFullYear()}`;
  },

  // Submit a comment
  async submit(key) {
    const nameEl = document.getElementById('mh-comment-name');
    const textEl = document.getElementById('mh-comment-text');
    const errEl  = document.getElementById('mh-comment-error');

    const name = nameEl.value.trim();
    const text = textEl.value.trim();

    // Validate
    if (!name) { errEl.textContent = '⚠️ మీ పేరు నమోదు చేయండి'; errEl.style.display='block'; return; }
    if (!text) { errEl.textContent = '⚠️ వ్యాఖ్య రాయండి'; errEl.style.display='block'; return; }
    if (text.length < 5) { errEl.textContent = '⚠️ కనీసం 5 అక్షరాలు రాయండి'; errEl.style.display='block'; return; }
    errEl.style.display = 'none';

    // Disable submit button
    const btn = document.getElementById('mh-comment-submit');
    btn.disabled = true;
    btn.textContent = 'సేవ్ అవుతోంది...';

    const comment = {
      name: name,
      text: text,
      date: new Date().toISOString(),
      id: Date.now()
    };

    const data = await this.loadAll();
    if (!data.comments) data.comments = {};
    if (!data.comments[key]) data.comments[key] = [];
    data.comments[key].unshift(comment); // newest first

    await this.saveAll(data);
    this.markCommented(key);

    // Re-render
    this.render(key, data.comments[key]);
  },

  // Render full widget
  render(key, comments) {
    const el = document.getElementById('mh-comments');
    if (!el) return;

    const hasCommented = this.hasCommented(key);
    const commentsList = (comments || []).map(c => `
      <div class="mh-comment-item">
        <div class="mh-comment-header">
          <span class="mh-comment-avatar">${c.name.charAt(0).toUpperCase()}</span>
          <div>
            <span class="mh-comment-name">${this.escapeHtml(c.name)}</span>
            <span class="mh-comment-date">${this.formatDate(c.date)}</span>
          </div>
        </div>
        <div class="mh-comment-text">${this.escapeHtml(c.text)}</div>
      </div>`).join('');

    const formHtml = hasCommented ? `
      <div class="mh-comment-submitted">
        ✅ మీరు ఈ పేజీపై వ్యాఖ్య నమోదు చేశారు. ధన్యవాదాలు 🙏
      </div>` : `
      <div class="mh-comment-form">
        <h4>మీ అభిప్రాయం పంచుకోండి</h4>
        <div id="mh-comment-error" style="display:none;color:#dc2626;font-size:0.82rem;margin-bottom:0.5rem;"></div>
        <input id="mh-comment-name" type="text" placeholder="మీ పేరు *" maxlength="50"
          class="mh-comment-input" />
        <textarea id="mh-comment-text" placeholder="మీ అభిప్రాయం రాయండి... *" maxlength="500" rows="3"
          class="mh-comment-textarea"></textarea>
        <div style="display:flex;align-items:center;justify-content:space-between;gap:1rem;">
          <small style="color:var(--text-muted);font-size:0.72rem;">⚠️ ఒకసారి submit చేసిన వ్యాఖ్యను edit చేయలేరు</small>
          <button id="mh-comment-submit" onclick="ManaHinduComments.submit('${key}')"
            class="mh-comment-btn">వ్యాఖ్య నమోదు చేయండి 🙏</button>
        </div>
      </div>`;

    el.innerHTML = `
      <div class="mh-comments-box">
        <h3>💬 భక్తుల అభిప్రాయాలు <span style="font-size:0.8rem;font-weight:normal;color:var(--text-muted)">(${(comments||[]).length})</span></h3>
        ${formHtml}
        <div class="mh-comments-list">
          ${commentsList || '<p style="color:var(--text-muted);font-size:0.85rem;text-align:center;padding:1rem;">ఇంకా వ్యాఖ్యలు లేవు — మొదటిగా మీరు రాయండి!</p>'}
        </div>
      </div>`;
  },

  escapeHtml(text) {
    return text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  },

  async init() {
    const el = document.getElementById('mh-comments');
    if (!el) return;
    const key = this.getPageKey();

    el.innerHTML = `<div class="mh-comments-box"><p style="color:var(--text-muted);font-size:0.85rem;text-align:center;padding:1rem;">లోడ్ అవుతోంది...</p></div>`;

    const data = await this.loadAll();
    const comments = (data.comments && data.comments[key]) || [];
    this.render(key, comments);
  }
};

document.addEventListener('DOMContentLoaded', () => ManaHinduComments.init());
