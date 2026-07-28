/* ════════════════════════════════════════
   WEDDING INVITATION JS – Farsana & Haseeb
   ════════════════════════════════════════ */

// ─── COUNTDOWN TIMER ─────────────────────────────────────────
(function initCountdown() {
  const weddingDate = new Date('2026-09-14T16:30:00+05:30');

  function pad(n) { return String(n).padStart(2, '0'); }

  function tick() {
    const now  = new Date();
    const diff = weddingDate - now;

    if (diff <= 0) {
      document.getElementById('days').textContent    = '00';
      document.getElementById('hours').textContent   = '00';
      document.getElementById('minutes').textContent = '00';
      document.getElementById('seconds').textContent = '00';
      return;
    }

    const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    animateNumber('days',    pad(days));
    animateNumber('hours',   pad(hours));
    animateNumber('minutes', pad(minutes));
    animateNumber('seconds', pad(seconds));
  }

  function animateNumber(id, value) {
    const el = document.getElementById(id);
    if (!el) return;
    if (el.textContent !== value) {
      el.style.transform = 'scale(1.2)';
      el.style.color = 'var(--gold)';
      setTimeout(() => {
        el.textContent = value;
        el.style.transform = 'scale(1)';
        el.style.color = '';
      }, 150);
    }
  }

  tick();
  setInterval(tick, 1000);
})();

// ─── FLOATING PARTICLES ──────────────────────────────────────
(function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const count = 30;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    const size = Math.random() * 5 + 2;
    const left = Math.random() * 100;
    const duration = Math.random() * 15 + 10;
    const delay = Math.random() * 10;
    const opacity = Math.random() * 0.5 + 0.1;

    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${left}%;
      bottom: -10px;
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
      opacity: ${opacity};
      background: ${Math.random() > 0.5 ? '#D4AF37' : '#c9a227'};
    `;
    container.appendChild(p);
  }
})();

// ─── SCROLL ANIMATIONS ───────────────────────────────────────
(function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  // Add fade-in class to key sections
  const sections = document.querySelectorAll(
    '.countdown-section, .invitation-section, .couple-section, .event-section, .glimpses-section, .quote-section'
  );
  sections.forEach(sec => {
    sec.style.opacity = '0';
    sec.style.transform = 'translateY(30px)';
    sec.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(sec);
  });

  // IntersectionObserver callback adds 'visible' class
  const styleEl = document.createElement('style');
  styleEl.textContent = `
    .countdown-section.visible,
    .invitation-section.visible,
    .couple-section.visible,
    .event-section.visible,
    .glimpses-section.visible,
    .quote-section.visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(styleEl);
})();

// ─── PERSON CARDS STAGGER ────────────────────────────────────
(function staggerCards() {
  const cards = document.querySelectorAll('.person-card, .count-box');
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) scale(1)';
          }, i * 120);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(24px) scale(0.97)';
    card.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    obs.observe(card);
  });
})();

// ─── IMAGE FALLBACK ──────────────────────────────────────────
(function handleImageFallback() {
  const brideImg = document.getElementById('bride-img');
  const groomImg = document.getElementById('groom-img');

  function setupFallback(img) {
    if (!img) return;
    img.addEventListener('error', function () {
      this.style.display = 'none';
      const fallback = this.parentElement.querySelector('.photo-fallback');
      if (fallback) fallback.style.display = 'flex';
    });
  }

  setupFallback(brideImg);
  setupFallback(groomImg);
})();

