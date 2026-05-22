const typedTarget = document.getElementById('typedText');

if (typedTarget) {
  const words = ['Full Stack Developer', 'MERN Stack Developer', 'Frontend Developer', 'UI/UX Designer'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const tick = () => {
    const currentWord = words[wordIndex];
    const nextLength = isDeleting ? charIndex - 1 : charIndex + 1;
    typedTarget.textContent = currentWord.slice(0, nextLength);
    charIndex = nextLength;

    let delay = isDeleting ? 55 : 90;

    if (!isDeleting && charIndex === currentWord.length) {
      delay = 1800;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay = 250;
    }

    setTimeout(tick, delay);
  };

  tick();
}
