/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function calc() {
  // Калькулятор каллорий

  // Куда выводится подсчет каллорий
  const resultCalories = document.querySelector('.calculating__result span');

  // Переменные для элементов из калькурятора
  let sex, height, weight, age, ratio;

  // Если при заходе на сайт в localStorage записан пол, то есть мы уже когда то выбрали, то присваеваем переменной sex это значение
  if (localStorage.getItem('sex')) {
    sex = localStorage.getItem('sex');
  } else {
    // Если в localStorage ничего нет, записываем пол по умолчанию, и записываем в localStorage это значение
    sex = 'female;';
    localStorage.setItem('sex', 'female');
  }

  // Если при заходе на сайт в localStorage записана активность, то есть мы уже когда то выбрали, то присваеваем переменной ratio это значение
  if (localStorage.getItem('ratio')) {
    ratio = localStorage.getItem('ratio');
  } else {
    // Если в localStorage ничего нет, записываем активность по умолчанию, и записываем в localStorage это значение
    ratio = 1.375;
    localStorage.setItem('ratio', 1.375);
  }

  // Функция для проверки записаных элементов в localStorage и присваиванию им активного класса при заходе на сайт
  function initLocalSettings(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    // Функция используется либо на дивах с выбором пола, либо на дивах с выбором активности

    // Убираем активный класс у всех элементов
    elements.forEach((element) => {
      element.classList.remove(activeClass);
      // Если у элемента пол совпадает со значением в localStorage - даем ему активный класс
      if (element.getAttribute('id') === localStorage.getItem('sex')) {
        element.classList.add(activeClass);
      }

      // Если у элемента активности значение совпадает со значением в localStorage - даем ему активный класс
      if (
        element.getAttribute('data-ratio') === localStorage.getItem('ratio')
      ) {
        element.classList.add(activeClass);
      }
    });
  }

  // Вызываем функцию для кнопок с выбором пола
  initLocalSettings('#gender div', 'calculating__choose-item_active');
  // Вызываем функцию для кнопок активности
  initLocalSettings(
    '.calculating__choose_big div',
    'calculating__choose-item_active'
  );

  // Функция для рассчета каллорий по формуле
  function calculatedTotal() {
    // Если хотя бы один элемент калькулятора не выбран или не заполнен - выводим прочерк и прерываем функцию
    if (!sex || !height || !weight || !age || !ratio) {
      resultCalories.textContent = '---';
      return;
    }

    // Если пол женский - рассчитываем по формуле для женщин
    if (sex === 'female') {
      resultCalories.textContent = Math.round(
        (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio
      );
    } else {
      // Если пол мужской
      resultCalories.textContent = Math.round(
        (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio
      );
    }
  }

  calculatedTotal();

  // Функция для получения статических данных с формы (дивов/кнопок)
  function getStaticInformation(selector, activeClass) {
    // Находим элементы со страницы
    const elements = document.querySelectorAll(selector);

    elements.forEach((element) => {
      element.addEventListener('click', (evt) => {
        // Если мы кликаем по элементам, которые имеют атрибут data-ratio - то работаем с элементами суточной активности
        if (evt.target.getAttribute('data-ratio')) {
          // Записываем в переменную ratio тот коэффициент активности из data-атрибута, который привязан к опроделенному элементу суточной активности
          ratio = +evt.target.getAttribute('data-ratio');
          // Записываем выбранные параметры в localStorage
          localStorage.setItem('ratio', +evt.target.getAttribute('data-ratio'));
        } else {
          // Если мы работаем с полом - при клике получаем его id (мужчина или женщина)
          sex = evt.target.getAttribute('id');
          // Записываем выбранные параметры в localStorage
          localStorage.setItem('sex', evt.target.getAttribute('id'));
        }
        elements.forEach((el) => {
          // Работа с активным классом - убираем активный класс у всех элементов
          el.classList.remove(activeClass);
        });
        // Добавляем активный класс элементу, на который кликнули
        evt.target.classList.add(activeClass);
        // Запускаем функцию подсчета каллорий исходя из выбранных элементов и при изменении какого-то значения
        calculatedTotal();
      });
    });
  }

  // Вызываем функцию для кнопок с выбором пола
  getStaticInformation('#gender div', 'calculating__choose-item_active');
  // Вызываем функцию для кнопок активности
  getStaticInformation(
    '.calculating__choose_big div',
    'calculating__choose-item_active'
  );

  // Функция для обработки инпутов в калькуляторе где мы вводим значения
  function getDynamicInformation(selector) {
    // Получаем нужный инпут
    const input = document.querySelector(selector);

    // Навешимаем обработчик на инпут
    input.addEventListener('input', () => {
      // Если пользователь ввел не число - инпут подветится красным
      if (input.value.match(/\D/g)) {
        input.style.border = '1px solid red';
      } else {
        input.style.border = 'none';
      }
      // Проверяем что это за инпут (рост, вес, возраст) и вписываем туда значение, которые ввели в инпут
      switch (input.getAttribute('id')) {
        case 'height':
          height = +input.value;
          break;
        case 'weight':
          weight = +input.value;
          break;
        case 'age':
          age = +input.value;
          break;
      }
      // При изменениии какого то значения вызываем функцию подсчета каллорий по формуле
      calculatedTotal();
    });
  }

  // Вызываем функцию для каждого инпута
  getDynamicInformation('#height');
  getDynamicInformation('#weight');
  getDynamicInformation('#age');
}

/* harmony default export */ __webpack_exports__["default"] = (calc);


/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services/services */ "./js/modules/services/services.js");


function cards() {
  // Карточки

  // Шаблоны карточек Class
  class MenuCard {
    constructor(img, alt, title, descr, price, parentSelector, ...classes) {
      this.img = img;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.parentSelector = document.querySelector(parentSelector);
      this.classes = classes;
      this.transfer = 27;
      this.changeMoney();
    }

    changeMoney() {
      this.price = this.price * this.transfer;
    }

    render() {
      const card = document.createElement('div');
      if (this.classes.length === 0) {
        this.card = 'menu__item';
        card.classList.add(this.card);
      } else {
        this.classes.forEach((className) => card.classList.add(className));
      }

      card.innerHTML = `
      <img src=${this.img} alt=${this.alt} />
      <h3 class="menu__item-subtitle">${this.title}</h3>
      <div class="menu__item-descr">${this.descr}</div>
      <div class="menu__item-divider"></div>
      <div class="menu__item-price">
        <div class="menu__item-cost">Цена:</div>
        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
      </div>
      `;
      this.parentSelector.append(card);
    }
  }

  // Используем Promise для получения карточек с сервера
  // getResource('http://localhost:3000/menu')
  //   // Принимаем данные (объект)
  //   .then((data) => {
  //     // Так-как нам придет массив карточек, переберем их и сделаем с ними действимя
  //     // Вызываем функцию/класс для создания карточек, вместо передачи параметров (obj.image, obj.alt и тд.) передаем деструктуризацию
  //     data.forEach(({ img, alt, title, descr, price }) => {
  //       new MenuCard(
  //         img,
  //         alt,
  //         title,
  //         descr,
  //         price,
  //         '.menu .container'
  //       ).render();
  //     });
  //   });

  // Получение карточек при помощи библиотеки axios
  axios.get('http://localhost:3000/menu').then((data) => {
    data.data.forEach(({ img, alt, title, descr, price }) => {
      new MenuCard(img, alt, title, descr, price, '.menu .container').render();
    });
  });

  // ИЛИ без использования классов (без шаблонизации), создавая верстку на лету

  // getResource('http://localhost:3000/menu').then((data) => creaeteCard(data));

  // function creaeteCard(data) {
  //   data.forEach(({ img, alt, title, descr, price }) => {
  //     const element = document.createElement('div');
  //     price *= 27;
  //     element.classList.add('menu__item');
  //     element.innerHTML = `
  //       <img src=${img} alt=${alt} />
  //       <h3 class="menu__item-subtitle">${title}</h3>
  //       <div class="menu__item-descr">${descr}</div>
  //       <div class="menu__item-divider"></div>
  //       <div class="menu__item-price">
  //         <div class="menu__item-cost">Цена:</div>
  //         <div class="menu__item-total"><span>${price}</span> грн/день</div>
  //       </div>
  //       `;
  //     document.querySelector('.menu .container').append(element);
  //   });
  // }
}

/* harmony default export */ __webpack_exports__["default"] = (cards);


/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services/services */ "./js/modules/services/services.js");




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

      (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
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
    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimerId);
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
      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
    }, 3000);
  }

  // fetch(''https://jsonplaceholder.typicode.com/todos)
  //  .then(response => response.json()) <=== Это Promise
  //  .then(json => console.log(json))
  // ..................................................
}

