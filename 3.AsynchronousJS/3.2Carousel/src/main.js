import './style.css';

const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
const url = `https://api.unsplash.com/photos/random?count=10&client_id=${accessKey}`;

function init() {

  // Определяем все элементы в одном месте
  const elements = {
    carousel: document.querySelector('.carousel'),
    next: document.querySelector('.next'),
    prev: document.querySelector('.prev'),
  };

  // Создаем state для возможности манипулирования каруселью
  const state = {
    images: [],
    currentIndex: 0,
  };

  // Функция для получение изображений из Unsplash
  async function fetchImages() {
    const response = await fetch(url);
    const data = await response.json();
    const imgColl = data.map(img => img.urls.regular)
    state.images.push(...imgColl);
    renderImages();
  }

  // Функция для подсчета индекса
  function getIndex(index, direction, length) {
    return (index + (direction === 'next' ? 1 : -1) + length) % length;
  }

  //Функция для класса изображения
  function addImgClass(img, index) {
    if (index === getIndex(state.currentIndex, 'prev', state.images.length)) {
      img.classList.add('prev');
    } else if (index === state.currentIndex) {
      img.classList.add('active');
    } else if (index === getIndex(state.currentIndex, 'next', state.images.length)) {
      img.classList.add('next');
    } else {
      return;
    }
  }

  // рендер изображений в карусели
  function renderImages() {
    state.images.forEach((imgSrc, index) => {
      const img = document.createElement('img');
      img.src = imgSrc;
      addImgClass(img, index);
      elements.carousel.appendChild(img);
      //Добавить prev при первом рендере
    });
  }

  // Смена изображения
  function changeImage(direction) {
    state.currentIndex = (state.currentIndex + (direction === 'next' ? 1 : -1) + state.images.length) % state.images.length;
    const imgs = elements.carousel.querySelectorAll('img');
    imgs.forEach((img, index) => {
      img.className = '';
      addImgClass(img, index);
    })
  }

  // Таймер для автоматической смены изображений
  let intervalId = setInterval(() => changeImage('next'), 3000);

  // Обработчики событий для кнопок
  elements.prev.addEventListener('click', () => {
    clearInterval(intervalId);
    changeImage('prev');
    intervalId = setInterval(() => changeImage('next'), 3000);
  });

  elements.next.addEventListener('click', () => {
    clearInterval(intervalId);
    changeImage('next');
    intervalId = setInterval(() => changeImage('next'), 3000);
  });

  fetchImages();
}

init();