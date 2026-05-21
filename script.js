// ── Navigation ──
const navbar = document.getElementById('navbar');
const navLinks = document.getElementById('navLinks');
const hamburger = document.getElementById('hamburger');

function toggleNav() {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
}
function closeNav() {
  navLinks.classList.remove('open');
  hamburger.classList.remove('active');
}

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ── Scroll Reveal ──
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('active'), i * 100);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
revealElements.forEach(el => revealObserver.observe(el));

// ── Counter Animation ──
function animateCounter(el, target, duration = 2000) {
  let start = 0;
  const step = Math.ceil(target / (duration / 16));
  const timer = setInterval(() => {
    start += step;
    if (start >= target) { start = target; clearInterval(timer); }
    el.textContent = start + '+';
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(document.getElementById('counterProjects'), 6);
      animateCounter(document.getElementById('counterRepos'), 20);
      animateCounter(document.getElementById('counterInternships'), 3);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
const heroStats = document.querySelector('.hero-stats');
if (heroStats) counterObserver.observe(heroStats);

// ── Smooth scroll for all anchor links ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// ── Active nav highlight ──
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) {
      if (scrollY >= top && scrollY < top + height) {
        link.style.color = 'var(--accent-cyan)';
      } else {
        link.style.color = '';
      }
    }
  });
});

// ── Parallax float badges ──
window.addEventListener('mousemove', (e) => {
  const badges = document.querySelectorAll('.avatar-float-badge');
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  badges.forEach((badge, i) => {
    const factor = i === 0 ? 1 : -1;
    badge.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
  });
});

// ── Skill tags hover ripple ──
document.querySelectorAll('.skill-tag').forEach(tag => {
  tag.addEventListener('mouseenter', function () {
    this.style.transform = 'scale(1.08)';
  });
  tag.addEventListener('mouseleave', function () {
    this.style.transform = 'scale(1)';
  });
});

// ── Contact form handler (EmailJS) ──
// Initialize EmailJS with your public key
emailjs.init('HRttN8QprKqVKMA-i');

const contactForm = document.getElementById('contactForm');
const formResult = document.getElementById('formResult');
const submitBtn = document.getElementById('submitBtn');

contactForm.addEventListener('submit', function (e) {
  e.preventDefault();
  
  submitBtn.disabled = true;
  submitBtn.innerHTML = '⏳ Sending...';
  formResult.style.display = 'none';

  emailjs.sendForm('service_68c1f29', 'template_14ntxtc', contactForm)
    .then(() => {
      formResult.style.display = 'block';
      formResult.style.color = '#10b981';
      formResult.innerHTML = '✅ Message sent successfully! I\'ll get back to you soon.';
      contactForm.reset();
    })
    .catch((error) => {
      formResult.style.display = 'block';
      formResult.style.color = '#ef4444';
      formResult.innerHTML = '❌ Something went wrong. Please email me at arjunv12214@gmail.com';
      console.error('EmailJS error:', error);
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '🚀 Send Message';
      setTimeout(() => { formResult.style.display = 'none'; }, 5000);
    });
});

// ── Clickable project cards + Tilt effect ──
document.querySelectorAll('.project-card').forEach(card => {
  const href = card.getAttribute('data-href');
  if (href) {
    card.style.cursor = 'pointer';
    card.addEventListener('click', (e) => {
      // Don't navigate if user clicked a link inside the card
      if (e.target.closest('.project-links a')) return;
      window.open(href, '_blank');
    });
  }
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
  });
});

console.log('%c🛡️ Arjun V — Portfolio', 'color: #00d4ff; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with passion for cybersecurity & code.', 'color: #7c3aed; font-size: 12px;');
