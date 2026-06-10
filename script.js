// ─── Mobile hamburger button ────────────────────────────────────────────────
const navbar = document.querySelector('.navbar');
if (navbar) {
  const btn = document.createElement('button');
  btn.className = 'hamburger-btn';
  btn.setAttribute('aria-label', 'Toggle menu');
  btn.innerHTML = '<span></span><span></span><span></span>';
  navbar.appendChild(btn);
  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    navbar.classList.toggle('nav-menu-open');
  });
}

// ─── Typewriter sub-line (hero) ──────────────────────────────────────────────
const typerText = document.querySelector('.typer-text');
if (typerText) {
  const phrases = [
    'demolishing a pizza 🍕',
    'getting lost in jazz 🎷',
    'chasing my dog around Central Park 🐕',
    'pretending to enjoy camping 🏕️',
    'people-watching over coffee ☕',
    'losing an argument to AI 🤖',
    'nudging pixels by 1px 📐',
  ];
  let phraseIndex = 0, charIndex = 0, deleting = false;
  function type() {
    const current = phrases[phraseIndex];
    typerText.textContent = deleting
      ? current.slice(0, --charIndex)
      : current.slice(0, ++charIndex);

    let delay = deleting ? 40 : 80;
    if (!deleting && charIndex === current.length) { delay = 1800; deleting = true; }
    else if (deleting && charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 400;
    }
    setTimeout(type, delay);
  }
  type();
}

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ─── Custom cursor: small grey double ring, site-wide ────────────────────────
if (!prefersReduced && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  const ring = document.createElement('div');
  ring.className = 'cursor-ring';
  ring.setAttribute('aria-hidden', 'true');
  document.body.appendChild(ring);

  window.addEventListener('mousemove', (e) => {
    ring.classList.add('is-visible');
    ring.style.left = e.clientX + 'px';
    ring.style.top = e.clientY + 'px';
  });
  document.addEventListener('mouseleave', () => ring.classList.remove('is-visible'));

  // grow when hovering interactive things
  const grow = () => ring.classList.add('is-hovering');
  const shrink = () => ring.classList.remove('is-hovering');
  document.querySelectorAll('a, button, [role="button"], .link-block-2, .link-block-2-copy')
    .forEach((el) => {
      el.addEventListener('mouseenter', grow);
      el.addEventListener('mouseleave', shrink);
    });
}

