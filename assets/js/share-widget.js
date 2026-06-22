// ManaHindu — Universal Share Widget
// Auto-detects page title and builds share links for WhatsApp, Email, Facebook, Twitter/X, Copy Link

const ManaHinduShare = {

  getPageInfo() {
    const title = document.title.split('|')[0].trim();
    const url = window.location.href;
    return { title, url };
  },

  shareWhatsApp() {
    const { title, url } = this.getPageInfo();
    const text = encodeURIComponent(`${title} — ${url}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  },

  shareEmail() {
    const { title, url } = this.getPageInfo();
    const subject = encodeURIComponent(`మన హిందూ — ${title}`);
    const body = encodeURIComponent(`ఈ పేజీ చూడండి:\n\n${title}\n${url}\n\n🙏 మన హిందూ — ManaHindu`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  },

  shareFacebook() {
    const { url } = this.getPageInfo();
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank', 'width=600,height=400');
  },

  shareTwitter() {
    const { title, url } = this.getPageInfo();
    const text = encodeURIComponent(title);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(url)}`, '_blank', 'width=600,height=400');
  },

  shareTelegram() {
    const { title, url } = this.getPageInfo();
    window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
  },

  async copyLink(btn) {
    const { url } = this.getPageInfo();
    try {
      await navigator.clipboard.writeText(url);
      const original = btn.textContent;
      btn.textContent = '✅ కాపీ అయింది!';
      setTimeout(() => { btn.textContent = original; }, 2000);
    } catch {
      // Fallback for older browsers
      const ta = document.createElement('textarea');
      ta.value = url;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      const original = btn.textContent;
      btn.textContent = '✅ కాపీ అయింది!';
      setTimeout(() => { btn.textContent = original; }, 2000);
    }
  },

  async nativeShare(btn) {
    const { title, url } = this.getPageInfo();
    if (navigator.share) {
      try {
        await navigator.share({ title: title, text: title, url: url });
      } catch {} // user cancelled — no error needed
    } else {
      this.copyLink(btn);
    }
  },

  render(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = `
      <div class="mh-share-box">
        <div class="mh-share-title">🔗 ఈ పేజీని షేర్ చేయండి</div>
        <div class="mh-share-btns">
          <button class="mh-share-btn mh-share-wa" onclick="ManaHinduShare.shareWhatsApp()" title="WhatsApp">
            <span class="mh-share-icon">💬</span> WhatsApp
          </button>
          <button class="mh-share-btn mh-share-email" onclick="ManaHinduShare.shareEmail()" title="Email">
            <span class="mh-share-icon">✉️</span> Email
          </button>
          <button class="mh-share-btn mh-share-fb" onclick="ManaHinduShare.shareFacebook()" title="Facebook">
            <span class="mh-share-icon">📘</span> Facebook
          </button>
          <button class="mh-share-btn mh-share-tw" onclick="ManaHinduShare.shareTwitter()" title="Twitter / X">
            <span class="mh-share-icon">🐦</span> Twitter
          </button>
          <button class="mh-share-btn mh-share-tg" onclick="ManaHinduShare.shareTelegram()" title="Telegram">
            <span class="mh-share-icon">📨</span> Telegram
          </button>
          <button class="mh-share-btn mh-share-copy" onclick="ManaHinduShare.copyLink(this)" title="Copy Link">
            <span class="mh-share-icon">🔗</span> లింక్ కాపీ
          </button>
        </div>
      </div>`;
  },

  initAll() {
    document.querySelectorAll('.mh-share-container').forEach(el => this.render(el.id));
  }
};

document.addEventListener('DOMContentLoaded', () => ManaHinduShare.initAll());
