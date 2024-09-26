/**
 * modalEffects.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
const ModalEffects = (function () {
  function init() {
    const overlay = document.querySelector('.md-overlay');

    [].slice.call(document.querySelectorAll('.md-trigger')).forEach((el, i) => {
      const modal = document.querySelector(`#${el.getAttribute('data-modal')}`);
      const close = modal.querySelector('.md-close');

      function removeModal(hasPerspective) {
        classie.remove(modal, 'md-show');

        if (hasPerspective) {
          classie.remove(document.documentElement, 'md-perspective');
        }
      }

      function removeModalHandler() {
        removeModal(classie.has(el, 'md-setperspective'));
      }

      el.addEventListener('click', (ev) => {
        classie.add(modal, 'md-show');
        overlay.removeEventListener('click', removeModalHandler);
        overlay.addEventListener('click', removeModalHandler);

        if (classie.has(el, 'md-setperspective')) {
          setTimeout(() => {
            classie.add(document.documentElement, 'md-perspective');
          }, 25);
        }
      });

      close.addEventListener('click', (ev) => {
        ev.stopPropagation();
        removeModalHandler();
      });
    });
  }

  init();
}());
