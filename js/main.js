const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const backTop = document.getElementById('backTop');
const cursor = document.querySelector('.cursor');
const cursorRing = document.querySelector('.cursor-ring');
const interactiveSelector = 'a, button, .project-card, .pstep, input, textarea';
const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'contact']
  .map((id) => document.getElementById(id))
  .filter(Boolean);
const navLinks = Array.from(document.querySelectorAll('.nav-links a'));
const mobileLinks = Array.from(document.querySelectorAll('#mobileMenu a'));
const fadeIns = Array.from(document.querySelectorAll('.fade-in'));

const isDesktopPointer = window.matchMedia('(pointer: fine)').matches && !window.matchMedia('(hover: none)').matches;

if (isDesktopPointer && cursor && cursorRing) {
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  const updateCursor = () => {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    cursor.style.opacity = '1';
    cursorRing.style.opacity = '1';
    cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
    requestAnimationFrame(updateCursor);
  };

  document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
  });

  document.addEventListener('mouseover', (event) => {
    if (event.target.closest(interactiveSelector)) {
      cursorRing.classList.add('hovering');
    }
  });

  document.addEventListener('mouseout', (event) => {
    if (event.target.closest(interactiveSelector)) {
      cursorRing.classList.remove('hovering');
    }
  });

  requestAnimationFrame(updateCursor);
}

const setMobileMenu = (open) => {
  if (!hamburger || !mobileMenu) {
    return;
  }

  hamburger.classList.toggle('open', open);
  mobileMenu.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', String(open));
  mobileMenu.setAttribute('aria-hidden', String(!open));
};

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    setMobileMenu(!mobileMenu.classList.contains('open'));
  });

  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => setMobileMenu(false));
  });
}

const setActiveLink = (id) => {
  navLinks.forEach((link) => {
    const isActive = link.getAttribute('href') === `#${id}`;
    link.classList.toggle('active', isActive);
  });
};

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActiveLink(entry.target.id);
      }
    });
  }, { threshold: 0.45, rootMargin: '-10% 0px -40% 0px' });

  sections.forEach((section) => observer.observe(section));

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });

  fadeIns.forEach((element) => fadeObserver.observe(element));
} else {
  fadeIns.forEach((element) => element.classList.add('visible'));
}

const updateNavbarState = () => {
  const scrollY = window.scrollY || window.pageYOffset;
  navbar?.classList.toggle('scrolled', scrollY > 60);
  backTop?.classList.toggle('show', scrollY > 400);
};

window.addEventListener('scroll', updateNavbarState, { passive: true });
updateNavbarState();

const smoothScrollHandler = (event) => {
  const link = event.target.closest('a[href^="#"]');
  if (!link) {
    return;
  }

  const targetId = link.getAttribute('href');
  const target = targetId ? document.querySelector(targetId) : null;
  if (!target) {
    return;
  }

  event.preventDefault();
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  setMobileMenu(false);
};

document.addEventListener('click', smoothScrollHandler);
