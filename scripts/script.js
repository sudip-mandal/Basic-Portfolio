// 🟨 Main JavaScript for Sudip Mandal Portfolio

// 🟪 GSAP + ScrollTrigger Animations Init (for non-project sections only)
window.addEventListener('DOMContentLoaded', () => {
  // Register ScrollTrigger plugin
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    // Helper: Animate section fade/slide in
    function animateSection(selector, options = {}) {
      gsap.from(selector, {
        opacity: 0,
        y: 60,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: selector,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        ...options
      });
    }

    // 🟪 Animate all main sections (except projects)
    animateSection('.hero__content', {y: 0, duration: 1.2});
    animateSection('.about__container');
    animateSection('.skills__container');
    animateSection('.experience__container');
    animateSection('.contact__container');
    // Removed .projects__grid animation to avoid ScrollTrigger error
  }
});

// 🟨 IntersectionObserver for Multi-Image Photo Gallery Animations
(function() {
  const galleryItems = document.querySelectorAll('.photo-gallery__multi .photo-gallery__item');
  if (!galleryItems.length) return;

  const observer = new window.IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.3
  });

  galleryItems.forEach(item => observer.observe(item));
})(); 