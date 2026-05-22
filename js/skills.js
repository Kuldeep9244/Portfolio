const skillsSection = document.getElementById('skills');
const skillFills = Array.from(document.querySelectorAll('.skill-fill'));

if (skillsSection && skillFills.length && 'IntersectionObserver' in window) {
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting || animated) {
        return;
      }

      animated = true;
      skillFills.forEach((fill, index) => {
        const width = fill.dataset.width || '0';
        fill.style.transitionDelay = `${index * 100}ms`;
        window.setTimeout(() => {
          fill.style.width = `${width}%`;
        }, index * 100);
      });
      observer.disconnect();
    });
  }, { threshold: 0.25 });

  observer.observe(skillsSection);
} else {
  skillFills.forEach((fill) => {
    fill.style.width = `${fill.dataset.width || '0'}%`;
  });
}
