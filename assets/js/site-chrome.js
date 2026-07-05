/*!
 * ManaHindu — Shared Header/Footer (site-chrome)
 * Single source of truth for the site nav + footer.
 * Edit the menu HERE ONLY; all pages update automatically.
 *
 * How paths work:
 *   Every link in the templates below uses the {ROOT} token.
 *   This script figures out the correct relative path back to the site
 *   root by reading its OWN <script> tag's src, then swaps {ROOT} for it.
 *   Works from any folder depth, on file://, GitHub Pages, or Azure.
 *
 * Future-proofing:
 *   - Moving to Vue/Angular later? The HTML below becomes a component;
 *     the {ROOT} logic is replaced by the framework's router base.
 *   - Adding an Azure Web API backend? The static shell is untouched;
 *     dynamic bits (reactions, comments) already call their APIs separately.
 */
(function () {
  "use strict";

  // 1) Determine ROOT prefix from this script's own src.
  function computeRoot() {
    var el = document.currentScript;
    if (!el) {
      // Fallback for older browsers: find by filename.
      var list = document.getElementsByTagName('script');
      for (var i = 0; i < list.length; i++) {
        if (list[i].src && list[i].src.indexOf('site-chrome.js') !== -1) { el = list[i]; break; }
      }
    }
    if (!el || !el.getAttribute('src')) return '';
    var src = el.getAttribute('src');                 // e.g. ../../../assets/js/site-chrome.js
    var idx = src.indexOf('assets/js/site-chrome.js');
    return idx >= 0 ? src.substring(0, idx) : '';      // e.g. ../../../
  }

  var ROOT = computeRoot();

  // 2) Templates (root-relative via {ROOT} token).
  var HEADER = `<header class="header">
<div class="container header-inner">
<a class="logo" href="{ROOT}index.html">
<div class="logo-om">ॐ</div>
<div><div class="logo-title">మన హిందూ</div><div class="logo-sub">ManaHindu</div></div>
</a>
<nav class="nav">
<a href="{ROOT}index.html">హోమ్</a><div class="nav-item">
<a href="{ROOT}pages/hinduism/index.html">హిందూమతం</a>
<div class="dropdown">
<a href="{ROOT}pages/hinduism/index.html">హిందూమతం హోమ్</a>
<span class="dropdown-group-label">ఆచార్యులు</span>
<a href="{ROOT}pages/hinduism/adi-shankaracharya/index.html">🕉️ ఆది శంకరాచార్యులు</a>
<a href="{ROOT}pages/hinduism/sri-ramana-maharshi/index.html">🧘 రమణ మహర్షి</a>
<a href="{ROOT}pages/hinduism/sadhguru/index.html">🙏 సద్గురు</a>
<span class="dropdown-group-label">పురాణాలు</span><a href="{ROOT}pages/hinduism/puranas/index.html">📖 అష్టాదశ మహాపురాణాలు</a>
<a href="{ROOT}pages/hinduism/siva-puranam/index.html">🔱 శివ పురాణం</a>
<a href="{ROOT}pages/hinduism/vishnu-puranam/index.html">🪷 విష్ణు పురాణం</a><a href="{ROOT}pages/hinduism/bhagavata-puranam/index.html">🦚 భాగవత పురాణం</a><a href="{ROOT}pages/hinduism/markandeya-puranam/index.html">🗡️ మార్కండేయ పురాణం</a><a href="{ROOT}pages/hinduism/padma-puranam/index.html">🌸 పద్మ పురాణం</a><a href="{ROOT}pages/hinduism/agni-puranam/index.html">🔥 అగ్ని పురాణం</a><a href="{ROOT}pages/hinduism/brahmanda-puranam/index.html">🌌 బ్రహ్మాండ పురాణం</a><a href="{ROOT}pages/hinduism/garuda-puranam/index.html">🦅 గరుడ పురాణం</a><a href="{ROOT}pages/hinduism/skanda-puranam/index.html">🦚 స్కంద పురాణం</a><a href="{ROOT}pages/hinduism/narada-puranam/index.html">🎻 నారద పురాణం</a><a href="{ROOT}pages/hinduism/kurma-puranam/index.html">🐢 కూర్మ పురాణం</a><a href="{ROOT}pages/hinduism/matsya-puranam/index.html">🐟 మత్స్య పురాణం</a><a href="{ROOT}pages/hinduism/linga-puranam/index.html">🕉️ లింగ పురాణం</a><a href="{ROOT}pages/hinduism/vamana-puranam/index.html">☂️ వామన పురాణం</a><a href="{ROOT}pages/hinduism/varaha-puranam/index.html">🐗 వరాహ పురాణం</a><a href="{ROOT}pages/hinduism/brahma-puranam/index.html">🌺 బ్రహ్మ పురాణం</a><a href="{ROOT}pages/hinduism/brahmavaivarta-puranam/index.html">🪷 బ్రహ్మవైవర్త పురాణం</a><a href="{ROOT}pages/hinduism/bhavishya-puranam/index.html">🔮 భవిష్య పురాణం</a>
<span class="dropdown-group-label">దైవ చరితలు</span>
<a href="{ROOT}pages/hinduism/sri-rama-jeevitham/index.html">🏹 శ్రీరామ జీవితం</a>
<a href="{ROOT}pages/hinduism/sri-krishna-jeevitham/index.html">🦚 శ్రీకృష్ణ జీవితం</a>
<a href="{ROOT}pages/hinduism/sri-venkateswara-jeevitham/index.html">🛕 వేంకటేశ్వర చరితం</a>
<a href="{ROOT}pages/hinduism/sri-ganesha-jeevitham/index.html">🐘 గణేశ చరితం</a>
<a href="{ROOT}pages/hinduism/sri-muruga-jeevitham/index.html">🦚 సుబ్రహ్మణ్య చరితం</a>
<a href="{ROOT}pages/hinduism/sri-hanuman-jeevitham/index.html">🐒 హనుమాన్ చరితం</a><a href="{ROOT}pages/hinduism/sri-sita-jeevitham/index.html">🌸 సీతా దేవి చరితం</a>
<span class="dropdown-group-label">భక్తుల త్యాగ గాథలు</span>
<a href="{ROOT}pages/hinduism/bhakti-charithalu/annamayya/index.html">🎶 అన్నమయ్య</a>
<a href="{ROOT}pages/hinduism/bhakti-charithalu/meera-bai/index.html">🪕 మీరాబాయి</a>
<a href="{ROOT}pages/hinduism/bhakti-charithalu/bhakta-ramadasu/index.html">🙏 భక్త రామదాసు</a>
<a href="{ROOT}pages/hinduism/bhakti-charithalu/bhakta-prahlada/index.html">👦 భక్త ప్రహ్లాదుడు</a><a href="{ROOT}pages/hinduism/bhakti-charithalu/bhakta-kannappa/index.html">🏹 భక్త కన్నప్ప</a><a href="{ROOT}pages/hinduism/bhakti-charithalu/markandeya/index.html">🕉️ మార్కండేయుడు</a><a href="{ROOT}pages/hinduism/bhakti-charithalu/bhakta-siriyala/index.html">🙏 భక్త సిరియాళుడు</a>
<div class="dropdown-divider"></div>
<a href="{ROOT}pages/hinduism/deva-charithalu/index.html" style="color:var(--maroon);font-weight:600;">🙏 దైవ చరితలు అన్నీ →</a>
<a href="{ROOT}pages/hinduism/bhakti-charithalu/index.html" style="color:var(--maroon);font-weight:600;">🙏 భక్తుల గాథలు అన్నీ →</a>
</div>
</div><div class="nav-item">
<div class="nav-item"><a href="{ROOT}pages/temples/index.html">దేవాలయాలు</a><div class="dropdown"><a href="{ROOT}pages/temples/index.html">🛕 దేవాలయాలు హోమ్</a><a href="{ROOT}pages/temples/jyotirlinga-yatra-guide.html" style="color:var(--saffron-deep);font-weight:600;">🗺️ యాత్ర ప్రణాళిక (Travel Guide)</a><span class="dropdown-group-label">ఆంధ్రప్రదేశ్ &amp; తెలంగాణ ఆలయాలు</span><a href="{ROOT}pages/temples/detail/tirupati.html">తిరుపతి వేంకటేశ్వర స్వామి<small style="color:var(--gold);font-size:0.7rem;">(AP)</small></a><a href="{ROOT}pages/temples/detail/srisailam.html">శ్రీశైలం మల్లికార్జున స్వామి<small style="color:var(--gold);font-size:0.7rem;">(AP)</small></a><a href="{ROOT}pages/temples/detail/yadadri.html">యాదాద్రి లక్ష్మీనరసింహ స్వామి<small style="color:var(--gold);font-size:0.7rem;">(TS)</small></a><a href="{ROOT}pages/temples/detail/vemulawada.html">వేములవాడ రాజరాజేశ్వర స్వామి<small style="color:var(--gold);font-size:0.7rem;">(TS)</small></a><a href="{ROOT}pages/temples/detail/kondagattu.html">కొండగట్టు ఆంజనేయ స్వామి<small style="color:var(--gold);font-size:0.7rem;">(TS)</small></a><span class="dropdown-group-label">తమిళనాడు &amp; మహారాష్ట్ర ఆలయాలు</span><a href="{ROOT}pages/temples/detail/shirdi.html">శిర్డీ సాయి బాబా మందిర్<small style="color:var(--gold);font-size:0.7rem;">(MH)</small></a><a href="{ROOT}pages/temples/detail/palani.html">పళని ధండాయుధపాణి స్వామి<small style="color:var(--gold);font-size:0.7rem;">(TN)</small></a><a href="{ROOT}pages/temples/detail/srirangam.html">శ్రీరంగం రంగనాథ స్వామి<small style="color:var(--gold);font-size:0.7rem;">(TN)</small></a><a href="{ROOT}pages/temples/detail/thanjavur-brihadeeswarar.html">తంజావూర్ బృహదీశ్వర దేవాలయం<small style="color:var(--gold);font-size:0.7rem;">(TN)</small></a><a href="{ROOT}pages/temples/detail/arunachalam.html">అరుణాచలేశ్వర దేవాలయం<small style="color:var(--gold);font-size:0.7rem;">(TN)</small></a><span class="dropdown-group-label">ద్వాదశ జ్యోతిర్లింగాలు</span><a href="{ROOT}pages/temples/detail/somnath.html">సోమనాథ్ జ్యోతిర్లింగం<small style="color:var(--gold);font-size:0.7rem;">(GJ)</small></a><a href="{ROOT}pages/temples/detail/mahakaleshwar.html">మహాకాళేశ్వర్ జ్యోతిర్లింగం<small style="color:var(--gold);font-size:0.7rem;">(MP)</small></a><a href="{ROOT}pages/temples/detail/kedarnath.html">కేదారనాథ్ జ్యోతిర్లింగం<small style="color:var(--gold);font-size:0.7rem;">(UK)</small></a><a href="{ROOT}pages/temples/detail/kashi-vishwanath.html">కాశీ విశ్వనాథ్ జ్యోతిర్లింగం<small style="color:var(--gold);font-size:0.7rem;">(UP)</small></a><a href="{ROOT}pages/temples/detail/rameshwaram.html">రామేశ్వరం జ్యోతిర్లింగం<small style="color:var(--gold);font-size:0.7rem;">(TN)</small></a><span class="dropdown-group-label">చార్ ధామ్ &amp; ఇతర ప్రసిద్ధ ఆలయాలు</span><a href="{ROOT}pages/temples/detail/badrinath.html">బద్రీనాథ్ ధామ్<small style="color:var(--gold);font-size:0.7rem;">(UK)</small></a><a href="{ROOT}pages/temples/detail/kanyakumari.html">కన్యాకుమారి దేవి ఆలయం<small style="color:var(--gold);font-size:0.7rem;">(TN)</small></a><a href="{ROOT}pages/temples/detail/puri-jagannath.html">పూరీ జగన్నాథ ఆలయం<small style="color:var(--gold);font-size:0.7rem;">(OD)</small></a><a href="{ROOT}pages/temples/detail/dwarkadhish.html">ద్వారకాధీశ్ ఆలయం<small style="color:var(--gold);font-size:0.7rem;">(GJ)</small></a><a href="{ROOT}pages/temples/detail/birla-mandir.html">బిర్లా మందిర్<small style="color:var(--gold);font-size:0.7rem;">(TS)</small></a><span class="dropdown-group-label">అష్టాదశ శక్తి పీఠాలు</span><a href="{ROOT}pages/temples/detail/kamakshi-kanchipuram.html">కామాక్షి అమ్మవారి దేవాలయం<small style="color:var(--gold);font-size:0.7rem;">(TN)</small></a><a href="{ROOT}pages/temples/detail/mahalakshmi-kolhapur.html">మహాలక్ష్మి దేవాలయం<small style="color:var(--gold);font-size:0.7rem;">(MH)</small></a><a href="{ROOT}pages/temples/detail/mahakali-ujjain.html">మహాకాళి దేవాలయం<small style="color:var(--gold);font-size:0.7rem;">(MP)</small></a><a href="{ROOT}pages/temples/detail/kamakhya-guwahati.html">కామాఖ్యా దేవాలయం<small style="color:var(--gold);font-size:0.7rem;">(AS)</small></a><a href="{ROOT}pages/temples/detail/kashi-vishalakshi.html">విశాలాక్షి దేవాలయం<small style="color:var(--gold);font-size:0.7rem;">(UP)</small></a><div class="dropdown-divider"></div><a href="{ROOT}pages/temples/index.html" style="color:var(--maroon);font-weight:600;">అన్నీ చూడండి (56) →</a></div></div>
<div class="dropdown"><a href="{ROOT}pages/temples/index.html">🛕 దేవాలయాలు హోమ్</a><a href="{ROOT}pages/temples/jyotirlinga-yatra-guide.html" style="color:var(--saffron-deep);font-weight:600;">🗺️ యాత్ర ప్రణాళిక (Travel Guide)</a><span class="dropdown-group-label">ఆంధ్రప్రదేశ్ &amp; తెలంగాణ ఆలయాలు</span><a href="{ROOT}pages/temples/detail/tirupati.html">తిరుపతి వేంకటేశ్వర స్వామి<small style="color:var(--gold);font-size:0.7rem;">(AP)</small></a><a href="{ROOT}pages/temples/detail/srisailam.html">శ్రీశైలం మల్లికార్జున స్వామి<small style="color:var(--gold);font-size:0.7rem;">(AP)</small></a><a href="{ROOT}pages/temples/detail/yadadri.html">యాదాద్రి లక్ష్మీనరసింహ స్వామి<small style="color:var(--gold);font-size:0.7rem;">(TS)</small></a><a href="{ROOT}pages/temples/detail/vemulawada.html">వేములవాడ రాజరాజేశ్వర స్వామి<small style="color:var(--gold);font-size:0.7rem;">(TS)</small></a><a href="{ROOT}pages/temples/detail/kondagattu.html">కొండగట్టు ఆంజనేయ స్వామి<small style="color:var(--gold);font-size:0.7rem;">(TS)</small></a><span class="dropdown-group-label">తమిళనాడు &amp; మహారాష్ట్ర ఆలయాలు</span><a href="{ROOT}pages/temples/detail/shirdi.html">శిర్డీ సాయి బాబా మందిర్<small style="color:var(--gold);font-size:0.7rem;">(MH)</small></a><a href="{ROOT}pages/temples/detail/palani.html">పళని ధండాయుధపాణి స్వామి<small style="color:var(--gold);font-size:0.7rem;">(TN)</small></a><a href="{ROOT}pages/temples/detail/srirangam.html">శ్రీరంగం రంగనాథ స్వామి<small style="color:var(--gold);font-size:0.7rem;">(TN)</small></a><a href="{ROOT}pages/temples/detail/thanjavur-brihadeeswarar.html">తంజావూర్ బృహదీశ్వర దేవాలయం<small style="color:var(--gold);font-size:0.7rem;">(TN)</small></a><a href="{ROOT}pages/temples/detail/arunachalam.html">అరుణాచలేశ్వర దేవాలయం<small style="color:var(--gold);font-size:0.7rem;">(TN)</small></a><span class="dropdown-group-label">ద్వాదశ జ్యోతిర్లింగాలు</span><a href="{ROOT}pages/temples/detail/somnath.html">సోమనాథ్ జ్యోతిర్లింగం<small style="color:var(--gold);font-size:0.7rem;">(GJ)</small></a><a href="{ROOT}pages/temples/detail/mahakaleshwar.html">మహాకాళేశ్వర్ జ్యోతిర్లింగం<small style="color:var(--gold);font-size:0.7rem;">(MP)</small></a><a href="{ROOT}pages/temples/detail/kedarnath.html">కేదారనాథ్ జ్యోతిర్లింగం<small style="color:var(--gold);font-size:0.7rem;">(UK)</small></a><a href="{ROOT}pages/temples/detail/kashi-vishwanath.html">కాశీ విశ్వనాథ్ జ్యోతిర్లింగం<small style="color:var(--gold);font-size:0.7rem;">(UP)</small></a><a href="{ROOT}pages/temples/detail/rameshwaram.html">రామేశ్వరం జ్యోతిర్లింగం<small style="color:var(--gold);font-size:0.7rem;">(TN)</small></a><span class="dropdown-group-label">చార్ ధామ్ &amp; ఇతర ప్రసిద్ధ ఆలయాలు</span><a href="{ROOT}pages/temples/detail/badrinath.html">బద్రీనాథ్ ధామ్<small style="color:var(--gold);font-size:0.7rem;">(UK)</small></a><a href="{ROOT}pages/temples/detail/kanyakumari.html">కన్యాకుమారి దేవి ఆలయం<small style="color:var(--gold);font-size:0.7rem;">(TN)</small></a><a href="{ROOT}pages/temples/detail/puri-jagannath.html">పూరీ జగన్నాథ ఆలయం<small style="color:var(--gold);font-size:0.7rem;">(OD)</small></a><a href="{ROOT}pages/temples/detail/dwarkadhish.html">ద్వారకాధీశ్ ఆలయం<small style="color:var(--gold);font-size:0.7rem;">(GJ)</small></a><a href="{ROOT}pages/temples/detail/birla-mandir.html">బిర్లా మందిర్<small style="color:var(--gold);font-size:0.7rem;">(TS)</small></a><span class="dropdown-group-label">అష్టాదశ శక్తి పీఠాలు</span><a href="{ROOT}pages/temples/detail/kamakshi-kanchipuram.html">కామాక్షి అమ్మవారి దేవాలయం<small style="color:var(--gold);font-size:0.7rem;">(TN)</small></a><a href="{ROOT}pages/temples/detail/mahalakshmi-kolhapur.html">మహాలక్ష్మి దేవాలయం<small style="color:var(--gold);font-size:0.7rem;">(MH)</small></a><a href="{ROOT}pages/temples/detail/mahakali-ujjain.html">మహాకాళి దేవాలయం<small style="color:var(--gold);font-size:0.7rem;">(MP)</small></a><a href="{ROOT}pages/temples/detail/kamakhya-guwahati.html">కామాఖ్యా దేవాలయం<small style="color:var(--gold);font-size:0.7rem;">(AS)</small></a><a href="{ROOT}pages/temples/detail/kashi-vishalakshi.html">విశాలాక్షి దేవాలయం<small style="color:var(--gold);font-size:0.7rem;">(UP)</small></a><div class="dropdown-divider"></div><a href="{ROOT}pages/temples/index.html" style="color:var(--maroon);font-weight:600;">అన్నీ చూడండి (56) →</a></div>
</div><div class="nav-item">
<a href="{ROOT}pages/slokalu/index.html">శ్లోకాలు</a>
<div class="dropdown">
<a href="{ROOT}pages/slokalu/index.html">📜 శ్లోకాలు హోమ్</a>
<a class="highlight-item" href="{ROOT}pages/slokalu/hanuman-chalisa/index.html">🐒 హనుమాన్ చాలీసా</a>
<a href="{ROOT}pages/slokalu/sumati-satakam/index.html">సుమతీ శతకం</a>
<a href="{ROOT}pages/slokalu/vemana-satakam/index.html">వేమన శతకం</a>
<a href="{ROOT}pages/slokalu/shiva-panchakshari/index.html">శివ పంచాక్షరి స్తోత్రం</a>
<a href="{ROOT}pages/slokalu/kanakadhara-stotram/index.html">కనకధారా స్తోత్రం</a>
<a href="{ROOT}pages/slokalu/vishnu-ashtottaram/index.html">విష్ణు అష్టోత్తరం</a>
<a href="{ROOT}pages/slokalu/bhaskara-satakam/index.html">భాస్కర శతకం</a>
<a href="{ROOT}pages/slokalu/krishna-satakam/index.html">కృష్ణ శతకం</a>
<a href="{ROOT}pages/slokalu/annamayya-keerthanalu/index.html">అన్నమయ్య కీర్తనలు</a>
<a href="{ROOT}pages/slokalu/index.html" style="color:var(--maroon);font-weight:600;">📜 మరిన్ని శ్లోకాలు →</a>
</div>
</div><div class="nav-item">
<a href="{ROOT}pages/festivals/index.html">పండుగలు</a>
<div class="dropdown"><a href="{ROOT}pages/festivals/index.html">పండుగలు హోమ్</a><span class="dropdown-group-label">ముఖ్యమైనవి</span><a href="{ROOT}pages/festivals/vinayaka-chavithi/index.html">🐘 వినాయక చవితి</a><a href="{ROOT}pages/festivals/maha-shivaratri/index.html">🔱 మహా శివరాత్రి</a><a href="{ROOT}pages/festivals/ugadi/index.html">🌿 ఉగాది</a><a href="{ROOT}pages/festivals/sri-rama-navami/index.html">🏹 శ్రీ రామ నవమి</a><span class="dropdown-group-label">చిన్నవి</span><a href="{ROOT}pages/festivals/dasara/index.html">🗡️ దసరా</a><a href="{ROOT}pages/festivals/diwali/index.html">🪔 దీపావళి</a><div class="dropdown-divider"></div><a href="{ROOT}pages/festivals/index.html" style="color:var(--maroon);font-weight:600;">అన్నీ చూడండి (12) →</a></div>
</div><div class="nav-item"><a href="#">మరిన్ని</a><div class="dropdown"><a href="{ROOT}pages/vlogs/index.html">🎥 వ్లాగ్స్</a><a href="{ROOT}pages/news/index.html">📰 వార్తలు</a><a href="{ROOT}pages/about/index.html">ℹ️ మా గురించి</a></div></div></nav>
<button aria-label="Menu" class="hamburger" onclick="toggleMenu()">☰</button>
</div>
<div class="mobile-nav" id="mobileNav">
<a class="mobile-plain active" href="{ROOT}index.html">హోమ్</a><a class="mobile-plain" href="{ROOT}pages/hinduism/index.html">హిందూమతం</a><div class="mobile-nav-group">
<button class="mobile-nav-toggle" data-toggle="m-acharyulu" onclick="toggleMobileSubmenu('m-acharyulu')">
          🕉️ ఆచార్యులు <span class="arrow">▾</span>
</button>
<div class="mobile-nav-submenu" id="m-acharyulu">
<a href="{ROOT}pages/hinduism/adi-shankaracharya/index.html">— 🕉️ ఆది శంకరాచార్యులు</a>
<a href="{ROOT}pages/hinduism/sri-ramana-maharshi/index.html">— 🧘 రమణ మహర్షి</a>
<a href="{ROOT}pages/hinduism/sadhguru/index.html">— 🙏 సద్గురు</a>
</div>
</div><div class="mobile-nav-group">
<button class="mobile-nav-toggle" data-toggle="m-puranas" onclick="toggleMobileSubmenu('m-puranas')">
          📖 పురాణాలు <span class="arrow">▾</span>
</button>
<div class="mobile-nav-submenu" id="m-puranas"><a href="{ROOT}pages/hinduism/puranas/index.html">— 📖 అష్టాదశ మహాపురాణాలు</a>
<a href="{ROOT}pages/hinduism/siva-puranam/index.html">— 🔱 శివ పురాణం</a>
<a href="{ROOT}pages/hinduism/vishnu-puranam/index.html">— 🪷 విష్ణు పురాణం</a><a href="{ROOT}pages/hinduism/bhagavata-puranam/index.html">— 🦚 భాగవత పురాణం</a><a href="{ROOT}pages/hinduism/markandeya-puranam/index.html">— 🗡️ మార్కండేయ పురాణం</a><a href="{ROOT}pages/hinduism/padma-puranam/index.html">— 🌸 పద్మ పురాణం</a><a href="{ROOT}pages/hinduism/agni-puranam/index.html">— 🔥 అగ్ని పురాణం</a><a href="{ROOT}pages/hinduism/brahmanda-puranam/index.html">— 🌌 బ్రహ్మాండ పురాణం</a><a href="{ROOT}pages/hinduism/garuda-puranam/index.html">— 🦅 గరుడ పురాణం</a><a href="{ROOT}pages/hinduism/skanda-puranam/index.html">— 🦚 స్కంద పురాణం</a><a href="{ROOT}pages/hinduism/narada-puranam/index.html">— 🎻 నారద పురాణం</a><a href="{ROOT}pages/hinduism/kurma-puranam/index.html">— 🐢 కూర్మ పురాణం</a><a href="{ROOT}pages/hinduism/matsya-puranam/index.html">— 🐟 మత్స్య పురాణం</a><a href="{ROOT}pages/hinduism/linga-puranam/index.html">— 🕉️ లింగ పురాణం</a><a href="{ROOT}pages/hinduism/vamana-puranam/index.html">— ☂️ వామన పురాణం</a><a href="{ROOT}pages/hinduism/varaha-puranam/index.html">— 🐗 వరాహ పురాణం</a><a href="{ROOT}pages/hinduism/brahma-puranam/index.html">— 🌺 బ్రహ్మ పురాణం</a><a href="{ROOT}pages/hinduism/brahmavaivarta-puranam/index.html">— 🪷 బ్రహ్మవైవర్త పురాణం</a><a href="{ROOT}pages/hinduism/bhavishya-puranam/index.html">— 🔮 భవిష్య పురాణం</a>
</div>
</div><div class="mobile-nav-group">
<button class="mobile-nav-toggle" data-toggle="m-deities" onclick="toggleMobileSubmenu('m-deities')">
          🙏 దైవ చరితలు <span class="arrow">▾</span>
</button>
<div class="mobile-nav-submenu" id="m-deities">
<a href="{ROOT}pages/hinduism/sri-rama-jeevitham/index.html">— 🏹 శ్రీరామ జీవితం</a>
<a href="{ROOT}pages/hinduism/sri-krishna-jeevitham/index.html">— 🦚 శ్రీకృష్ణ జీవితం</a>
<a href="{ROOT}pages/hinduism/sri-venkateswara-jeevitham/index.html">— 🛕 వేంకటేశ్వర చరితం</a>
<a href="{ROOT}pages/hinduism/sri-ganesha-jeevitham/index.html">— 🐘 గణేశ చరితం</a>
<a href="{ROOT}pages/hinduism/sri-muruga-jeevitham/index.html">— 🦚 సుబ్రహ్మణ్య చరితం</a>
<a href="{ROOT}pages/hinduism/sri-hanuman-jeevitham/index.html">— 🐒 హనుమాన్ చరితం</a><a href="{ROOT}pages/hinduism/sri-sita-jeevitham/index.html">— 🌸 సీతా దేవి చరితం</a>
</div>
</div><div class="mobile-nav-group">
<button class="mobile-nav-toggle" data-toggle="m-bhaktas" onclick="toggleMobileSubmenu('m-bhaktas')">
          🙏 భక్తుల త్యాగ గాథలు <span class="arrow">▾</span>
</button>
<div class="mobile-nav-submenu" id="m-bhaktas">
<a href="{ROOT}pages/hinduism/bhakti-charithalu/annamayya/index.html">— 🎶 అన్నమయ్య</a>
<a href="{ROOT}pages/hinduism/bhakti-charithalu/meera-bai/index.html">— 🪕 మీరాబాయి</a>
<a href="{ROOT}pages/hinduism/bhakti-charithalu/bhakta-ramadasu/index.html">— 🙏 భక్త రామదాసు</a>
<a href="{ROOT}pages/hinduism/bhakti-charithalu/bhakta-prahlada/index.html">— 👦 భక్త ప్రహ్లాదుడు</a><a href="{ROOT}pages/hinduism/bhakti-charithalu/bhakta-kannappa/index.html">— 🏹 భక్త కన్నప్ప</a><a href="{ROOT}pages/hinduism/bhakti-charithalu/markandeya/index.html">— 🕉️ మార్కండేయుడు</a><a href="{ROOT}pages/hinduism/bhakti-charithalu/bhakta-siriyala/index.html">— 🙏 భక్త సిరియాళుడు</a>
</div>
</div><div class="mobile-nav-group">
<button class="mobile-nav-toggle" data-toggle="m-temples" onclick="toggleMobileSubmenu('m-temples')">
          🛕 దేవాలయాలు <span class="arrow">▾</span>
</button>
<div class="mobile-nav-submenu" id="m-temples"><a href="{ROOT}pages/temples/index.html">— 🛕 దేవాలయాలు హోమ్</a><a href="{ROOT}pages/temples/jyotirlinga-yatra-guide.html" style="color:var(--saffron-deep);font-weight:600;">— 🗺️ యాత్ర ప్రణాళిక</a><span class="dropdown-group-label" style="display:block;padding:0.4rem 0;">ఆంధ్రప్రదేశ్ &amp; తెలంగాణ ఆలయాలు</span><a href="{ROOT}pages/temples/detail/tirupati.html">— తిరుపతి వేంకటేశ్వర స్వామి (AP)</a><a href="{ROOT}pages/temples/detail/srisailam.html">— శ్రీశైలం మల్లికార్జున స్వామి (AP)</a><a href="{ROOT}pages/temples/detail/yadadri.html">— యాదాద్రి లక్ష్మీనరసింహ స్వామి (TS)</a><a href="{ROOT}pages/temples/detail/vemulawada.html">— వేములవాడ రాజరాజేశ్వర స్వామి (TS)</a><a href="{ROOT}pages/temples/detail/kondagattu.html">— కొండగట్టు ఆంజనేయ స్వామి (TS)</a><span class="dropdown-group-label" style="display:block;padding:0.4rem 0;">తమిళనాడు &amp; మహారాష్ట్ర ఆలయాలు</span><a href="{ROOT}pages/temples/detail/shirdi.html">— శిర్డీ సాయి బాబా మందిర్ (MH)</a><a href="{ROOT}pages/temples/detail/palani.html">— పళని ధండాయుధపాణి స్వామి (TN)</a><a href="{ROOT}pages/temples/detail/srirangam.html">— శ్రీరంగం రంగనాథ స్వామి (TN)</a><a href="{ROOT}pages/temples/detail/thanjavur-brihadeeswarar.html">— తంజావూర్ బృహదీశ్వర దేవాలయం (TN)</a><a href="{ROOT}pages/temples/detail/arunachalam.html">— అరుణాచలేశ్వర దేవాలయం (TN)</a><span class="dropdown-group-label" style="display:block;padding:0.4rem 0;">ద్వాదశ జ్యోతిర్లింగాలు</span><a href="{ROOT}pages/temples/detail/somnath.html">— సోమనాథ్ జ్యోతిర్లింగం (GJ)</a><a href="{ROOT}pages/temples/detail/mahakaleshwar.html">— మహాకాళేశ్వర్ జ్యోతిర్లింగం (MP)</a><a href="{ROOT}pages/temples/detail/kedarnath.html">— కేదారనాథ్ జ్యోతిర్లింగం (UK)</a><a href="{ROOT}pages/temples/detail/kashi-vishwanath.html">— కాశీ విశ్వనాథ్ జ్యోతిర్లింగం (UP)</a><a href="{ROOT}pages/temples/detail/rameshwaram.html">— రామేశ్వరం జ్యోతిర్లింగం (TN)</a><span class="dropdown-group-label" style="display:block;padding:0.4rem 0;">చార్ ధామ్ &amp; ఇతర ప్రసిద్ధ ఆలయాలు</span><a href="{ROOT}pages/temples/detail/badrinath.html">— బద్రీనాథ్ ధామ్ (UK)</a><a href="{ROOT}pages/temples/detail/kanyakumari.html">— కన్యాకుమారి దేవి ఆలయం (TN)</a><a href="{ROOT}pages/temples/detail/puri-jagannath.html">— పూరీ జగన్నాథ ఆలయం (OD)</a><a href="{ROOT}pages/temples/detail/dwarkadhish.html">— ద్వారకాధీశ్ ఆలయం (GJ)</a><a href="{ROOT}pages/temples/detail/birla-mandir.html">— బిర్లా మందిర్ (TS)</a><span class="dropdown-group-label" style="display:block;padding:0.4rem 0;">అష్టాదశ శక్తి పీఠాలు</span><a href="{ROOT}pages/temples/detail/kamakshi-kanchipuram.html">— కామాక్షి అమ్మవారి దేవాలయం (TN)</a><a href="{ROOT}pages/temples/detail/mahalakshmi-kolhapur.html">— మహాలక్ష్మి దేవాలయం (MH)</a><a href="{ROOT}pages/temples/detail/mahakali-ujjain.html">— మహాకాళి దేవాలయం (MP)</a><a href="{ROOT}pages/temples/detail/kamakhya-guwahati.html">— కామాఖ్యా దేవాలయం (AS)</a><a href="{ROOT}pages/temples/detail/kashi-vishalakshi.html">— విశాలాక్షి దేవాలయం (UP)</a><a href="{ROOT}pages/temples/index.html" style="color:var(--maroon);font-weight:600;">అన్నీ చూడండి (56) →</a></div>
</div><div class="mobile-nav-group">
<button class="mobile-nav-toggle" data-toggle="m-slokalu" onclick="toggleMobileSubmenu('m-slokalu')">
          📜 శ్లోకాలు <span class="arrow">▾</span>
</button>
<div class="mobile-nav-submenu" id="m-slokalu">
<a href="{ROOT}pages/slokalu/index.html">— 📜 శ్లోకాలు హోమ్</a>
<a href="{ROOT}pages/slokalu/hanuman-chalisa/index.html">— 🐒 హనుమాన్ చాలీసా</a><a href="{ROOT}pages/slokalu/annamayya-keerthanalu/index.html">— 🎶 అన్నమయ్య కీర్తనలు</a>
<a href="{ROOT}pages/slokalu/sumati-satakam/index.html">— సుమతీ శతకం</a>
<a href="{ROOT}pages/slokalu/vemana-satakam/index.html">— వేమన శతకం</a>
<a href="{ROOT}pages/slokalu/shiva-panchakshari/index.html">— శివ పంచాక్షరి స్తోత్రం</a>
<a href="{ROOT}pages/slokalu/kanakadhara-stotram/index.html">— కనకధారా స్తోత్రం</a>
<a href="{ROOT}pages/slokalu/vishnu-ashtottaram/index.html">— విష్ణు అష్టోత్తరం</a><a href="{ROOT}pages/slokalu/bhaskara-satakam/index.html">— భాస్కర శతకం</a><a href="{ROOT}pages/slokalu/krishna-satakam/index.html">— కృష్ణ శతకం</a><a href="{ROOT}pages/slokalu/annamayya-keerthanalu/index.html">— అన్నమయ్య కీర్తనలు</a>
</div>
</div><div class="mobile-nav-group">
<button class="mobile-nav-toggle" data-toggle="m-festivals" onclick="toggleMobileSubmenu('m-festivals')">
          🎉 పండుగలు <span class="arrow">▾</span>
</button>
<div class="mobile-nav-submenu" id="m-festivals"><a href="{ROOT}pages/festivals/index.html">— పండుగలు హోమ్</a><span class="dropdown-group-label" style="display:block;padding:0.4rem 0;">ముఖ్యమైనవి</span><a href="{ROOT}pages/festivals/vinayaka-chavithi/index.html">— 🐘 వినాయక చవితి</a><a href="{ROOT}pages/festivals/maha-shivaratri/index.html">— 🔱 మహా శివరాత్రి</a><a href="{ROOT}pages/festivals/ugadi/index.html">— 🌿 ఉగాది</a><a href="{ROOT}pages/festivals/sri-rama-navami/index.html">— 🏹 శ్రీ రామ నవమి</a><span class="dropdown-group-label" style="display:block;padding:0.4rem 0;">చిన్నవి</span><a href="{ROOT}pages/festivals/dasara/index.html">— 🗡️ దసరా</a><a href="{ROOT}pages/festivals/diwali/index.html">— 🪔 దీపావళి</a><a href="{ROOT}pages/festivals/index.html" style="color:var(--maroon);font-weight:600;">అన్నీ చూడండి (12) →</a></div>
</div><div class="mobile-nav-group"><button class="mobile-nav-toggle" data-toggle="m-more" onclick="toggleMobileSubmenu('m-more')">📂 మరిన్ని <span class="arrow">▾</span></button><div class="mobile-nav-submenu" id="m-more"><a href="{ROOT}pages/vlogs/index.html">— 🎥 వ్లాగ్స్</a><a href="{ROOT}pages/news/index.html">— 📰 వార్తలు</a><a href="{ROOT}pages/about/index.html">— ℹ️ మా గురించి</a></div></div></div></header>`;
  var FOOTER = `<footer class="footer">
<div class="container footer-inner">
<div class="footer-brand">
<div class="logo-om" style="font-size:2rem;color:#f59e0b;">ॐ</div>
<div><div class="logo-title" style="font-size:1.2rem;color:#fff;">మన హిందూ</div><div class="logo-sub">ManaHindu</div></div>
</div>
<div class="footer-links">
<div>
<h4>విభాగాలు</h4>
<a href="{ROOT}pages/hinduism/index.html">హిందూమతం</a>
<a href="{ROOT}pages/temples/detail/tirupati.html">తిరుపతి వేంకటేశ్వర స్వామి</a>
<a href="{ROOT}pages/temples/index.html">మరిన్ని దేవాలయాలు</a>
<a href="{ROOT}pages/festivals/index.html">పండుగలు</a>
</div>
<div>
<h4>మా చానెల్</h4>
<a href="https://www.youtube.com/@Vasu11tv" target="_blank">▶ YouTube — v11tv</a>
<a href="{ROOT}pages/about/index.html">మా గురించి</a>
</div>
</div>
</div>
<div class="footer-bottom"><p>© 2025 మన హిందూ | ManaHindu — జై శ్రీ వేంకటేశ్వర 🙏</p><p class="footer-sitevisits" style="margin-top:0.4rem;font-size:0.85rem;opacity:0.85;">👁️ మొత్తం సందర్శకులు: <strong id="mh-site-visits">…</strong></p></div>
</footer>`;

  function applyRoot(html) { return html.split('{ROOT}').join(ROOT); }

  // 3) Inject into placeholders.
  function inject() {
    var h = document.getElementById('site-header');
    var f = document.getElementById('site-footer');
    if (h) h.innerHTML = applyRoot(HEADER);
    if (f) f.innerHTML = applyRoot(FOOTER);
    highlightActive();
    showSiteVisits();
    // Re-bind the mobile hamburger + dropdown toggles if main.js exposes them.
    if (window.ManaHinduNav && typeof window.ManaHinduNav.bind === 'function') {
      try { window.ManaHinduNav.bind(); } catch (e) {}
    }
  }

  // 4) Highlight the link matching the current page.
  function highlightActive() {
    var here = window.location.pathname.replace(/\/index\.html$/, '/').replace(/\/$/, '/');
    var links = document.querySelectorAll('#site-header a[href]');
    var bestEl = null, bestLen = -1;
    for (var i = 0; i < links.length; i++) {
      var a = links[i];
      var path = a.pathname ? a.pathname.replace(/\/index\.html$/, '/').replace(/\/$/, '/') : '';
      if (!path) continue;
      if (here === path && path.length > bestLen) { bestEl = a; bestLen = path.length; }
    }
    if (bestEl) bestEl.classList.add('active');
  }

  // 5) Whole-site visitor total in the footer.
  //    Reads the shared JSONBin store and SUMS every page's visit count,
  //    so the site total always stays consistent with the per-page numbers
  //    (no separate counter to drift). Read-only here; per-page visits are
  //    recorded by temple-reactions.js on the content pages.
  var VISITS = {
    BIN_ID:  '6a3168a5da38895dfeca560b',
    API_KEY: '$2a$10$qKtXWnseApIuvvFkuCcYqeiGduPMLn3VKQnTyGYk1X5ZXlgLDPcYG',
    BASE_URL: 'https://api.jsonbin.io/v3/b'
  };
  function fmt(n) { return (n || 0).toLocaleString('en-IN'); }
  function showSiteVisits() {
    var el = document.getElementById('mh-site-visits');
    if (!el) return;
    fetch(VISITS.BASE_URL + '/' + VISITS.BIN_ID + '/latest', {
      headers: { 'X-Master-Key': VISITS.API_KEY }
    }).then(function (r) { return r.json(); }).then(function (json) {
      var rec = (json && json.record) || {};
      var reactions = rec.reactions || {};
      var total = 0;
      for (var k in reactions) {
        if (reactions.hasOwnProperty(k)) total += (reactions[k].visits || 0);
      }
      el.textContent = fmt(total);
    }).catch(function () {
      // Fallback: local backup if the API is unreachable.
      try {
        var d = JSON.parse(localStorage.getItem('mh_global_data') || '{"reactions":{}}');
        var t = 0, rr = d.reactions || {};
        for (var k in rr) { if (rr.hasOwnProperty(k)) t += (rr[k].visits || 0); }
        el.textContent = fmt(t);
      } catch (e) { el.textContent = '—'; }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
