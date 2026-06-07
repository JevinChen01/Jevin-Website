// Navbar scroll shadow
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 10);
});

// Mobile hamburger
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Typewriter
const phrases = [
  'designing at Bridgify',
  'solving UX problems',
  'crafting human-centric solutions',
  'open to new opportunities',
];

const el = document.getElementById('first-typer');
let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function type() {
  const current = phrases[phraseIndex];
  if (deleting) {
    el.textContent = current.slice(0, --charIndex);
  } else {
    el.textContent = current.slice(0, ++charIndex);
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
