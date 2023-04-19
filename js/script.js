import modal from './modules/modal';
import tabs from './modules/tabs';
import timer from './modules/timer';
import cards from './modules/cards';
import slider from './modules/slider';
import forms from './modules/forms';
import calc from './modules/calc';
import { openModal } from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {
  const modalTimerId = setTimeout(
    () => openModal('.modal', modalTimerId),
    50000
  );

  modal('[data-modal]', '.modal', modalTimerId);
  tabs(
    '.tabheader__items',
    '.tabcontent',
    '.tabheader__item',
    'tabheader__item_active'
  );
  timer('.timer', '2023-04-29');
  cards();
  slider({
    container: '.offer__slider',
    slide: '.offer__slide',
    prevArrow: '.offer__slider-prev',
    nextArrow: '.offer__slider-next',
    totalCounter: '#total',
    currentCounter: '#current',
    wrapper: '.offer__slider-wrapper',
    field: '.offer__slider-inner',
  });
  forms('form', modalTimerId);
  calc();
});
