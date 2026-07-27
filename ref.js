/* ==========================================================================
   Nabeel & Farhana — Wedding Invitation
   All editable content lives in weddingData below.
   ========================================================================== */

const weddingData = {
  groomName: "Muhammed Nabeel AS",
  brideName: "Farhana N",
  weddingDate: "2026-08-15", // YYYY-MM-DD
  weddingTime: "12:00",      // 24hr HH:MM, local venue time (IST, UTC+5:30)
  venue: "K.T.C.T Auditorium",
  address: "Kaduvayil, Thottakadu",
  googleMaps: "", // paste a direct Google Maps link here to override the auto-search link
  rsvpNumber: "", // leave blank — RSVP button is disabled for this invitation
  parents: {
    groom: "Son of Mr. Abdul Aleem & Mrs. Seenamol, Marancode, Thottakadu P.O, Kallambalam",
    bride: "Daughter of Mr. Nazar A (Late) & Zeenath Beevi, Firdous, Erattakalingu, Chirayinkeezhu P.O"
  },
  theme: {
    primary: "#4d1420",
    secondary: "#cfaa6b",
    background: "#fbf5ea",
    text: "#2a1712"
  },
  music: "assets/music/music.mp3"
};

document.addEventListener("DOMContentLoaded", () => {
  initPreloader();
  initArchReveal();
  initCountdown();
  initMusicToggle();
  initSideNav();
  initMapsLink();
  initAOS();
  initHeroParallax();
});

/* ---------------------------------- Preloader ---------------------------------- */
function initPreloader() {
  const el = document.getElementById("preloader");
  if (!el) return;
  window.addEventListener("load", () => {
    setTimeout(() => el.classList.add("is-hidden"), 500);
  });
  // fallback in case 'load' is slow/blocked
  setTimeout(() => el.classList.add("is-hidden"), 3200);
}

/* ---------------------------------- Arch reveal (signature interaction) ---------------------------------- */
function initArchReveal() {
  const cta = document.getElementById("archCta");
  const frame = document.getElementById("archFrame");
  const stage = document.getElementById("heroStage");
  const hero = document.getElementById("hero");
  const music = document.getElementById("bgMusic");
  const musicBtn = document.getElementById("musicToggle");

  if (!cta || !frame || !stage) return;

  const openArch = () => {
    frame.classList.add("is-open");
    stage.classList.add("is-revealed");
    if (hero) hero.classList.add("is-open");
    spawnRingParticles();

    // Try to start music softly on first user interaction (autoplay-safe)
    if (music && musicBtn && !musicBtn.hidden) {
      music.volume = 0.55;
      music.play().then(() => {
        musicBtn.classList.add("is-playing");
      }).catch(() => {
        /* autoplay blocked — user can tap the music button manually */
      });
    }
  };

  cta.addEventListener("click", openArch);
  cta.addEventListener("keyup", (e) => {
    if (e.key === "Enter" || e.key === " ") openArch();
  });
}

