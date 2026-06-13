const cursorGlow = document.querySelector('.cursor-glow');
const root = document.documentElement;

window.addEventListener('mousemove', (event) => {
  if (cursorGlow) {
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
  }
  const x = (event.clientX / window.innerWidth - 0.5).toFixed(3);
  const y = (event.clientY / window.innerHeight - 0.5).toFixed(3);
  root.style.setProperty('--mouse-x', x);
  root.style.setProperty('--mouse-y', y);
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const backgroundA = document.querySelector('.bg-a');
const backgroundB = document.querySelector('.bg-b');
const holos = document.querySelectorAll('.holo');

window.addEventListener('scroll', () => {
  const scroll = window.scrollY;
  if (backgroundA) backgroundA.style.transform = `translateY(${scroll * 0.035}px) scale(1.04)`;
  if (backgroundB) backgroundB.style.transform = `translateY(${scroll * 0.07}px) scale(1.08)`;
  holos.forEach((holo, index) => {
    holo.style.transform = `translateY(${scroll * (0.02 + index * 0.01)}px) skewX(-10deg)`;
  });
});

const internalLinks = document.querySelectorAll('a[href^="#"]');
internalLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

const cards = document.querySelectorAll('.glass-card, .mission, .portrait-card, .contact-panel, .timeline-item');
cards.forEach((card) => {
  card.addEventListener('pointermove', (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    card.style.backgroundImage = `radial-gradient(circle at ${x}px ${y}px, rgba(94,234,255,.13), transparent 34%), linear-gradient(135deg, rgba(9,25,48,.78), rgba(18,8,35,.78))`;
  });
  card.addEventListener('pointerleave', () => {
    card.style.backgroundImage = '';
  });
});
