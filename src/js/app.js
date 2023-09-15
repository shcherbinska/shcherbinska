import Swiper from "swiper";
import objectFitImages from "object-fit-images";
import "./lib/domConf";
import "./lib/customEventPolyfill";
import "./lib/forEachPolyfill";
import setupModals from "./custom/setupModals";
import menu from "./custom/menu";

document.addEventListener("DOMContentLoaded", () => {
  // get scrollbar width
  window.DOM.getScrollWidth();
  setupModals();
  menu();
  const sliders = {};

  document.addEventListener("openModal", (e) => {
    const modalId = e.detail?.modalId || null;
    const openSelected = e.detail?.openSelected || null;

    if (modalId) {
      const gallery = document.querySelector(`[data-modal-id="${modalId}"]`);
      const slider = new Swiper(gallery, {
        initialSlide: 0,
        slidesPerView: "auto",
        lazy: {
          loadPrevNext: true,
        },
        preloadImages: false,
        watchOverflow: true,
        keyboard: true,
        autoplay: {
          delay: 2000,
        },
        effect: "fade",
        navigation: {
          nextEl: ".gallery__button--next",
          prevEl: ".gallery__button--prev",
          disabledClass: "gallery__button--disabled",
        },
        pagination: {
          el: ".gallery__pagination",
          type: "fraction",
        },
      });
      slider.update();
      sliders[modalId] = slider;
      const video = gallery.querySelector("video");
      if (video) {
        video.currentTime = 0;
      }

      if (openSelected !== null) {
        slider.slideTo(+openSelected - 1, 0);
      } else {
        slider.slideTo(0, 0);
      }
    }
  });

  document.addEventListener("closeModal", (e) => {
    const modalId = e.detail?.modalId || null;

    if (modalId) {
      const slider = sliders[modalId];
      slider.destroy();
    }
  });

  setTimeout(() => {
    objectFitImages();
  }, 0);
});
