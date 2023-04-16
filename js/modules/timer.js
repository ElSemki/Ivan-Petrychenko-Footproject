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

export default timer;
