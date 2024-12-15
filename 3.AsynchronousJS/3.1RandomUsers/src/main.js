import './style.css';

function init() {
  //Создаем state
  const state = {
    users: [],
    error: '',
    loading: false,
  }

  //Все элементы в одном месте
  const elements ={
    button: document.querySelector('.button'),
    ul: document.querySelector('.usersList'),
    feedback: document.querySelector('.feedback'),
  }

  //url для запроса
  const url = 'https://randomuser.me/api/?results=10';

  // Функция по заданию!!! Функция для запроса юзеров
  function fetchRandomUsers() {
    elements.feedback.innerHTML = 'Загрузка...';
    fetch(url)
      .then(response => console.log('response:', response))
      //   {
      //   console.log('response', response);
      //   return response.json();
      // })
      .then(data => {
        console.log('data:', data);
        elements.feedback.innerHTML = '';
        data.result.forEach(user => {
          const { name, email, picture } = user;
          const liEl = document.createElement('li');
          liEl.classList.add('user');

          const spanName = document.createElement('span');
          spanName.classList.add('name');
          spanName.textContent = name;
          liEl.appendChild(spanName);

          const spanEmail = document.createElement('span');
          spanEmail.classList.add('email');
          spanEmail.textContent = email;
          liEl.appendChild(spanEmail);
          
          const img = document.createElement('img');
          img.setAttribute('src', picture.medium);
          liEl.appendChild(img);

          elements.ul.appendChild(liEl);
        })
      })

  }


  elements.button.addEventListener('click', function() {
    fetchRandomUsers()
  })
}

init();