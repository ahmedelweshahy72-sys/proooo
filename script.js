/**
 * Portfolio - Ahmed El-Weshahy
 * Vanilla JS: typing, scroll, nav indicator, slider, particles
 */

(function () {
  'use strict';

  // ========== TYPING EFFECT ==========
  const typingPhrases = [
    'AI & Machine Learning Enthusiast',
    'Deep Learning Developer',
    'NLP & Computer Vision',
    'Building Intelligent Systems'
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingTimer;

  const typedEl = document.getElementById('typed');
  const cursorEl = document.querySelector('.typing-text .cursor');

  function typeEffect() {
    const current = typingPhrases[phraseIndex];
    if (!typedEl) return;

    if (isDeleting) {
      typedEl.textContent = current.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedEl.textContent = current.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === current.length) {
      typingTimer = setTimeout(typeEffect, 2000);
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % typingPhrases.length;
      typingTimer = setTimeout(typeEffect, 400);
    } else {
      typingTimer = setTimeout(typeEffect, isDeleting ? 50 : 100);
    }
  }

  if (typedEl) {
    setTimeout(typeEffect, 800);
  }

  // ========== SMOOTH SCROLL (anchor links) ==========
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const menu = document.querySelector('.nav-menu');
      const hamburger = document.getElementById('hamburger');
      if (menu && menu.classList.contains('active')) {
        menu.classList.remove('active');
        if (hamburger) hamburger.classList.remove('active');
      }
    });
  });

  // ========== STICKY NAV & ACTIVE SECTION INDICATOR ==========
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const navIndicator = document.querySelector('.nav-indicator');
  const sections = document.querySelectorAll('.section[id]');

  function updateNav() {
    const scrollY = window.scrollY;
    const navHeight = navbar ? navbar.offsetHeight : 0;

    if (navbar) {
      if (scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    let currentSection = '';
    sections.forEach(section => {
      const top = section.offsetTop - navHeight - 80;
      const height = section.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + currentSection) {
        link.classList.add('active');
        // Move indicator under active link
        if (navIndicator && link.offsetParent) {
          const linkRect = link.getBoundingClientRect();
          const navRect = navbar.getBoundingClientRect();
          navIndicator.style.left = linkRect.left - navRect.left + 'px';
          navIndicator.style.width = linkRect.width + 'px';
        }
      }
    });

    if (!currentSection && navIndicator) {
      navIndicator.style.width = '0';
    }
  }

  window.addEventListener('scroll', updateNav);
  window.addEventListener('resize', updateNav);
  updateNav();

  // ========== FADE-IN ON SCROLL ==========
  const fadeEls = document.querySelectorAll('.fade-in');
  const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  fadeEls.forEach(el => fadeObserver.observe(el));

  // ========== SKILL BARS ANIMATION ==========
  const skillFills = document.querySelectorAll('.skill-fill');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const level = fill.getAttribute('data-level') || 0;
        fill.style.setProperty('--level', level + '%');
        fill.classList.add('animated');
      }
    });
  }, { threshold: 0.3 });

  skillFills.forEach(fill => skillObserver.observe(fill));

  // ========== TESTIMONIALS SLIDER ==========
  const cards = document.querySelectorAll('.testimonial-card');
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');
  const dotsContainer = document.querySelector('.slider-dots');

  let currentSlide = 0;
  const totalSlides = cards.length;

  function createDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('button');
      dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Go to testimonial ' + (i + 1));
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }
  }

  function goToSlide(index) {
    currentSlide = ((index % totalSlides) + totalSlides) % totalSlides;
    cards.forEach((card, i) => card.classList.toggle('active', i === currentSlide));
    const dots = document.querySelectorAll('.slider-dot');
    dots.forEach((dot, i) => dot.classList.toggle('active', i === currentSlide));
  }

  if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));

  createDots();

  // ========== HAMBURGER MENU ==========
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.querySelector('.nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
      document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
  }

  // ========== SCROLL TO TOP ==========
  const scrollTopBtn = document.getElementById('scrollTop');

  function toggleScrollTop() {
    if (scrollTopBtn) {
      if (window.scrollY > 400) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }
  }

  window.addEventListener('scroll', toggleScrollTop);
  toggleScrollTop();

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ========== CONTACT FORM ==========
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = this.querySelector('button[type="submit"]');
      const originalText = btn ? btn.textContent : 'Send';
      if (btn) btn.textContent = 'Sending...';
      setTimeout(() => {
        if (btn) btn.textContent = 'Sent!';
        this.reset();
        setTimeout(() => { if (btn) btn.textContent = originalText; }, 2000);
      }, 600);
    });
  }

  // ========== SIMPLE PARTICLES BACKGROUND ==========
  const particlesContainer = document.getElementById('particles-js');
  if (particlesContainer) {
    const canvas = document.createElement('canvas');
    particlesContainer.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = particlesContainer.offsetWidth);
    let height = (canvas.height = particlesContainer.offsetHeight);
    const particles = [];
    const particleCount = 50;

    function resize() {
      width = canvas.width = particlesContainer.offsetWidth;
      height = canvas.height = particlesContainer.offsetHeight;
      initParticles();
    }

    function initParticles() {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() * 1.5 + 0.5,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.4 + 0.1
        });
      }
    }

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      const accent = '232, 216, 196';
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${accent}, ${p.opacity})`;
        ctx.fill();
      });
      requestAnimationFrame(draw);
    }

    window.addEventListener('resize', resize);
    initParticles();
    draw();
  }
})();
