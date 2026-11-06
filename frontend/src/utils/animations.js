// Smooth scroll for navigation links
export const initSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || !href) return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
};

// Parallax effect on scroll
export const initParallax = () => {
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  
  const handleScroll = () => {
    const scrolled = window.pageYOffset;
    
    parallaxElements.forEach(element => {
      const speed = element.dataset.parallax || 0.5;
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  };
  
  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => window.removeEventListener('scroll', handleScroll);
};

// 3D hover effect for cards
export const init3DHover = () => {
  const cards = document.querySelectorAll('[data-3d-hover]');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });
};

// Fade in on scroll
export const initFadeInOnScroll = () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-visible');
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('[data-fade-in]').forEach(el => {
    el.classList.add('fade-in-element');
    observer.observe(el);
  });
  
  return observer;
};

// Magnetic button effect
export const initMagneticButtons = () => {
  const buttons = document.querySelectorAll('[data-magnetic]');
  
  buttons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.transform = 'translate(0, 0)';
    });
  });
};

// Initialize all animations
export const initAllAnimations = () => {
  initSmoothScroll();
  const parallaxCleanup = initParallax();
  init3DHover();
  const fadeObserver = initFadeInOnScroll();
  initMagneticButtons();
  
  return () => {
    if (parallaxCleanup) parallaxCleanup();
    if (fadeObserver) fadeObserver.disconnect();
  };
};
