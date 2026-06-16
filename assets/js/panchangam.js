/**
 * ManaHindu — panchangam.js
 * Standalone panchangam calculation for Hyderabad
 * No external API needed — works offline
 * Future: replace with /api/panchangam endpoint from C# backend
 */

// ── Panchangam Data ────────────────────────────────────────
const PANCHANGAM = {

  tithis: [
    'పాడ్యమి','విదియ','తదియ','చవితి','పంచమి',
    'షష్ఠి','సప్తమి','అష్టమి','నవమి','దశమి',
    'ఏకాదశి','ద్వాదశి','త్రయోదశి','చతుర్దశి','పూర్ణిమ'
  ],

  nakshatras: [
    'అశ్విని','భరణి','కృత్తిక','రోహిణి','మృగశిర','ఆర్ద్ర',
    'పునర్వసు','పుష్యమి','ఆశ్లేష','మఘ','పూర్వ ఫల్గుణి','ఉత్తర ఫల్గుణి',
    'హస్త','చిత్త','స్వాతి','విశాఖ','అనూరాధ','జ్యేష్ఠ',
    'మూల','పూర్వాషాఢ','ఉత్తరాషాఢ','శ్రవణం','ధనిష్ఠ','శతభిష',
    'పూర్వాభాద్ర','ఉత్తరాభాద్ర','రేవతి'
  ],

  yogas: [
    'విష్కంభ','ప్రీతి','ఆయుష్మాన్','సౌభాగ్య','శోభన',
    'అతిగంఢ','సుకర్మ','ధృతి','శూల','గంఢ',
    'వృద్ధి','ధ్రువ','వ్యాఘాత','హర్షణ','వజ్ర',
    'సిద్ధి','వ్యతీపాత','వరీయాన్','పరిఘ','శివ',
    'సిద్ధ','సాధ్య','శుభ','శుక్ల','బ్రహ్మ','ఇంద్ర','వైధృతి'
  ],

  karanas: [
    'బవ','బాలవ','కౌలవ','తైతిల','గర','వణిజ','విష్టి',
    'శకుని','చతుష్పద','నాగ','కింస్తుఘ్న'
  ],

  // Rahu Kalam — Hyderabad (per weekday: Sun=0 ... Sat=6)
  rahuKalam:  [
    '4:30 PM – 6:00 PM',
    '7:30 AM – 9:00 AM',
    '3:00 PM – 4:30 PM',
    '12:00 PM – 1:30 PM',
    '1:30 PM – 3:00 PM',
    '10:30 AM – 12:00 PM',
    '9:00 AM – 10:30 AM'
  ],

  // Yamaganda — Hyderabad (per weekday)
  yamaganda: [
    '12:00 PM – 1:30 PM',
    '10:30 AM – 12:00 PM',
    '9:00 AM – 10:30 AM',
    '7:30 AM – 9:00 AM',
    '6:00 AM – 7:30 AM',
    '3:00 PM – 4:30 PM',
    '1:30 PM – 3:00 PM'
  ],

  // Known Amavasya (New Moon) reference date
  REF_NEW_MOON: new Date(2025, 0, 29),

  /**
   * Calculate panchangam for a given date
   * Future: replace with fetch('/api/panchangam?date=YYYY-MM-DD')
   * @param {Date} date
   * @returns {Object} panchangam data
   */
  calculate(date = new Date()) {
    const day     = date.getDay();
    const diffMs  = date - this.REF_NEW_MOON;
    const diffDay = diffMs / 86400000;

    // Moon age in current cycle
    const moonAge = ((diffDay % 29.53) + 29.53) % 29.53;
    const paksha  = moonAge < 14.77 ? 'శుక్ల పక్షం' : 'కృష్ణ పక్షం';

    // Tithi
    let tIdx = Math.floor(moonAge / 29.53 * 30);
    if (tIdx >= 15) tIdx -= 15;
    if (tIdx >= 15) tIdx  = 14;

    // Nakshatra (moon ~1 per day over 27.32 days)
    const refNak  = new Date(2025, 0, 1);
    const nDays   = (date - refNak) / 86400000;
    const nIdx    = Math.floor(((nDays * 27 / 27.32) % 27 + 27) % 27);

    // Yoga
    const yIdx    = Math.floor(((nDays * 1.0136) % 27 + 27) % 27);

    // Karana
    const kIdx    = Math.floor(moonAge / 29.53 * 60) % 11;

    return {
      tithi    : this.tithis[tIdx]    || this.tithis[0],
      paksha   : paksha,
      nakshatra: this.nakshatras[nIdx],
      yoga     : this.yogas[yIdx],
      karana   : this.karanas[kIdx],
      rahuKalam: this.rahuKalam[day],
      yamaganda: this.yamaganda[day],
      vara     : ['ఆదివారం','సోమవారం','మంగళవారం','బుధవారం','గురువారం','శుక్రవారం','శనివారం'][day]
    };
  },

  /**
   * Render panchangam to DOM elements
   * Element IDs: p-tithi, p-paksha, p-nakshatra, p-yoga,
   *              p-karana, p-rahu, p-yama, p-vara
   */
  render() {
    const p   = this.calculate();
    const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    set('p-tithi',     p.tithi);
    set('p-paksha',    p.paksha);
    set('p-nakshatra', p.nakshatra);
    set('p-yoga',      p.yoga);
    set('p-karana',    p.karana);
    set('p-rahu',      p.rahuKalam);
    set('p-yama',      p.yamaganda);
    set('p-vara',      p.vara);
  }
};

// Auto-render on page load
document.addEventListener('DOMContentLoaded', () => PANCHANGAM.render());

// ── Export for future Vue/Angular use ─────────────────────
// When migrating to Vue: import { PANCHANGAM } from '@/utils/panchangam.js'
if (typeof module !== 'undefined') module.exports = { PANCHANGAM };
