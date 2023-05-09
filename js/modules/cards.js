import { getResource } from './services/services';

function cards() {
  // Карточки

  // Шаблоны карточек Class
  class MenuCard {
    constructor(img, altimg, title, descr, price, parentSelector, ...classes) {
      this.img = img;
      this.altimg = altimg;
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
      <img src=${this.img} alt=${this.altimg} />
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
  //     // Вызываем функцию/класс для создания карточек, вместо передачи параметров (obj.image, obj.altimg и тд.) передаем деструктуризацию
  //     data.forEach(({ img, altimg, title, descr, price }) => {
  //       new MenuCard(
  //         img,
  //         altimg,
  //         title,
  //         descr,
  //         price,
  //         '.menu .container'
  //       ).render();
  //     });
  //   });

  // Получение карточек при помощи библиотеки axios
  axios.get('http://localhost:3000/menu').then((data) => {
    data.data.forEach(({ img, altimg, title, descr, price }) => {
      new MenuCard(
        img,
        altimg,
        title,
        descr,
        price,
        '.menu .container'
      ).render();
    });
  });

  // ИЛИ без использования классов (без шаблонизации), создавая верстку на лету

  // getResource('http://localhost:3000/menu').then((data) => creaeteCard(data));

  // function creaeteCard(data) {
  //   data.forEach(({ img, altimg, title, descr, price }) => {
  //     const element = document.createElement('div');
  //     price *= 27;
  //     element.classList.add('menu__item');
  //     element.innerHTML = `
  //       <img src=${img} alt=${altimg} />
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

export default cards;
