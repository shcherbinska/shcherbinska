// object stores all must have html elements and utility functions of project
// functions and classes called by backenders need to be referenced to this object too
//i.e. lazyimage, and ajax callbacks
window.DOM = {
  // fix: escape bitrix bug with body selection
  body: document.querySelector('body'),
  bxMarkup: document.querySelector('.bx-markup'),
  html: document.documentElement,
  docLang: document.documentElement.getAttribute('lang'),
  passiveSupported: false,
  bodyScrollTop: null,
  scrollWidth: null,
  modalActive: null,
  modalsContainer: document.querySelector('#modals'),
  // need to be called on page load
  getScrollWidth: function() {
    // Узнаем ширину скролл панели
    const div = document.createElement('div');
    div.style.overflowY = 'scroll';
    div.style.width = '50px';
    div.style.height = '50px';
    div.style.visibility = 'hidden';
    this.html.appendChild(div);
    this.scrollWidth = div.offsetWidth - div.clientWidth;
    this.html.removeChild(div);
  },
  checkPassive: function() {
    try {
      let options = Object.defineProperty({}, 'passive', {
        get: () => {
          window.DOM.passiveSupported = true;
        }
      });
      window.addEventListener('test', null, options);
    } catch(err) {}
  },
  hideScroll: function() {
    if (this.body.offsetHeight < this.body.scrollHeight) {
      this.body.style.paddingRight = this.scrollWidth + 'px';
    }
    this.bodyScrollTop = window.pageYOffset;
    this.body.style.top = -this.bodyScrollTop + 'px';
    window.scroll(0, this.bodyScrollTop);
    this.body.classList.add('modal_open');
  },
  passiveOrNot: () => {
    return window.DOM.passiveSupported ? { passive: true } : false;
  },
  showScroll: function() {
    if (!this.body.classList.contains('menu_open')) {
      this.body.classList.remove('modal_open');
      this.bodyScrollTop && (window.scroll(0, this.bodyScrollTop));
      this.bodyScrollTop = null;
      this.body.style.paddingRight = '';
    }
  },
  addListenerMulti(el, s, fn) {
    s.split(' ').forEach(e => el.addEventListener(e, fn, window.DOM.passiveOrNot()));
  },
};