// ─── SMOOTH SCROLL ────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ─── LOCATION BUTTON RIPPLE ───────────────────────────────────
document.querySelectorAll('.btn-loc').forEach(btn => {
  btn.addEventListener('click', function (e) {
    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position: absolute;
      width: 10px; height: 10px;
      background: rgba(255,255,255,0.4);
      border-radius: 50%;
      pointer-events: none;
      transform: scale(0);
      animation: rippleAnim 0.6s ease-out;
      left: ${e.offsetX - 5}px;
      top: ${e.offsetY - 5}px;
    `;
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// Ripple keyframe
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  @keyframes rippleAnim {
    to { transform: scale(20); opacity: 0; }
  }
`;
document.head.appendChild(rippleStyle);

// Initialize Lucide vector icons
if (window.lucide) {
  lucide.createIcons();
}

// ─── BACKGROUND MUSIC PLAYER ──────────────────────────────────
(function initMusicPlayer() {
  const musicBtn = document.createElement('button');
  musicBtn.className = 'music-toggle';
  musicBtn.setAttribute('aria-label', 'Toggle Music');
  musicBtn.innerHTML = '<i data-lucide="volume-x"></i>';
  document.body.appendChild(musicBtn);

  const audio = document.createElement('audio');
  audio.id = 'bg-music';
  audio.src = 'song.mp3';
  audio.loop = true;
  document.body.appendChild(audio);

  let isPlaying = false;

  function togglePlay() {
    if (isPlaying) {
      audio.pause();
      musicBtn.classList.remove('playing');
      musicBtn.innerHTML = '<i data-lucide="volume-x"></i>';
      if (window.lucide) lucide.createIcons();
    } else {
      audio.play().then(() => {
        musicBtn.classList.add('playing');
        musicBtn.innerHTML = '<i data-lucide="volume-2"></i>';
        if (window.lucide) lucide.createIcons();
        startFloatingNotes();
      }).catch(err => console.log("Autoplay prevented:", err));
    }
    isPlaying = !isPlaying;
  }

  musicBtn.addEventListener('click', togglePlay);

  // Attempt to play on first user interaction (scroll or click)
  function handleFirstInteraction() {
    if (!isPlaying) {
      togglePlay();
    }
    window.removeEventListener('click', handleFirstInteraction);
    window.removeEventListener('scroll', handleFirstInteraction);
  }
  window.addEventListener('click', handleFirstInteraction);
  window.addEventListener('scroll', handleFirstInteraction);

  // Floating music notes effect
  let noteInterval;
  function startFloatingNotes() {
    if (noteInterval) clearInterval(noteInterval);
    noteInterval = setInterval(() => {
      if (!isPlaying) {
        clearInterval(noteInterval);
        return;
      }
      const note = document.createElement('span');
      note.className = 'music-note';
      note.textContent = Math.random() > 0.5 ? '🎵' : '🎶';
      const btnRect = musicBtn.getBoundingClientRect();
      note.style.left = `${btnRect.left + 15 + Math.random() * 20}px`;
      note.style.top = `${btnRect.top + window.scrollY - 10}px`;
      note.style.position = 'absolute';
      document.body.appendChild(note);
      setTimeout(() => note.remove(), 2000);
    }, 800);
  }
})();

// Lock body scroll on load
document.body.classList.add('scroll-locked');

// Preloader Hide
(function initPreloader() {
  const el = document.getElementById("preloader");
  if (!el) return;
  window.addEventListener("load", () => {
    setTimeout(() => el.classList.add("is-hidden"), 500);
  });
  setTimeout(() => el.classList.add("is-hidden"), 3000);
})();

// Arch Reveal (signature door opening)
(function initArchReveal() {
  const cta = document.getElementById("archCta");
  const frame = document.getElementById("archFrame");
  const hero = document.getElementById("hero");

  if (!cta || !frame) return;

  function openArch() {
    frame.classList.add("is-open");
    if (hero) hero.classList.add("is-open");
    document.body.classList.remove('scroll-locked');
    spawnRingParticles();

    // Trigger the music to play automatically on opening
    const musicBtn = document.querySelector('.music-toggle');
    if (musicBtn && !musicBtn.classList.contains('playing')) {
      musicBtn.click();
    }
  }

  cta.addEventListener("click", openArch);
  cta.addEventListener("keyup", (e) => {
    if (e.key === "Enter" || e.key === " ") openArch();
  });
})();

// Ring particle burst (played when the arch opens)
function spawnRingParticles() {
  const holder = document.getElementById("ringParticles");
  if (!holder || holder.dataset.played) return;
  holder.dataset.played = "true";

  const RING_SVG = (size, hue) => `
    <svg viewBox="0 0 40 40" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="15" fill="none" stroke="${hue}" stroke-width="2.4"/>
    </svg>`;

  const COUNT = 16;
  for (let i = 0; i < COUNT; i++) {
    const p = document.createElement("span");
    p.className = "ring-particle";

    const size = 14 + Math.random() * 22;
    const hue = Math.random() > 0.5 ? "#D4AF37" : "#ede0c8";
    p.innerHTML = RING_SVG(size, hue);

    const startX = 50 + (Math.random() * 60 - 30);
    const drift = (Math.random() * 220 - 110);
    const rise = 260 + Math.random() * 220;
    const rotate = (Math.random() * 360 - 180).toFixed(0);
    const delay = (Math.random() * 0.35).toFixed(2);
    const duration = (2.2 + Math.random() * 1.4).toFixed(2);

    p.style.left = `${startX}%`;
    p.style.setProperty("--drift", `${drift}px`);
    p.style.setProperty("--rise", `-${rise}px`);
    p.style.setProperty("--rotate", `${rotate}deg`);
    p.style.animationDelay = `${delay}s`;
    p.style.animationDuration = `${duration}s`;

    holder.appendChild(p);
    setTimeout(() => p.remove(), (parseFloat(duration) + parseFloat(delay)) * 1000 + 200);
  }
}

console.log('💍 Athira & Vinay Reception Website Loaded');

// ─── RSVP FORM ───────────────────────────────────────────────
(function initRSVP() {
  // ── Replace PASTE_YOUR_SCRIPT_ID_HERE with your deployment ID ──
  const SCRIPT_URL  = 'https://script.google.com/macros/s/AKfycbzKhE5qZzlExCRzch_W3ysqqxfnLcJDK6_boVBSIyzIutKmzEUqfhbZyC92Xi5AIuv2dw/exec';
  const STORAGE_KEY = 'athira_vinay_rsvp';

  const rsvpForm    = document.getElementById('rsvp-form');
  const rsvpSuccess = document.getElementById('rsvp-success');
  const editRsvpBtn = document.getElementById('edit-rsvp-btn');
  const guestsGroup = document.getElementById('guests-group');
  const guestsInput = document.getElementById('rsvp-guests');
  const attendYes   = document.getElementById('attend-yes');
  const attendNo    = document.getElementById('attend-no');

  if (!rsvpForm) return;

  // ── Show/hide guest count based on attendance choice ────────
  function syncGuestField() {
    const attending = attendYes && attendYes.checked;
    if (guestsGroup) guestsGroup.style.display = attending ? 'block' : 'none';
    if (guestsInput) {
      if (attending) {
        if (!guestsInput.value || guestsInput.value === '0') guestsInput.value = '1';
        guestsInput.setAttribute('required', 'true');
      } else {
        guestsInput.value = '0';
        guestsInput.removeAttribute('required');
      }
    }
  }

  if (attendYes && attendNo) {
    attendYes.addEventListener('change', syncGuestField);
    attendNo.addEventListener('change',  syncGuestField);
  }
  syncGuestField();

  // ── If already submitted, restore success state ─────────────
  const existing = localStorage.getItem(STORAGE_KEY);
  if (existing) showSuccessState(JSON.parse(existing));

  // ── Form submit ─────────────────────────────────────────────
  rsvpForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const checkedAttendance = document.querySelector('input[name="attendance"]:checked');
    if (!checkedAttendance) return;

    const attendance = checkedAttendance.value;                              // "Yes, InshaAllah" or "Sorry, I can't attend"
    const name       = document.getElementById('rsvp-name').value.trim();
    const mobile     = document.getElementById('rsvp-mobile').value.trim();
    const guests     = attendance.toLowerCase().includes('yes')
                         ? (parseInt(guestsInput ? guestsInput.value : '1') || 1)
                         : 0;
    const message    = document.getElementById('rsvp-message')
                         ? document.getElementById('rsvp-message').value.trim()
                         : '';

    if (!name)   { document.getElementById('rsvp-name').focus();   return; }
    if (!mobile) { document.getElementById('rsvp-mobile').focus(); return; }

    const submitBtn    = rsvpForm.querySelector('.rsvp-submit-btn');
    const originalText = submitBtn ? submitBtn.innerText : '';
    if (submitBtn) { submitBtn.innerText = 'Submitting…'; submitBtn.disabled = true; }

    // Payload columns match the Apps Script header row:
    // Full Name | Mobile Number | Attendance Status | Number of Guests | Message for the Couple
    const payload = {
      sheetName:  'Sheet1',
      name,
      mobile,
      attendance,
      guests,
      message
    };

    try {
      await fetch(SCRIPT_URL, {
        method:  'POST',
        mode:    'no-cors',           // Apps Script doesn't send CORS headers by default
        headers: { 'Content-Type': 'text/plain' },
        body:    JSON.stringify(payload)
      });
    } catch (err) {
      console.warn('Sheet submit failed (saved locally):', err);
    } finally {
      if (submitBtn) { submitBtn.innerText = originalText; submitBtn.disabled = false; }
    }

    // Always save locally so the success state survives a page refresh
    const rsvpRecord = { attendance, name, mobile, guests, message, savedAt: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rsvpRecord));

    showSuccessState(rsvpRecord);
    rsvpForm.reset();
    syncGuestField();
  });

  // ── Edit button — re-open form with saved data ───────────────
  if (editRsvpBtn) {
    editRsvpBtn.addEventListener('click', () => {
      if (rsvpSuccess) rsvpSuccess.style.display = 'none';
      rsvpForm.style.display = 'block';

      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const d = JSON.parse(saved);
        const isYes = d.attendance.toLowerCase().includes('yes');
        if (attendYes) attendYes.checked = isYes;
        if (attendNo)  attendNo.checked  = !isYes;
        syncGuestField();
        if (guestsInput && isYes) guestsInput.value = d.guests;
        const nameEl    = document.getElementById('rsvp-name');
        const mobileEl  = document.getElementById('rsvp-mobile');
        const messageEl = document.getElementById('rsvp-message');
        if (nameEl)    nameEl.value    = d.name;
        if (mobileEl)  mobileEl.value  = d.mobile;
        if (messageEl) messageEl.value = d.message;
      }
    });
  }

  // ── Success state renderer ───────────────────────────────────
  function showSuccessState(data) {
    rsvpForm.style.display = 'none';
    if (rsvpSuccess) rsvpSuccess.style.display = 'block';

    const para = rsvpSuccess ? rsvpSuccess.querySelector('.rsvp-success__text') : null;
    if (!para) return;

    if (data.attendance.toLowerCase().includes('yes')) {
      para.innerHTML = `
        Your RSVP has been received!<br>
        <strong>Attending:</strong> Yes, I will be there
        ${data.guests > 0 ? '&nbsp;(' + data.guests + ' guest' + (data.guests > 1 ? 's' : '') + ')' : ''}<br>
        We look forward to welcoming you on the big day! 🎉
      `;
    } else {
      para.innerHTML = `
        Your response has been received.<br>
        <strong>Attending:</strong> Sorry, I can't attend.<br>
        Thank you for letting us know. Your blessings mean a lot! 🤍
      `;
    }
  }

})();

