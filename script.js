const galleryItems = [...document.querySelectorAll('.gallery-item')];
const lightbox = document.querySelector('.lightbox');
const lightboxImage = document.querySelector('.lightbox img');
const prevButton = document.querySelector('.lightbox-btn.prev');
const nextButton = document.querySelector('.lightbox-btn.next');
const closeButton = document.querySelector('.lightbox-close');

let currentImageIndex = 0;

function openLightbox(index) {
  currentImageIndex = index;
  const image = galleryItems[index].querySelector('img');
  lightboxImage.src = image.src;
  lightboxImage.alt = image.alt;
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function showNextImage(direction) {
  const total = galleryItems.length;
  currentImageIndex = (currentImageIndex + direction + total) % total;
  openLightbox(currentImageIndex);
}

if (galleryItems.length) {
  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
  });
}

if (closeButton) {
  closeButton.addEventListener('click', closeLightbox);
}

if (prevButton) {
  prevButton.addEventListener('click', () => showNextImage(-1));
}

if (nextButton) {
  nextButton.addEventListener('click', () => showNextImage(1));
}

document.addEventListener('keydown', (event) => {
  if (!lightbox.classList.contains('open')) return;

  if (event.key === 'Escape') {
    closeLightbox();
  }

  if (event.key === 'ArrowRight') {
    showNextImage(1);
  }

  if (event.key === 'ArrowLeft') {
    showNextImage(-1);
  }
});

lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

const enquiryButton = document.querySelector('.form-submit-btn');
if (enquiryButton) {
  enquiryButton.addEventListener('click', () => {
    const name = document.getElementById('name');
    const phone = document.getElementById('phone');
    const email = document.getElementById('email');
    const interest = document.getElementById('interest');
    const message = document.getElementById('message');

    const summary = [
      `Hello PULSE FITNESS CLUB,`,
      `I am ${name?.value || 'interested in joining'}.`,
      `Phone: ${phone?.value || 'Not provided'}`,
      `Email: ${email?.value || 'Not provided'}`,
      `Interested in: ${interest?.value || 'Membership Enquiry'}`,
      `Message: ${message?.value || 'I want to enquire about membership.'}`
    ].join(' ');

    const encodedText = encodeURIComponent(summary);
    window.open(`https://wa.me/919999999999?text=${encodedText}`, '_blank', 'noopener,noreferrer');
  });
}
