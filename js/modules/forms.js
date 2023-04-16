import { openModal } from './modal';
import { closeModal } from './modal';
import { postData } from './services/services';

function forms(formSelector, modalTimerId) {
  // Работа с сервером

  // Forms
  // Вариант со старым методом XMlHttpRequest
  // const forms = document.querySelectorAll('form');
  // const message = {
  //   loading: 'img/form/spinner.svg',
  //   success: 'Спасибо, мы скоро свяжемся с вами',
  //   fail: 'Что-то пошло не так!',
  // };

  // // Присваиваем каждой форме функцию
  // forms.forEach((item) => {
  //   postData(item);
  // });

  // // Функция, отвечающая за постинг данных
  // function postData(form) {
  //   form.addEventListener('submit', (evt) => {
  //     evt.preventDefault();

  //     const statusMessage = document.createElement('img');
  //     statusMessage.src = message.loading;
  //     statusMessage.style.cssText = `
  //       display: block;
  //       margin: 0 auto;
  //     `;
  //     form.insertAdjacentElement('afterend', statusMessage);

  //     // Создаем объект request
  //     const request = new XMLHttpRequest();
  //     request.open('POST', 'server.php');
  //     // Даем заголовок. НООООО!!! При связке XMLHttpRequest и FormData заголовок писать не нужно. Он формируется автоматически!
  //     // ИНАЧЕ БУДЕТ ОШИБКА!!!
  //     // Но если мы отправляем данные в формате JSON, тогда он необходим
  //     request.setRequestHeader('Content-type', 'application/json');

  //     // Как сделать так, что бы все данные, которыми мы заполним форму, отправить на сервер?
  //     // Подготавливаем данные из формы для отправки на сервер
  //     // FormData - это специальный объект, который позволяет с формы сформировать все данные, которые ввел пользователь. В формате ключ: значение.
  //     const formData = new FormData(form);
  //     // Если данные необходимо отправить в формате JSON
  //     const object = {};
  //     formData.forEach((value, key) => {
  //       object[key] = value;
  //     });
  //     const json = JSON.stringify(object);
  //     // Отправляем данные
  //     // request.send(formData);
  //     // Если данные необходимо отправить в JSON - передаем JSON
  //     request.send(json);

  //     // Когда данные уйдут на сервер, необходимо будет что то сделать
  //     request.addEventListener('load', () => {
  //       if (request.status === 200) {
  //         console.log(request.response);
  //         showThanksModal(message.success);
  //         // Очищаем поля формы после отправки данных
  //         form.reset();
  //         statusMessage.remove();
  //       } else {
  //         showThanksModal(message.fail);
  //       }
  //     });
  //   });
  // }

  // // Модальное окно после отправки данных с формы
  // function showThanksModal(message) {
  //   // Находим контент модального окна
  //   const prevModalDialog = document.querySelector('.modal__dialog');
  //   // Открываем модальное окно
  //   // Скрываем его перед тем, как показать модальное окно
  //   prevModalDialog.remove();
  //   openModal();
  //   // Создание нового контента
  //   // Блок-обертка
  //   const thanksModal = document.createElement('div');
  //   thanksModal.classList.add('modal__dialog');
  //   thanksModal.innerHTML = `
  //     <div class="modal__content">
  //       <div class="modal__close" data-close>×</div>
  //       <div class="modal__title">${message}</div>
  //     </div>
  //   `;
  //   document.querySelector('.modal').append(thanksModal);
  //   // Удаляем блок благодарности после его показа через 4 секунды и возвращаем стандартную модалку
  //   setTimeout(() => {
  //     thanksModal.remove();
  //     document.querySelector('.modal').append(prevModalDialog);
  //     closeModal();
  //   }, 3000);
  // }

  // ........................................

  // Вариант с fetch api и promise

  // const forms = document.querySelectorAll('form');
  // const message = {
  //   loading: '../img/form/85. spinner.svg',
  //   success: 'Спасибо, мы скоро свяжемся с вами',
  //   fail: 'Что-то пошло не так!',
  // };

  // forms.forEach((item) => {
  //   postData(item);
  // });

  // function postData(form) {
  //   form.addEventListener('submit', (evt) => {
  //     evt.preventDefault();

  //     const statusMessage = document.createElement('img');
  //     statusMessage.src = message.loading;
  //     statusMessage.style.cssText = `
  //       display: block;
  //       margin: 0 auto;
  //     `;
  //     form.insertAdjacentElement('afterend', statusMessage);

  //     const formData = new FormData(form);
  //     const object = {};
  //     formData.forEach(function (value, key) {
  //       object[key] = value;
  //     });

  // Создание промиса и получение инфомрации
  //     fetch('server.php', {
  //       method: 'POST',
  //       headers: {
  //         'Content-type': 'application/json',
  //       },
  //       body: JSON.stringify(object),
  //     })
  //       .then((data) => data.text())
  //       .then((data) => {
  //         console.log(data);
  //         showThanksModal(message.success);
  //         statusMessage.remove();
  //       })
  //       .catch(() => {
  //         showThanksModal(message.fail);
  //       })
  //       .finally(() => {
  //         form.reset();
  //       });
  //   });
  // }

  // function showThanksModal(message) {
  //   const prevModalDialog = document.querySelector('.modal__dialog');
  //   prevModalDialog.remove();
  //   openModal();
  //   const thanksModal = document.createElement('div');
  //   thanksModal.classList.add('modal__dialog');
  //   thanksModal.innerHTML = `
  //     <div class="modal__content">
  //       <div class="modal__close" data-close>×</div>
  //       <div class="modal__title">${message}</div>
  //     </div>
  //   `;
  //   document.querySelector('.modal').append(thanksModal);
  //   setTimeout(() => {
  //     thanksModal.remove();
  //     document.querySelector('.modal').append(prevModalDialog);
  //     closeModal();
  //   }, 3000);
  // }

  // ........................................

  // Вариант с async/await

  const forms = document.querySelectorAll(formSelector);
  const message = {
    loading: '../img/form/85. spinner.svg',
    success: 'Спасибо, мы скоро свяжемся с вами',
    fail: 'Что-то пошло не так!',
  };

  forms.forEach((item) => {
    bindPostData(item);
  });

  function bindPostData(form) {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();

      const statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
      `;
      form.insertAdjacentElement('afterend', statusMessage);

      const formData = new FormData(form);

      // Данные с формы (данные из спец. объекта formData помещам в массив массивов, потом переделываем в объект, потом объект переделываем в json)
      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      postData('http://localhost:3000/requests', json)
        .then((data) => {
          console.log(data);
          showThanksModal(message.success);
          statusMessage.remove();
        })
        .catch(() => {
          showThanksModal(message.fail);
        })
        .finally(() => {
          form.reset();
        });
    });
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');
    prevModalDialog.remove();
    openModal('.modal', modalTimerId);
    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
      <div class="modal__content">
        <div class="modal__close" data-close>×</div>
        <div class="modal__title">${message}</div>
      </div>
    `;
    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      document.querySelector('.modal').append(prevModalDialog);
      closeModal('.modal');
    }, 3000);
  }

  // fetch(''https://jsonplaceholder.typicode.com/todos)
  //  .then(response => response.json()) <=== Это Promise
  //  .then(json => console.log(json))
  // ..................................................
}

export default forms;
