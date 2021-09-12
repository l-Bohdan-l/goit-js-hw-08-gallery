import galleryItems from "./gallery.js"

const galleryEl = document.querySelector(".js-gallery");
const lightBoxEl = document.querySelector('.js-lightbox');
const lightBoxImageEl = document.querySelector('.lightbox__image');
const closeModalBtn = document.querySelector('[data-action="close-lightbox"]');
const lightBoxOverlayEl = document.querySelector('.lightbox__overlay');

function createGallary(array) {
  
  return array.map((item) => {
    const { preview, original, description } = item;
    return `<li class="gallery__item"> 
      <a
        class="gallery__link"
        href= '${original}'
        >
        <img
        class="gallery__image"
        src = '${preview}'
        data-source= '${original}'
        alt = '${description}'
        />
      </a>
    </li>`
  }).join('')     
}

const galleryMarkup = createGallary(galleryItems);
galleryEl.insertAdjacentHTML('beforeend', galleryMarkup);
galleryEl.addEventListener('click', leftClickGallery);

function leftClickGallery(e) {
  e.preventDefault();
  
  const galleryImgTarget = e.target.classList.contains('gallery__image');
  if (!galleryImgTarget) {
    return;
  }  
  lightBoxEl.classList.add('is-open')
  lightBoxImageEl.src = e.target.dataset.source;
  lightBoxImageEl.alt = e.target.alt;  
}



closeModalBtn.addEventListener('click', removeOverlay)
lightBoxOverlayEl.addEventListener('click', removeOverlay)

function removeOverlay() {
  lightBoxEl.classList.remove('is-open');
  lightBoxImageEl.src = '';
}

window.addEventListener('keyup', closeOverlayByEscape);

function closeOverlayByEscape(e) {
  if (e.code === 'Escape') {
    lightBoxEl.classList.remove('is-open');
    lightBoxImageEl.src = '';
  }
  return
}

if (lightBoxEl.classList.contains('is-open')) {
  galleryEl.removeEventListener('click', leftClickGallery);
} else {
  closeModalBtn.addEventListener('click', removeOverlay);
  lightBoxOverlayEl.addEventListener('click', removeOverlay);
  window.addEventListener('keyup', closeOverlayByEscape);
}