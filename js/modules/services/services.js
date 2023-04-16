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

export { postData };
export { getResource };
