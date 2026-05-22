const heroSection = document.getElementById('hero');
const counters = Array.from(document.querySelectorAll('.count'));

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

const animateCounter = (element) => {
  const target = Number(element.dataset.target || 0);
  const duration = 2000;
  const start = performance.now();

  const step = (timestamp) => {
    const progress = Math.min((timestamp - start) / duration, 1);
    const value = Math.floor(easeOutCubic(progress) * target);
    const suffix = target > 1 ? '+' : '';
    element.textContent = `${value}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      element.textContent = `${target}${suffix}`;
    }
  };

  requestAnimationFrame(step);
};

if (heroSection && counters.length) {
  let started = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !started) {
        started = true;
        counters.forEach((counter) => animateCounter(counter));
        observer.disconnect();
      }
    });
  }, { threshold: 0.35 });

  observer.observe(heroSection);
}