/* ---------------------------------- Ring particle burst (played when the arch opens) ---------------------------------- */
function spawnRingParticles() {
  const holder = document.getElementById("ringParticles");
  if (!holder || holder.dataset.played) return;
  holder.dataset.played = "true"; // only ever fire once per page load

  const RING_SVG = (size, hue) => `
    <svg viewBox="0 0 40 40" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="15" fill="none" stroke="${hue}" stroke-width="2.4"/>
    </svg>`;

  const COUNT = 16;
  for (let i = 0; i < COUNT; i++) {
    const p = document.createElement("span");
    p.className = "ring-particle";

    const size = 14 + Math.random() * 22;
    const hue = Math.random() > 0.5 ? "#e2c793" : "#cfaa6b";
    p.innerHTML = RING_SVG(size, hue);

    // start scattered roughly across the arch, drift outward + upward
    const startX = 50 + (Math.random() * 60 - 30); // % from center
    const drift = (Math.random() * 220 - 110); // px horizontal drift
    const rise = 260 + Math.random() * 220; // px vertical travel
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

/* ---------------------------------- Countdown ---------------------------------- */
function initCountdown() {
  const daysEl = document.getElementById("cd-days");
  const hoursEl = document.getElementById("cd-hours");
  const minsEl = document.getElementById("cd-mins");
  const secsEl = document.getElementById("cd-secs");
  if (!daysEl) return;

  // Venue is in India (IST, UTC+05:30)
  const target = new Date(`${weddingData.weddingDate}T${weddingData.weddingTime}:00+05:30`).getTime();

  const pad = (n) => String(Math.max(n, 0)).padStart(2, "0");

  function tick() {
    const now = Date.now();
    const diff = target - now;

    if (diff <= 0) {
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minsEl.textContent = "00";
      secsEl.textContent = "00";
      clearInterval(timer);
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    daysEl.textContent = pad(days);
    hoursEl.textContent = pad(hours);
    minsEl.textContent = pad(mins);
    secsEl.textContent = pad(secs);
  }

  tick();
  const timer = setInterval(tick, 1000);
}

/* ---------------------------------- Music toggle ---------------------------------- */
function initMusicToggle() {
  const btn = document.getElementById("musicToggle");
  const audio = document.getElementById("bgMusic");
  if (!btn || !audio || !weddingData.music) return;

  // Only reveal the button once we know the audio file actually exists / can play
  audio.addEventListener("canplaythrough", () => { btn.hidden = false; }, { once: true });
  audio.addEventListener("error", () => { btn.hidden = true; });
  audio.src = weddingData.music;
  audio.load();

  btn.addEventListener("click", () => {
    if (audio.paused) {
      audio.play().then(() => btn.classList.add("is-playing")).catch(() => {});
    } else {
      audio.pause();
      btn.classList.remove("is-playing");
    }
  });
}

/* ---------------------------------- Side nav active state ---------------------------------- */
function initSideNav() {
  const dots = document.querySelectorAll(".side-nav__dot");
  const sections = Array.from(dots).map((d) => document.querySelector(d.getAttribute("href")));
  if (!dots.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const idx = sections.indexOf(entry.target);
      dots.forEach((d) => d.removeAttribute("aria-current"));
      if (dots[idx]) dots[idx].setAttribute("aria-current", "true");
    });
  }, { threshold: 0.5 });

  sections.forEach((s) => s && observer.observe(s));
}

/* ---------------------------------- Google Maps link ---------------------------------- */
function initMapsLink() {
  const link = document.getElementById("mapsBtn");
  if (!link) return;
  if (weddingData.googleMaps) {
    link.href = weddingData.googleMaps;
  } else {
    const query = encodeURIComponent(`${weddingData.venue}, ${weddingData.address}`);
    link.href = `https://www.google.com/maps/search/?api=1&query=${query}`;
  }
}

/* ---------------------------------- AOS init ---------------------------------- */
function initAOS() {
  if (window.AOS) {
    AOS.init({ duration: 900, easing: "ease-out-cubic", once: true, offset: 60 });
  }
}

/* ---------------------------------- Subtle hero parallax (GSAP if available) ---------------------------------- */
function initHeroParallax() {
  const bg = document.querySelector(".hero__bg-photo");
  if (!bg) return;

  if (window.gsap) {
    gsap.to(bg, {
      yPercent: 8,
      ease: "none",
      scrollTrigger: undefined // ScrollTrigger plugin not loaded; keep this simple & dependency-light
    });
  }

  // lightweight manual parallax without needing the ScrollTrigger plugin
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      const heroHeight = document.querySelector(".hero").offsetHeight;
      if (y < heroHeight) {
        bg.style.transform = `scale(1.06) translateY(${y * 0.08}px)`;
      }
      ticking = false;
    });
  }, { passive: true });
}
