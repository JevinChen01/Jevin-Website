// Mobile hamburger toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelectorAll('.navigation-bar');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.forEach(link => link.classList.toggle('nav-open'));
});

// Typewriter on first-typer span
const el = document.getElementById('first-typer');
const originalText = el.textContent;

const phrases = [
  'designing at Bridgify',
  'solving UX problems',
  'crafting human-centric solutions',
  'open to new opportunities',
];

let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

// Replace element content with typed span + static description below
el.innerHTML = '';
const typedSpan = document.createElement('span');
typedSpan.style.color = 'var(--orange)';
const cursor = document.createElement('span');
cursor.textContent = '|';
cursor.style.cssText = 'color:var(--orange);animation:blink 0.9s step-start infinite';

const style = document.createElement('style');
style.textContent = '@keyframes blink{50%{opacity:0}}';
document.head.appendChild(style);

el.appendChild(document.createTextNode('\n\n'));
el.appendChild(typedSpan);
el.appendChild(cursor);
el.appendChild(document.createTextNode('\n\nProduct Designer with UX/UI, Visual, Design Management experience  |  SCAD graduate  |  Based in New York'));

function type() {
  const current = phrases[phraseIndex];
  if (deleting) {
    typedSpan.textContent = current.slice(0, --charIndex);
  } else {
    typedSpan.textContent = current.slice(0, ++charIndex);
  }

  let delay = deleting ? 40 : 80;
  if (!deleting && charIndex === current.length) {
    delay = 1800;
    deleting = true;
  } else if (deleting && charIndex === 0) {
    deleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    delay = 400;
  }
  setTimeout(type, delay);
}

type();
