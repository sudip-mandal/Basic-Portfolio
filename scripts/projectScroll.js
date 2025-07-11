// 🟪 Project Section Horizontal Scroll & Wheel Effect
// Uses requestAnimationFrame to create a 3D wheel/coverflow effect based on card distance from center

window.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.projects__scroll');
  let cards = Array.from(document.querySelectorAll('.project-card'));
  if (!container || cards.length === 0) return;

  // Infinite auto-scroll logic
  let scrollSpeed = 0.7; // px per frame
  let autoScroll = true;

  // Duplicate cards for seamless infinite scroll (x2)
  container.innerHTML += container.innerHTML;
  cards = Array.from(container.querySelectorAll('.project-card'));
  let scrollWidth = container.scrollWidth / 2;

  // Set initial scroll position to the start of the second set for true infinite scroll
  container.scrollLeft = scrollWidth;

  function animateScroll() {
    if (autoScroll && window.innerWidth >= 700) {
      container.scrollLeft += scrollSpeed;
      // Wrap right
      if (container.scrollLeft >= scrollWidth * 2) {
        container.scrollLeft = scrollWidth;
      }
      // Wrap left
      if (container.scrollLeft <= 0) {
        container.scrollLeft = scrollWidth;
      }
    }
    requestAnimationFrame(animateScroll);
  }
  animateScroll();

  // Pause auto-scroll on hover
  container.addEventListener('mouseenter', () => { autoScroll = false; });
  container.addEventListener('mouseleave', () => { autoScroll = true; });

  // 🟪 Wheel/3D Gallery Effect
  function wheelEffect() {
    const containerRect = container.getBoundingClientRect();
    const centerX = containerRect.left + containerRect.width / 2;
    cards.forEach(card => {
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const dist = (centerX - cardCenter) / cardRect.width; // -1 (left) to 1 (right)
      // Math: scale and rotateY for wheel effect
      const scale = 1 - Math.min(Math.abs(dist) * 0.18, 0.35);
      // Limit rotation to [-40deg, 40deg] for smoother effect
      const rotateY = Math.max(-40, Math.min(40, dist * 30));
      const zIndex = 10 - Math.abs(Math.round(dist * 10));
      card.style.transform = `scale(${scale}) rotateY(${rotateY}deg)`;
      card.style.zIndex = zIndex;
      card.style.filter = Math.abs(dist) < 0.15 ? 'brightness(1.15)' : 'brightness(0.92)';
      card.style.boxShadow = Math.abs(dist) < 0.15 ? '0 8px 32px 0 rgba(108,99,255,0.18)' : '0 2px 12px 0 rgba(108,99,255,0.08)';
    });
    requestAnimationFrame(wheelEffect);
  }
  wheelEffect();

  // Drag to scroll UX
  let isDown = false, startX, scrollLeftStart;
  container.addEventListener('mousedown', (e) => {
    isDown = true;
    container.classList.add('dragging');
    startX = e.pageX - container.offsetLeft;
    scrollLeftStart = container.scrollLeft;
  });
  container.addEventListener('mouseleave', () => {
    isDown = false;
    container.classList.remove('dragging');
  });
  container.addEventListener('mouseup', () => {
    isDown = false;
    container.classList.remove('dragging');
  });
  container.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 1.5;
    container.scrollLeft = scrollLeftStart - walk;
    // Wrap left/right during drag
    if (container.scrollLeft >= scrollWidth * 2) {
      container.scrollLeft = scrollWidth;
    }
    if (container.scrollLeft <= 0) {
      container.scrollLeft = scrollWidth;
    }
  });

  // Mobile: Switch to vertical scroll
  function handleMobileScroll() {
    if (window.innerWidth < 700) {
      container.style.overflowX = 'auto';
      container.style.flexDirection = 'column';
      container.style.overflowY = 'visible';
      container.scrollLeft = 0;
      cards.forEach(card => {
        card.style.transform = '';
        card.style.zIndex = '';
        card.style.filter = '';
        card.style.boxShadow = '';
      });
    } else {
      container.style.overflowX = 'scroll';
      container.style.flexDirection = 'row';
      container.style.overflowY = 'hidden';
      // Reset to infinite scroll position
      container.scrollLeft = scrollWidth;
    }
  }
  window.addEventListener('resize', handleMobileScroll);
  handleMobileScroll();
}); 