/* harmony default export */ __webpack_exports__["default"] = (forms);


/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": function() { return /* binding */ closeModal; },
/* harmony export */   "openModal": function() { return /* binding */ openModal; }
/* harmony export */ });
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

/* harmony default export */ __webpack_exports__["default"] = (modal);




/***/ }),

/***/ "./js/modules/services/services.js":
/*!*****************************************!*\
  !*** ./js/modules/services/services.js ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResource": function() { return /* binding */ getResource; },
/* harmony export */   "postData": function() { return /* binding */ postData; }
/* harmony export */ });
// Создание функции для общения с сервером + применение ASYNC/AWAIT
// async ставится перед функцией (так мы ей говорим, что там будет асинхронный код)
// await ставится перед теми операциями, которые нам необходимо дождаться
const postData = async (url, data) => {
  // Создание Promise
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: data,
  });
  // Возвращаем Promise
  return await res.json();
};

// Функция для получения карточек с сервера
const getResource = async (url) => {
  // Создание Promise
  const res = await fetch(url);
  // Руками обозначаем ошибки, при которых будет срабатывать reject
  // .ok - мы что то получили, все ок. Или не ок
  if (!res.ok) {
    // throw - выкидывает ошибку
    // Создание объекта ошибки
    // status - мы попадаем на статус, который вернули (200, 404)
    throw new Error(`Could not fetch ${url}, status: ${res.status}`);
  }
  // Возвращаем Promise
  return await res.json();
};





