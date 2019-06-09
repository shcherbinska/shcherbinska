import '../lib/domConf';
export default function menu() {
  // simpliest menu example
  let menuToggle = document.querySelectorAll('.js-menu-toggle');
  window.DOM.menu = document.querySelector('.js-menu');
  // using passive events
  menuToggle.forEach((item) => {
    item.addEventListener('click', toggleClassMenu, window.DOM.passiveOrNot());
  });
}

export function toggleClassMenu() {
  if(!window.DOM.menu.classList.contains('visible')) {
    window.DOM.menu.classList.add('visible');
  } else {
    window.DOM.menu.classList.remove('visible');
  }
}
