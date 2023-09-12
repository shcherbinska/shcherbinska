export default function setupModals() {
  document.body.addEventListener("click", function (e) {
    let target = e.target;
    if (window.DOM.modalActive && target === window.DOM.modalActive) {
      closeModal();
      return;
    }
    if (target.classList.contains("js-modal-close")) {
      closeModal();
      return;
    }
    if (
      window.DOM.modalActive &&
      target.classList.contains("js-modal-trigger")
    ) {
      closeModal();
      setTimeout(() => {
        checkTriggerClick(e);
      }, 300);
      return;
    }
    checkTriggerClick(e);
  });

  function checkTriggerClick(e) {
    let target = e.target;
    try {
      while (target !== this) {
        if (target.classList.contains("js-modal-trigger")) {
          e.preventDefault();
          if (target.dataset.modal) {
            target.blur();
            openModal(target.dataset.modal, target);
            document.body.addEventListener("touchmove", preventMobileScroll);
            return;
          }
        }
        target = target.parentNode;
      }
    } catch (e) {}
  }

  document.addEventListener("keydown", (e) => {
    if (e.keyCode === 27 && window.DOM.modalActive) {
      closeModal();
    }
  });
}

export function openModal(targetID, target) {
  const modal = window.DOM.modalsContainer.querySelector(`#${targetID}`);
  window.DOM.modalActive = modal;
  modal.classList.add("modal--visible");
  window.DOM.hideScroll();

  const details = { detail: { modalId: targetID } };
  if (target.dataset.openSelected) {
    details.detail.openSelected = target.dataset.openSelected;
  }
  // dispatch event each time modal is visible
  let openModalEvent = new CustomEvent("openModal", details);
  document.dispatchEvent(openModalEvent);
}

export function closeModal() {
  const targetID = window.DOM.modalActive.id;
  window.DOM.modalActive.classList.remove("modal--visible");
  window.DOM.modalActive.classList.remove("modal--success");
  window.DOM.modalActive = null;
  setTimeout(() => {
    window.DOM.showScroll();

    const details = targetID ? { detail: { modalId: targetID } } : undefined;
    let closeModalEvent = new CustomEvent("closeModal", details);
    document.dispatchEvent(closeModalEvent);
  }, 300);
  document.body.removeEventListener("touchmove", preventMobileScroll);
}

function preventMobileScroll(e) {
  e.preventDefault();
  e.stopPropagation();
}
