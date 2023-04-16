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

export default calc;
