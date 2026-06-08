// Inject mobile hamburger button into navbar
const navbar = document.querySelector('.navbar');
const btn = document.createElement('button');
btn.className = 'hamburger-btn';
btn.setAttribute('aria-label', 'Toggle menu');
btn.innerHTML = '<span></span><span></span><span></span>';
navbar.appendChild(btn);

btn.addEventListener('click', () => {
  btn.classList.toggle('open');
  navbar.classList.toggle('nav-menu-open');
});

// Typewriter
const typerText = document.querySelector('.typer-text');
const phrases = [
  'designing at Bridgify',
  'solving UX problems',
  'crafting human-centric solutions',
  'open to new opportunities',
];

let phraseIndex = 0, charIndex = 0, deleting = false;

function type() {
  const current = phrases[phraseIndex];
  typerText.textContent = deleting
    ? current.slice(0, --charIndex)
    : current.slice(0, ++charIndex);

  let delay = deleting ? 40 : 80;
  if (!deleting && charIndex === current.length) { delay = 1800; deleting = true; }
  else if (deleting && charIndex === 0) { deleting = false; phraseIndex = (phraseIndex + 1) % phrases.length; delay = 400; }

  setTimeout(type, delay);
}

type();