// ─── Vinyl Record Player ─────────────────────────────────────────────────────
(function () {
  const PLAY_KEY = 'vinyl_playing';
  const TIME_KEY = 'vinyl_time';

  const style = document.createElement('style');
  style.textContent = `
    .vp-player {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 9000;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      cursor: pointer;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
    }
    /* ── Body: white rounded square ── */
    .vp-body {
      position: relative;
      width: 54px;
      height: 54px;
      background: #f3f3f3;
      border-radius: 13px;
      box-shadow: 0 4px 18px rgba(0,0,0,0.45), 0 1px 3px rgba(0,0,0,0.25);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      transition: transform 0.15s ease, box-shadow 0.2s ease;
    }
    .vp-player:hover .vp-body {
      transform: scale(1.05);
      box-shadow: 0 6px 24px rgba(0,0,0,0.55), 0 1px 4px rgba(0,0,0,0.3);
    }
    /* ── Vinyl disc ── */
    .vp-disc {
      width: 43px;
      height: 43px;
      border-radius: 50%;
      position: relative;
      flex-shrink: 0;
      background: radial-gradient(
        circle at center,
        #090909 0%, #111 4%,
        /* orange label */
        #c84010 5%, #e8561a 9%, #f07030 22%, #e85820 28%, #bf3e0e 34%,
        /* label edge ring */
        #070707 35%, #111 37%,
        /* vinyl grooves - alternating rings */
        #1c1c1c 38%, #0e0e0e 40%, #1c1c1c 42%, #0e0e0e 44%,
        #1c1c1c 46%, #0e0e0e 48%, #1c1c1c 50%, #0e0e0e 52%,
        #1c1c1c 54%, #0e0e0e 56%, #1c1c1c 58%, #0e0e0e 60%,
        #1c1c1c 62%, #0e0e0e 64%, #1c1c1c 66%, #0e0e0e 68%,
        #1c1c1c 70%, #0e0e0e 72%, #1c1c1c 74%, #0e0e0e 76%,
        #1c1c1c 78%, #0e0e0e 80%, #1c1c1c 82%, #0e0e0e 84%,
        #1c1c1c 86%, #0e0e0e 88%, #1c1c1c 90%, #0e0e0e 92%,
        #181818 94%, #0e0e0e 97%, #1a1a1a 100%
      );
      /* subtle sheen */
      box-shadow: inset 0 1px 8px rgba(255,255,255,0.06);
    }
    /* spindle hole */
    .vp-disc::after {
      content: '';
      position: absolute;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      width: 5px; height: 5px;
      border-radius: 50%;
      background: #060606;
      border: 1px solid rgba(255,255,255,0.1);
    }
    /* label highlight */
    .vp-disc::before {
      content: '';
      position: absolute;
      top: 28%; left: 34%;
      width: 12%; height: 12%;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(255,255,255,0.45) 0%, transparent 70%);
      pointer-events: none;
    }
    @keyframes vinylSpin {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }
    .vp-disc.is-playing {
      animation: vinylSpin 2.2s linear infinite;
    }
    @media (prefers-reduced-motion: reduce) {
      .vp-disc.is-playing { animation: none; }
    }
    /* ── Tonearm (SVG overlay, never spins) ── */
    .vp-arm {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
      transform-origin: 47px 10px; /* pivot point scaled */
    }
    .vp-arm.is-lifted {
      transform: rotate(-18deg);
    }
    /* ── Status dot bottom-left (like reference) ── */
    .vp-dot {
      position: absolute;
      bottom: 6px;
      left: 7px;
      width: 4px; height: 4px;
      border-radius: 50%;
      background: #e8561a;
      opacity: 0.6;
      transition: opacity 0.3s, background 0.3s;
    }
    .vp-body.is-on .vp-dot {
      opacity: 1;
      background: #fa872f;
      box-shadow: 0 0 5px #fa872f;
    }
    /* ── Label below ── */
    .vp-hint {
      font-family: 'IBM Plex Mono', monospace;
      font-size: 9px;
      letter-spacing: 0.8px;
      text-transform: uppercase;
      color: rgba(255,255,255,0.3);
      transition: color 0.25s;
      white-space: nowrap;
    }
    .vp-player:hover .vp-hint { color: rgba(255,255,255,0.55); }
    .vp-body.is-on + .vp-hint  { color: #fa872f; }
  `;
  document.head.appendChild(style);

  // ── Markup ──
  const player = document.createElement('div');
  player.className = 'vp-player';
  player.setAttribute('role', 'button');
  player.setAttribute('aria-label', 'Toggle music');
  player.setAttribute('tabindex', '0');
  player.innerHTML = `
    <div class="vp-body">
      <div class="vp-disc" aria-hidden="true"></div>
      <!-- tonearm SVG -->
      <svg class="vp-arm" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="45" cy="10" r="3.2" fill="#d0d0d0" stroke="#b0b0b0" stroke-width="0.8"/>
        <circle cx="45" cy="10" r="1.4" fill="#a0a0a0"/>
        <line x1="45" y1="10" x2="25" y2="30" stroke="#c8c8c8" stroke-width="2" stroke-linecap="round"/>
        <rect x="20" y="28" width="8" height="3.5" rx="1"
              fill="#e2e2e2" stroke="#bbb" stroke-width="0.4"
              transform="rotate(-45 24 29.75)"/>
        <circle cx="21" cy="33" r="1" fill="#999"/>
      </svg>
      <div class="vp-dot"></div>
    </div>
    <span class="vp-hint">play</span>
  `;
  document.body.appendChild(player);

  // ── Audio ──
  const audio = new Audio();
  // Resolve base path from script tag so this works from any page depth
  const scriptEl = document.querySelector('script[src*="script.js"]');
  const base = scriptEl ? scriptEl.src.replace(/script\.js.*$/, '') : './';
  audio.src = base + 'assets/wave.mp3';
  audio.loop = true;
  audio.volume = 0.4;
  audio.preload = 'none';

  const disc  = player.querySelector('.vp-disc');
  const body  = player.querySelector('.vp-body');
  const arm   = player.querySelector('.vp-arm');
  const hint  = player.querySelector('.vp-hint');
  let playing = false;

  function setPlaying(on) {
    playing = on;
    if (on) {
      disc.classList.add('is-playing');
      body.classList.add('is-on');
      arm.classList.remove('is-lifted');
      hint.textContent = 'pause';
    } else {
      disc.classList.remove('is-playing');
      body.classList.remove('is-on');
      arm.classList.add('is-lifted');
      hint.textContent = 'play';
    }
    sessionStorage.setItem(PLAY_KEY, on ? '1' : '0');
  }

  function toggle() {
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().catch(() => {});
      setPlaying(true);
    }
  }

  player.addEventListener('click', toggle);
  player.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
  });

  // ── Persist playback across page navigations ──
  // Save position frequently
  setInterval(() => {
    if (playing) sessionStorage.setItem(TIME_KEY, audio.currentTime);
  }, 800);

  // Save on unload
  window.addEventListener('pagehide', () => {
    sessionStorage.setItem(TIME_KEY, audio.currentTime);
    sessionStorage.setItem(PLAY_KEY, playing ? '1' : '0');
  });

  // Restore state on page load
  const wasPlaying = sessionStorage.getItem(PLAY_KEY) === '1';
  const savedTime  = parseFloat(sessionStorage.getItem(TIME_KEY) || '0');

  // Start lifted if not playing
  if (!wasPlaying) arm.classList.add('is-lifted');

  if (wasPlaying) {
    audio.addEventListener('canplay', function resume() {
      audio.removeEventListener('canplay', resume);
      audio.currentTime = savedTime || 0;
      audio.play()
        .then(() => setPlaying(true))
        .catch(() => {
          // autoplay blocked — show a nudge state
          arm.classList.add('is-lifted');
          hint.textContent = 'resume';
          hint.style.color = 'rgba(250,135,47,0.7)';
        });
    }, { once: true });
    audio.load();
  }
}());
