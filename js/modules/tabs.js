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

export default tabs;
