const particleCanvas = document.getElementById('particleCanvas');

if (particleCanvas) {
  const context = particleCanvas.getContext('2d');

  if (context) {
    const particles = [];
    const particleCount = 60;
    let width = 0;
    let height = 0;
    let animationFrame = 0;

    const resizeCanvas = () => {
      const ratio = window.devicePixelRatio || 1;
      width = particleCanvas.clientWidth;
      height = particleCanvas.clientHeight;
      particleCanvas.width = Math.floor(width * ratio);
      particleCanvas.height = Math.floor(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const createParticles = () => {
      particles.length = 0;
      for (let index = 0; index < particleCount; index += 1) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          radius: 1.2 + Math.random() * 1.8,
        });
      }
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i += 1) {
        const particle = particles[i];
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > height) particle.vy *= -1;

        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fillStyle = 'rgba(108,99,255,0.4)';
        context.fill();
      }

      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const first = particles[i];
          const second = particles[j];
          const dx = first.x - second.x;
          const dy = first.y - second.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            context.beginPath();
            context.strokeStyle = `rgba(108,99,255,${(1 - distance / 120) * 0.18})`;
            context.lineWidth = 1;
            context.moveTo(first.x, first.y);
            context.lineTo(second.x, second.y);
            context.stroke();
          }
        }
      }

      animationFrame = requestAnimationFrame(draw);
    };

    resizeCanvas();
    createParticles();
    draw();

    window.addEventListener('resize', () => {
      resizeCanvas();
      createParticles();
    });

    window.addEventListener('beforeunload', () => cancelAnimationFrame(animationFrame));
  }
}