/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function slider({
  container,
  slide,
  prevArrow,
  nextArrow,
  totalCounter,
  currentCounter,
  wrapper,
  field,
}) {
  // Slider;
  const slides = document.querySelectorAll(slide);
  const slider = document.querySelector(container);
  const prevSlideBtn = document.querySelector(prevArrow);
  const nextSlideBtn = document.querySelector(nextArrow);
  // Показывает на счетчеке текущий слайд
  let currentSlideNum = document.querySelector(currentCounter);
  // Показывает на счетчеке общее кол-во слайдов
  let totalSlidesNum = document.querySelector(totalCounter);
  // Номер слайдера
  let slideCurrentIndex = 1;

  // // Первый вариант
  // showSlides(slideCurrentIndex);

  // // Определяем общее кол-во слайдов и выводим счетчик
  // if (slides.length < 10) {
  //   totalSlidesNum.textContent = `0${slides.length}`;
  // } else {
  //   totalSlidesNum.textContent = slides.length;
  // }

  // function showSlides(n) {
  //   // Если мы доходим до последнего слайда - возвращаемся на первый
  //   if (n > slides.length) {
  //     slideCurrentIndex = 1;
  //   }
  //   // Если мы на первом слайде и жмем стрелку <= - переходим на последний слайдер
  //   if (n < 1) {
  //     slideCurrentIndex = slides.length;
  //   }
  //   // Скрываем все слайдеры
  //   slides.forEach((slide) => {
  //     slide.style.display = 'none';
  //   });

  //   // Показываем нужный слайдер
  //   slides[slideCurrentIndex - 1].style.display = 'block';

  //   // Определяем текущий слайд и выводим счетчик
  //   if (sliders.length < 10) {
  //     currentSlideNum.textContent = `0${slideCurrentIndex}`;
  //   } else {
  //     currentSlideNum.textContent = slideCurrentIndex;
  //   }
  // }

  // // Функция для изменения нашего slideCurrentIndex при переключении кнопками
  // function plusSlideIndex(n) {
  //   showSlides((slideCurrentIndex += n));
  // }

  // // При клике на <= вызывается функция слайдера и слайдер листается назад (от индекса slideCurrentIndex - 1)
  // prevSlideBtn.addEventListener('click', () => {
  //   plusSlideIndex(-1);
  // });
  // // При клике на => вызывается функция слайдера и слайдер листается вперед (к индексу slideCurrentIndex + 1)
  // nextSlideBtn.addEventListener('click', () => {
  //   plusSlideIndex(1);
  // });

  // Второй вариант СЛАЙДЕРА
  // Окошко нашего слайдера, через который виден текущий слайд
  const slidesWrapper = document.querySelector(wrapper);
  // Обертка всех слайдов
  const slidesField = document.querySelector(field);
  // Ширина блока (окошка), через который мы видим текущий слайд (получаем из css)
  const widthWindowSlide = window.getComputedStyle(slidesWrapper).width;
  // Отступ для transform
  let offset = 0;

  // // Определяем общее кол-во слайдов и выводим счетчик
  if (slides.length < 10) {
    totalSlidesNum.textContent = `0${slides.length}`;
    currentSlideNum.textContent = `0${slideCurrentIndex}`;
  } else {
    totalSlidesNum.textContent = slides.length;
    currentSlideNum.textContent = slideCurrentIndex;
  }

  // Ограничиваем показ слайдов
  slidesWrapper.style.overflow = 'hidden';
  // Выстраиваем слайды в ряд
  slidesField.style.display = 'flex';
  // Выстраивает внутри себя все слайды в линию (Выстраиваем ширину блока, для того, что бы все слайды были в ряд)
  // 100 * на количество слайдов
  slidesField.style.width = 100 * slides.length + '%';
  // Анимация при пролистывании
  slidesField.style.transition = '0.5s all';
  // Даем каждому слайду определенную ширину (Ширину окна, где мы видим текущий слайд)
  slides.forEach((slide) => {
    slide.style.width = widthWindowSlide;
  });

  // DOTS
  // 1) Найти Секцию слайдера
  // 2) Установить ему position: relative
  // 3) Создаем обертку для точек
  // 4) При помощи цикла создаем столько же точек, сколько и слайдов
  // 5) Каждой точке устанавливаем атрибут
  // 6) Создаем класс активности

  slider.style.position = 'relative';
  const carouselIndicators = document.createElement('ol');
  const dots = [];
  carouselIndicators.classList.add('carousel-indicators');
  slider.append(carouselIndicators);
  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    // Назначаем каждой кнопке дата-атрибут, что бы обозначить каждую из них
    dot.setAttribute('data-slide-to', i + 1);
    dot.classList.add('dot');
    // По умолчанию делаем первую кнопку ярче
    if (i == 0) {
      dot.style.opacity = 1;
    }
    carouselIndicators.append(dot);
    dots.push(dot);
  }

  // ..................................................

  // Индикатор текущего слайда
  function indexCurrnetsSlide() {
    if (slides.length < 10) {
      currentSlideNum.textContent = `0${slideCurrentIndex}`;
    } else {
      currentSlideNum.textContent = slideCurrentIndex;
    }
  }

  // Всем кнопкам (точкам) задаем полупрозрачность, а кнопке, которая показывает слайд даем полный окрас
  function styleOpacityDots() {
    dots.forEach((dot) => (dot.style.opacity = '0.5'));
    dots[slideCurrentIndex - 1].style.opacity = 1;
  }

  const deleteNotDigits = (str) => +str.replace(/\D/g, '');

  nextSlideBtn.addEventListener('click', () => {
    if (
      // При клике предусматриваем вариант, когда мы доходим до последнего слайда, мы возвращаемся на первый
      // +widthWindowSlide.replace(/\D/g, '') * (slides.length - 1) Это расчет offset(translate) последнего слайда в slidesField
      // Так же у widthWindowSlide вырезаем 'px', так как это у нас математическая операция, а значение widthWindowSlide записано в px
      offset ==
      deleteNotDigits(widthWindowSlide) * (slides.length - 1)
    ) {
      offset = 0;
    } else {
      // Если у нас не последний слайд то мы к offset добавляем ширину одного слайда. Тем самым переключаем слайд на другой
      offset += deleteNotDigits(widthWindowSlide);
    }
    // На сколько и куда смещаем слайдер при клике
    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideCurrentIndex == slides.length) {
      slideCurrentIndex = 1;
    } else {
      slideCurrentIndex++;
    }

    // Индикатор текущего слайда
    indexCurrnetsSlide();

    styleOpacityDots();
  });

  prevSlideBtn.addEventListener('click', () => {
    // Если мы на первом слайде, то возвращаемся на последний слайд
    if (offset == 0) {
      offset = deleteNotDigits(widthWindowSlide) * (slides.length - 1);
    } else {
      // Если это не первый слайд, мы отнимаем ширину слайда от offset
      offset -= deleteNotDigits(widthWindowSlide);
    }
    // На сколько и куда смещаем слайдер при клике
    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideCurrentIndex == 1) {
      slideCurrentIndex = slides.length;
    } else {
      slideCurrentIndex--;
    }

    // Индикатор текущего слайда
    indexCurrnetsSlide();

    styleOpacityDots();
  });

  dots.forEach((dot) => {
    dot.addEventListener('click', (e) => {
      // Получаем дата атрибут кнопки, что бы определить какая именно была нажата
      const slideTo = e.target.getAttribute('data-slide-to');

      // Какой дата-атрибут, такой и индекс
      slideCurrentIndex = slideTo;

      offset = deleteNotDigits(widthWindowSlide) * (slideTo - 1);

      slidesField.style.transform = `translateX(-${offset}px)`;

      // Индикатор текущего слайда
      indexCurrnetsSlide();

      styleOpacityDots();
    });
  });
}

