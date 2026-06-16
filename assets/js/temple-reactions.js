// ManaHindu — Temple Reactions & Visitor Counter
// Uses JSONBin.io for global persistent storage (free)
// localStorage as fallback if API fails

const ManaHinduReactions = {

  // ── CONFIG — Replace with your JSONBin details ──────────
  // Step 1: Go to https://jsonbin.io → Sign up free
  // Step 2: Create a new bin with this JSON:
  // { "reactions": {} }
  // Step 3: Copy the BIN_ID and API_KEY below
  BIN_ID:  'YOUR_BIN_ID_HERE',   // e.g. "64abc123def456"
  API_KEY: 'YOUR_API_KEY_HERE',  // e.g. "$2b$10$abcdef..."
  // ────────────────────────────────────────────────────────

  BASE_URL: 'https://api.jsonbin.io/v3/b',
  _cache: null,
  _saving: false,

  getPageKey() {
    const path = window.location.pathname;
    const match = path.match(/\/([^\/]+)\.html$/);
    return match ? match[1] : 'home';
  },

  // Load all data from JSONBin
  async loadAll() {
    if (this._cache) return this._cache;
    try {
      const res = await fetch(`${this.BASE_URL}/${this.BIN_ID}/latest`, {
        headers: { 'X-Master-Key': this.API_KEY }
      });
      const json = await res.json();
      this._cache = json.record || { reactions: {} };
    } catch {
      // Fallback to localStorage
      this._cache = JSON.parse(localStorage.getItem('mh_global_data') || '{"reactions":{}}');
    }
    return this._cache;
  },

  // Save all data to JSONBin
  async saveAll(data) {
    if (this._saving) return;
    this._saving = true;
    this._cache = data;
    // Save to localStorage immediately as backup
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
    } catch {
      // Silent fail — localStorage backup already saved
    }
    this._saving = false;
  },

  // Get user's own reaction from localStorage
  getUserReaction(key) {
    return localStorage.getItem('mh_user_' + key) || null;
  },
  setUserReaction(key, val) {
    if (val) localStorage.setItem('mh_user_' + key, val);
    else localStorage.removeItem('mh_user_' + key);
  },

  // Record visit (once per browser per page)
  async recordVisit(key) {
    if (localStorage.getItem('mh_visited_' + key)) return;
    localStorage.setItem('mh_visited_' + key, '1');
    const data = await this.loadAll();
    if (!data.reactions[key]) data.reactions[key] = { likes: 0, dislikes: 0, visits: 0 };
    data.reactions[key].visits = (data.reactions[key].visits || 0) + 1;
    await this.saveAll(data);
  },

  // Handle like/dislike
  async react(type, key) {
    // Optimistic UI update first
    const userReaction = this.getUserReaction(key);
    const data = await this.loadAll();
    if (!data.reactions[key]) data.reactions[key] = { likes: 0, dislikes: 0, visits: 0 };
    const counts = data.reactions[key];

    if (userReaction === type) {
      // Toggle off
      counts[type === 'like' ? 'likes' : 'dislikes'] = Math.max(0, (counts[type === 'like' ? 'likes' : 'dislikes'] || 0) - 1);
      this.setUserReaction(key, null);
    } else {
      // Remove old
      if (userReaction === 'like') counts.likes = Math.max(0, (counts.likes || 0) - 1);
      if (userReaction === 'dislike') counts.dislikes = Math.max(0, (counts.dislikes || 0) - 1);
      // Add new
      counts[type === 'like' ? 'likes' : 'dislikes'] = (counts[type === 'like' ? 'likes' : 'dislikes'] || 0) + 1;
      this.setUserReaction(key, type);
    }

    data.reactions[key] = counts;
    this.render(key, counts);
    await this.saveAll(data);
  },

  // Render widget
  render(key, counts) {
    const el = document.getElementById('mh-reactions');
    if (!el) return;
    const userReaction = this.getUserReaction(key);
    const c = counts || { likes: 0, dislikes: 0, visits: 0 };

    el.innerHTML = `
      <div class="mh-reaction-box">
        <div class="mh-reaction-title">🙏 ఈ పేజీ మీకు నచ్చిందా?</div>
        <div class="mh-reaction-btns">
          <button onclick="ManaHinduReactions.react('like','${key}')"
            class="mh-btn-like ${userReaction === 'like' ? 'active' : ''}">
            👍 నచ్చింది <span>${c.likes || 0}</span>
          </button>
          <button onclick="ManaHinduReactions.react('dislike','${key}')"
            class="mh-btn-dislike ${userReaction === 'dislike' ? 'active' : ''}">
            👎 నచ్చలేదు <span>${c.dislikes || 0}</span>
          </button>
        </div>
        <div class="mh-visit-count">
          👁️ ఈ పేజీ <strong>${c.visits || 1}</strong> మంది సందర్శించారు
        </div>
      </div>`;
  },

  // Init
  async init() {
    const key = this.getPageKey();
    const el = document.getElementById('mh-reactions');
    if (!el) return;

    // Show loading state
    el.innerHTML = `<div class="mh-reaction-box" style="text-align:center;padding:1rem;">
      <span style="color:var(--text-muted);font-size:0.85rem;">లోడ్ అవుతోంది...</span>
    </div>`;

    await this.recordVisit(key);
    const data = await this.loadAll();
    const counts = (data.reactions && data.reactions[key]) || { likes: 0, dislikes: 0, visits: 1 };
    this.render(key, counts);
  }
};

document.addEventListener('DOMContentLoaded', () => ManaHinduReactions.init());
