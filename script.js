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
