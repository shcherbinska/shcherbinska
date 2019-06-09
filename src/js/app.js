import Swiper from 'swiper/dist/js/swiper.js';
import objectFitImages from 'object-fit-images';
import './lib/domConf';
import './lib/customEventPolyfill';
import './lib/forEachPolyfill';
import setupModals from './custom/setupModals';
import menu from './custom/menu';

document.addEventListener('DOMContentLoaded',() => {
  // get scrollbar width
  window.DOM.getScrollWidth();
  setupModals();
  menu();
  const galleries = document.querySelectorAll('.js-portfolio-slider');
  galleries.forEach((gallery) => {
    let slider = new Swiper(gallery, {
      slidesPerView: 'auto',
      lazy: {
        loadPrevNext: true
      },
      preloadImages: false,
      watchOverflow: true,
      keyboard: true,
      navigation: {
        nextEl: '.gallery__button--next',
        prevEl: '.gallery__button--prev',
        disabledClass: 'gallery__button--disabled'
      },
    });
    document.addEventListener('openModal', () => {slider.update();});
  })

  setTimeout(() => {
    objectFitImages();
  }, 0);
})
