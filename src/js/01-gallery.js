// Add imports above this line
import { galleryItems } from './gallery-items';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// import storage from './storage.js';
// Change code below this line
const ref = {
  gallery: document.querySelector('.gallery'),
};

ref.gallery.insertAdjacentHTML('beforeend', renderGallery(galleryItems));
ref.gallery.addEventListener('click', onClickImg);

const lightbox = new SimpleLightbox('.gallery a', {
  captionSelector: 'img',
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

function onClickImg(e) {
  e.preventDefault();

  if (!e.target.classList.contains('gallery__image')) {
    return;
  }
}

function renderGallery(galleryItems) {
  let renderResult = '';
  galleryItems.map(e => {
    renderResult += `<a class="gallery__item" href="${e.original}">
  <img class="gallery__image" src="${e.preview}" alt="${e.description}" />
</a>`;
  });
  // console.log(renderResult);
  return renderResult;
}