/* harmony default export */ __webpack_exports__["default"] = (slider);


/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function tabs(
  tabsSelector,
  tabsContentSelector,
  tabsItemSelector,
  activeClass
) {
  // / ТАБЫ
  // Есть три глобальные задачи...
  // 1) Скрывать ТАБЫ
  // 2) Показать нужный таб
  // 3) Повесить обработчик событий на меню
  // Действия
  // 1) Дать глобальный обработчик событий document.DOMContentLoader
  // 2) Создать переменные для баннера слева от списка табов, родителя табов, и самих табов
  // 3) Есть активный таб (выделяется жирным шрифтом)
  // 1) Создать функцию для скрытия контента + создать класс для скрытия
  // 2) добавить класс скрытия и убрать класс показа + удалить класс анимации
  // 3) Добавить доп функционал в ^ функцию (скрыть активный элемент контента)
  // 1) Создаем функцию, которая будет показывать табы с параметром по умолчанию + активный элемент + создать класс для показа
  // 2) добавить класс показа + анимации и убрать класс скрытия
  // 2)
  // 3) Вешаем обработчик событий на родителя табов (делегирование)
  // класс для анимации
  // .fade{animation-name: fade;animation-duration: 1.5s;}@keyframes fade{from{opacity: 0.1;}to{opacity: 1;}}

  const tabsWrapper = document.querySelector(tabsSelector);
  const tabContent = document.querySelectorAll(tabsContentSelector);
  const tabItems = document.querySelectorAll(tabsItemSelector);

  function hideTabContent() {
    tabContent.forEach((item) => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    });

    tabItems.forEach((item) => {
      item.classList.remove(activeClass);
    });
  }

  function showTabContent(i = 0) {
    tabContent[i].classList.add('show', 'fade');
    tabContent[i].classList.remove('hide');
    tabItems[i].classList.add(activeClass);
  }

  hideTabContent();
  showTabContent();

  tabsWrapper.addEventListener('click', (evt) => {
    let target = evt.target;
    if (target && target.classList.contains(tabsItemSelector.slice(1))) {
      tabItems.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
}

/* harmony default export */ __webpack_exports__["default"] = (tabs);


/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function timer(id, deadline) {
  // ТАЙМЕР ОБРАТНОГО ОТСЧЕТА
  // ДЕЙСТВИЯ
  // 1) Создать функцию, которая будет устанавливать таймер
  // 2) Функция разницы между временем
  // 3) Функция для обновления таймера

  // Функция, которая будет опеределять разницу между deadline и нашим текущим временем
  function getTimeRemaining(endtime) {
    let days, hours, minutes, seconds;
    // Получим миллисекунды в строке и переведем в цифры. В итоге получим разницу времени
    // Так как значени придет в строке, необходимо перевести данные в цифры для вычисления
    // От кол-ва миллисекунд в конечном времени отнимаем нашу текущую дату в миллисекундах
    const t = Date.parse(endtime) - Date.parse(new Date());
    // ^ Получаем разницу в миллисекундах. Теперь это значение необходимо перевести в дни, часы, минуты, секунды
    // Получаем дни (округляем до ближайшего целого числа)
    // Проверим, прошедшая это дата или нет
    if (t <= 0) {
      // Если дата прошедшая - выводим нули
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
      // Делим миллисекунды из t на кол-во миллисекунд в сутках. Получаем сколько суток осталось до окончания даты deadline
      days = Math.floor(t / (1000 * 60 * 60 * 24));
      // Получаем часы. Общее кол-во миллисекунд (разницу (t)) / на кол-во миллисекунд в часе
      hours = Math.floor((t / (1000 * 60 * 60)) % 24);
      // Минуты (кол-во секунд / 60 и оплучаем кол-во минут)
      minutes = Math.floor((t / 1000 / 60) % 60);
      // Секунды
      seconds = Math.floor((t / 1000) % 60);
    }

    // Возвращаем объект с временем (дни, часы, минуты, секунды)
    return {
      total: t,
      days,
      hours,
      minutes,
      seconds,
    };
  }

  // Функция-помощник для вставки 0 во время на странице
  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  // Встраиваем наш таймер на страницу (в html)
  function setClock(selector, endtime) {
    // Находим элементы на странице
    const timer = document.querySelector(selector);
    const days = timer.querySelector('#days');
    const hours = timer.querySelector('#hours');
    const minutes = timer.querySelector('#minutes');
    const seconds = timer.querySelector('#seconds');
    // Запускаем функцию updateClock каждую секунду
    const timeInterval = setInterval(updateClock, 1000);

    // Вызываем функцию обновления таймера для моментального старта
    updateClock();

    // Функция, которая будет обновлять наш наймер на стр. каждую секунду
    function updateClock() {
      // Расчет того времени, который остался прямо на эту секунду.
      // Будет возвращать объект функции getTimeRemaining (дату и время)
      const t = getTimeRemaining(endtime);

      // Расчетные величины помещаем на страницу (можно так же при помощи textContent)
      // Обращамеся к свойствам объекта из функции getTimeRemaining (вызов функции мы присвоили переменной t)
      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      // Если время вышло, останавливаем таймер (timeInterval)
      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock(id, deadline);
}

/* harmony default export */ __webpack_exports__["default"] = (timer);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");









window.addEventListener('DOMContentLoaded', () => {
  const modalTimerId = setTimeout(
    () => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimerId),
    50000
  );

  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_0__["default"])('[data-modal', '.modal', modalTimerId);
  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_1__["default"])(
    '.tabheader__items',
    '.tabcontent',
    '.tabheader__item',
    'tabheader__item_active'
  );
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])('.timer', '2023-04-29');
  (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_4__["default"])({
    container: '.offer__slider',
    slide: '.offer__slide',
    prevArrow: '.offer__slider-prev',
    nextArrow: '.offer__slider-next',
    totalCounter: '#total',
    currentCounter: '#current',
    wrapper: '.offer__slider-wrapper',
    field: '.offer__slider-inner',
  });
  (0,_modules_forms__WEBPACK_IMPORTED_MODULE_5__["default"])('form', modalTimerId);
  (0,_modules_calc__WEBPACK_IMPORTED_MODULE_6__["default"])();
});

}();
/******/ })()
;
//# sourceMappingURL=bundle.js.map