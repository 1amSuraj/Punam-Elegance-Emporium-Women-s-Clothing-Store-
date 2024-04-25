const slides = document.querySelector('.slides');
const slideWidth = document.querySelector('.slide').clientWidth;
let currentIndex = 0;

function showSlide(index) {
  slides.style.transform = `translateX(-${index * slideWidth}px)`;
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.children.length;
  showSlide(currentIndex);
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + slides.children.length) % slides.children.length;
  showSlide(currentIndex);
}

// Automatic sliding
setInterval(nextSlide, 6000); // Change slide every 3 seconds




