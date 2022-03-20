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
  const galleries = document.querySelectorAll(".js-portfolio-slider");
  galleries.forEach((gallery) => {
    let slider = new Swiper(gallery, {
      initialSlide: 0,
      slidesPerView: "auto",
      lazy: {
        loadPrevNext: true,
      },
      preloadImages: false,
      watchOverflow: true,
      keyboard: true,
      navigation: {
        nextEl: ".gallery__button--next",
        prevEl: ".gallery__button--prev",
        disabledClass: "gallery__button--disabled",
      },
    });
    document.addEventListener("openModal", (e) => {
      slider.update();
      if (e.detail !== null) {
        slider.slideTo(+e.detail - 1, 0);
      } else {
        slider.slideTo(0, 0);
      }
    });
  });

  setTimeout(() => {
    objectFitImages();
  }, 0);
});
