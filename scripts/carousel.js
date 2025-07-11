// 🟪 Project Carousel: Infinite Loop, Center Zoom, Responsive
// Handles: card duplication, infinite scroll, zoom effect, responsive layout

window.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.projects__scroll');
  if (!container) return;

  // 1. Duplicating cards for infinite scroll
  let originalCards = Array.from(container.querySelectorAll('.project-card'));
  if (originalCards.length === 0) return;
  // Remove any previous clones
  container.innerHTML = '';
  // Clone cards 2x for seamless looping
  for (let i = 0; i < 3; i++) {
    originalCards.forEach(card => {
      const clone = card.cloneNode(true);
      clone.classList.add('carousel-clone');
      container.appendChild(clone);
    });
  }
  let cards = Array.from(container.querySelectorAll('.project-card'));
  const cardsPerSet = originalCards.length;
  const totalCards = cards.length;

  // 2. Layout: Flex row, fixed size, no shrink
  container.style.display = 'flex';
  container.style.flexDirection = 'row';
  container.style.alignItems = 'center';
  container.style.overflowX = 'scroll';
  container.style.overflowY = 'hidden';
  container.style.scrollBehavior = 'auto'; // disable smooth for manual control
  cards.forEach(card => {
    card.style.flex = '0 0 300px';
    card.style.width = '300px';
    card.style.height = '400px';
    card.style.marginRight = '2rem';
    card.style.marginLeft = '0';
    card.style.boxSizing = 'border-box';
  });

  // 3. Set initial scroll position to the start of the middle set
  const cardWidth = 300 + 32; // width + margin (2rem)
  const setWidth = cardsPerSet * cardWidth;
  container.scrollLeft = setWidth;

  // 4. Infinite scroll logic (seamless)
  function checkInfiniteScroll() {
    // If scrolled past the end of the middle set, jump back
    if (container.scrollLeft < setWidth * 0.5) {
      container.scrollLeft += setWidth;
    } else if (container.scrollLeft > setWidth * 1.5) {
      container.scrollLeft -= setWidth;
    }
  }

  // 5. Center zoom/scale effect
  function animateZoom() {
    const containerRect = container.getBoundingClientRect();
    const centerX = containerRect.left + containerRect.width / 2;
    cards.forEach(card => {
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const dist = Math.abs(centerX - cardCenter);
      const scale = dist < cardRect.width ? 1.1 : 0.95;
      card.style.transform = `scale(${scale})`;
      card.style.zIndex = dist < cardRect.width ? 10 : 1;
      card.style.filter = dist < cardRect.width ? 'brightness(1.15)' : 'brightness(0.92)';
      card.style.boxShadow = dist < cardRect.width ? '0 8px 32px 0 rgba(108,99,255,0.18)' : '0 2px 12px 0 rgba(108,99,255,0.08)';
    });
    requestAnimationFrame(animateZoom);
  }
  animateZoom();

  // 6. Auto-scroll with constant speed using requestAnimationFrame
  let autoScroll = true;
  let lastTimestamp = null;
  let autoScrollSpeed = 0.7; // px per frame
  function autoScrollStep(ts) {
    if (!lastTimestamp) lastTimestamp = ts;
    if (autoScroll && window.innerWidth >= 700) {
      container.scrollLeft += autoScrollSpeed;
      checkInfiniteScroll();
    }
    lastTimestamp = ts;
    requestAnimationFrame(autoScrollStep);
  }
  requestAnimationFrame(autoScrollStep);

  // 7. Drag to scroll (desktop) and touch support (mobile)
  let isDown = false, startX, scrollLeftStart;
  container.addEventListener('mousedown', (e) => {
    isDown = true;
    autoScroll = false;
    container.classList.add('dragging');
    startX = e.pageX - container.offsetLeft;
    scrollLeftStart = container.scrollLeft;
  });
  container.addEventListener('mouseleave', () => {
    isDown = false;
    autoScroll = true;
    container.classList.remove('dragging');
  });
  container.addEventListener('mouseup', () => {
    isDown = false;
    autoScroll = true;
    container.classList.remove('dragging');
  });
  container.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 1.5;
    container.scrollLeft = scrollLeftStart - walk;
    checkInfiniteScroll();
  });
  // Touch support
  let touchStartX = 0, touchScrollLeft = 0;
  container.addEventListener('touchstart', (e) => {
    autoScroll = false;
    touchStartX = e.touches[0].pageX - container.offsetLeft;
    touchScrollLeft = container.scrollLeft;
  });
  container.addEventListener('touchend', () => {
    autoScroll = true;
  });
  container.addEventListener('touchmove', (e) => {
    const x = e.touches[0].pageX - container.offsetLeft;
    const walk = (x - touchStartX) * 1.5;
    container.scrollLeft = touchScrollLeft - walk;
    checkInfiniteScroll();
  });

  // 8. Responsive: Switch to vertical stacking on small screens
  function handleResponsive() {
    if (window.innerWidth < 700) {
      container.style.flexDirection = 'column';
      container.style.overflowX = 'auto';
      container.style.overflowY = 'visible';
      cards.forEach(card => {
        card.style.width = '90vw';
        card.style.height = 'auto';
        card.style.marginRight = '0';
        card.style.marginBottom = '1.5rem';
        card.style.transform = '';
        card.style.zIndex = '';
        card.style.filter = '';
        card.style.boxShadow = '';
      });
    } else {
      container.style.flexDirection = 'row';
      container.style.overflowX = 'scroll';
      container.style.overflowY = 'hidden';
      cards.forEach(card => {
        card.style.width = '300px';
        card.style.height = '400px';
        card.style.marginRight = '2rem';
        card.style.marginBottom = '0';
      });
      container.scrollLeft = setWidth;
    }
  }
  window.addEventListener('resize', handleResponsive);
  handleResponsive();
}); 