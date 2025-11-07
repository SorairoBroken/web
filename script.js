const track = document.querySelector('.carousel-track');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

let currentIndex = 0;
let startX = 0;
let isDragging = false;
let autoplayInterval;

function getVisibleItems() {
  const screenWidth = window.innerWidth;
  if (screenWidth <= 480) return 1;
  if (screenWidth <= 768) return 2;
  return 3;
}

function updateCarousel() {
  const itemWidth = track.children[0].offsetWidth + 10; // ancho + margen
  const visibleItems = getVisibleItems();
  const totalItems = track.children.length;
  const maxIndex = totalItems - visibleItems;

  // 🔹 Reinicio circular (para evitar huecos al final)
  if (currentIndex > maxIndex) {
    currentIndex = 0;
  } else if (currentIndex < 0) {
    currentIndex = maxIndex;
  }

  // 🔹 Aplicar movimiento
  track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
}

function moveNext() {
  currentIndex++;
  updateCarousel();
}

function movePrev() {
  currentIndex--;
  updateCarousel();
}

// Botones
nextBtn.addEventListener('click', moveNext);
prevBtn.addEventListener('click', movePrev);

// Touch/Swipe
track.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
  isDragging = true;
});

track.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  const currentX = e.touches[0].clientX;
  const diff = currentX - startX;
  if (Math.abs(diff) > 50) {
    if (diff > 0) movePrev();
    else moveNext();
    isDragging = false;
  }
});

track.addEventListener('touchend', () => {
  isDragging = false;
});

// Autoplay
function startAutoplay() {
  autoplayInterval = setInterval(moveNext, 3000); // cada 3 segundos
}

function stopAutoplay() {
  clearInterval(autoplayInterval);
}

startAutoplay();

// Pausar autoplay cuando el mouse entra
track.addEventListener('mouseenter', stopAutoplay);
track.addEventListener('mouseleave', startAutoplay);

// 🔹 Ajuste automático al cambiar el tamaño
window.addEventListener('resize', updateCarousel);
window.addEventListener('load', updateCarousel);
