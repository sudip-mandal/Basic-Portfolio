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