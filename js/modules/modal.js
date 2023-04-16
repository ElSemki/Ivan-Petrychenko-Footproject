function openModal(modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add('show');
  modal.classList.remove('hide');
  document.body.style.overflow = 'hidden';

  if (modalTimerId) {
    clearInterval(modalTimerId);
  }
}

function closeModal(modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add('hide');
  modal.classList.remove('show');
  document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimerId) {
  // Modal

  const modalTrigger = document.querySelectorAll(triggerSelector);
  const modal = document.querySelector(modalSelector);

  modalTrigger.forEach((btn) => {
    btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
  });

  modal.addEventListener('click', (evt) => {
    if (evt.target === modal || evt.target.className === 'modal__close') {
      closeModal(modalSelector);
    }
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.code === 'Escape' && modal.classList.contains('show')) {
      closeModal(modalSelector);
    }
  });

  // Если пользователь долистал страницу до низа, модальное окно должно открыться
  function showModalByScroll() {
    if (
      // Общую сумму проскроленных пикселей сверху вниз и видимого окружения сравниваем с общим количеством высоты скролла -1px
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight - 1
    ) {
      openModal(modalSelector, modalTimerId);
      // Удаляем обработчик после первого открытия модалки внизу сайта
      window.removeEventListener('scroll', showModalByScroll);
    }
  }
  // Добавляем обработчик событий scroll на всю страницу
  window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export { openModal };
export { closeModal };
