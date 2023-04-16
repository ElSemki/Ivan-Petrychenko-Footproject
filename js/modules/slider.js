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

export default slider;
