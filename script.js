(() => {
  'use strict';

  /* ─── 1. Navigation & Mobile Drawer ─── */
  const toggle = document.getElementById('menu-toggle');
  const mobile = document.getElementById('mobile-nav');
  if (toggle && mobile) {
    const closeMenu = () => {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation');
      mobile.hidden = true;
    };
    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
      mobile.hidden = isOpen;
    });
    mobile.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
    window.addEventListener('resize', () => { if (window.innerWidth > 900) closeMenu(); });
  }

  /* ─── 2. Product Category Filters ─── */
  const buttons = [...document.querySelectorAll('[data-filter]')];
  const cards = [...document.querySelectorAll('[data-category]')];
  buttons.forEach(button => button.addEventListener('click', () => {
    const selected = button.dataset.filter;
    buttons.forEach(b => {
      b.classList.toggle('active', b === button);
      b.setAttribute('aria-pressed', String(b === button));
    });
    cards.forEach(card => {
      card.hidden = selected !== 'all' && !card.dataset.category.split(' ').includes(selected);
    });
  }));

  /* ─── 3. Scroll Reveal Animations ─── */
  const revealItems = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px 35px 0px' });
    revealItems.forEach(el => observer.observe(el));
  } else {
    revealItems.forEach(el => el.classList.add('visible'));
  }

  /* ─── 4. Dynamic Copyright Year ─── */
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  /* ─── 5. 3D Indian Wedding Invitation Card Tilt & Specular Gold Glare ─── */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

  if (!prefersReducedMotion && !isTouchDevice) {
    const tiltElements = document.querySelectorAll('[data-royal-tilt]');

    tiltElements.forEach(el => {
      let bounds = null;
      let isHovered = false;
      let frameId = null;
      let targetRotX = 0;
      let targetRotY = 0;
      let currentRotX = 0;
      let currentRotY = 0;
      let glareX = 50;
      let glareY = 50;
      const maxTilt = el.classList.contains('hero-art') ? 14 : 9;

      const onMouseEnter = () => {
        isHovered = true;
        bounds = el.getBoundingClientRect();
        el.classList.add('is-tilting');
        startAnimation();
      };

      const onMouseMove = (e) => {
        if (!bounds) bounds = el.getBoundingClientRect();
        const x = e.clientX - bounds.left;
        const y = e.clientY - bounds.top;
        const normX = (x / bounds.width) * 2 - 1; // -1 to 1
        const normY = (y / bounds.height) * 2 - 1; // -1 to 1

        targetRotX = -normY * maxTilt;
        targetRotY = normX * maxTilt;
        glareX = (x / bounds.width) * 100;
        glareY = (y / bounds.height) * 100;

        el.style.setProperty('--glare-x', `${glareX.toFixed(1)}%`);
        el.style.setProperty('--glare-y', `${glareY.toFixed(1)}%`);
        el.style.setProperty('--glare-opacity', '0.75');
      };

      const onMouseLeave = () => {
        isHovered = false;
        targetRotX = 0;
        targetRotY = 0;
        el.style.setProperty('--glare-opacity', '0');
        el.classList.remove('is-tilting');
      };

      const animate = () => {
        // Smooth lerp easing for authentic physical feel
        currentRotX += (targetRotX - currentRotX) * 0.12;
        currentRotY += (targetRotY - currentRotY) * 0.12;

        const isCloseToZero = Math.abs(currentRotX) < 0.02 && Math.abs(currentRotY) < 0.02;

        if (isHovered || !isCloseToZero) {
          const scale = isHovered ? 1.025 : 1;
          el.style.transform = `perspective(1200px) rotateX(${currentRotX.toFixed(2)}deg) rotateY(${currentRotY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`;
          frameId = requestAnimationFrame(animate);
        } else {
          el.style.transform = '';
          frameId = null;
        }
      };

      const startAnimation = () => {
        if (!frameId) {
          frameId = requestAnimationFrame(animate);
        }
      };

      el.addEventListener('mouseenter', onMouseEnter);
      el.addEventListener('mousemove', onMouseMove);
      el.addEventListener('mouseleave', onMouseLeave);
      window.addEventListener('resize', () => { bounds = null; });
    });
  }

  /* ─── 6. Floating Auspicious Gold Stardust & Petals Canvas ─── */
  const canvas = document.getElementById('royal-canvas');
  const royalToggle = document.getElementById('royal-toggle');
  let animationActive = true;

  if (canvas && !prefersReducedMotion) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    // Particle types: Gold Stardust Embers & Rose/Marigold Petal Flakes
    const particleCount = width < 768 ? 24 : 48;
    const particles = [];

    const goldColors = [
      'rgba(255, 230, 150, ',
      'rgba(245, 208, 97, ',
      'rgba(212, 175, 55, ',
      'rgba(255, 195, 100, ',
      'rgba(240, 140, 160, ' // delicate rose hint from wedding varmala
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.8 + 0.8,
        colorBase: goldColors[Math.floor(Math.random() * goldColors.length)],
        opacity: Math.random() * 0.55 + 0.2,
        speedY: -(Math.random() * 0.45 + 0.2), // gentle upward float
        swaySpeed: Math.random() * 0.015 + 0.005,
        swayOffset: Math.random() * Math.PI * 2,
        swayRadius: Math.random() * 30 + 10,
        isPetal: Math.random() > 0.72,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.02
      });
    }

    let lastTime = 0;
    const renderParticles = (time) => {
      if (!animationActive) return;
      const dt = time - lastTime;
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.speedY;
        p.swayOffset += p.swaySpeed;
        p.rotation += p.rotSpeed;
        const currentX = p.x + Math.sin(p.swayOffset) * p.swayRadius;

        // Wrap around top/bottom
        if (p.y < -20) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(currentX, p.y);
        ctx.rotate(p.rotation);

        if (p.isPetal) {
          // Draw delicate golden/rose leaf petal
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size * 2.2, p.size * 1.1, 0, 0, Math.PI * 2);
          ctx.fillStyle = p.colorBase + p.opacity + ')';
          ctx.fill();
        } else {
          // Draw sparkling gold stardust with halo glow
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.colorBase + p.opacity + ')';
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#F5D061';
          ctx.fill();
        }

        ctx.restore();
      }

      requestAnimationFrame(renderParticles);
    };

    requestAnimationFrame(renderParticles);

    // Toggle button handler
    if (royalToggle) {
      royalToggle.addEventListener('click', () => {
        animationActive = !animationActive;
        canvas.style.opacity = animationActive ? '1' : '0';
        royalToggle.classList.toggle('active', animationActive);
        royalToggle.setAttribute('aria-pressed', String(animationActive));
        if (animationActive) requestAnimationFrame(renderParticles);
      });
    }

    // Pause when tab not visible to conserve battery
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        animationActive = false;
      } else if (!royalToggle || royalToggle.getAttribute('aria-pressed') !== 'false') {
        animationActive = true;
        requestAnimationFrame(renderParticles);
      }
    });
  }
})();
