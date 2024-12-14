import './style.css';

function init() {

  // Определяем все элементы в одном месте
  const elements = {
    form: document.querySelector('form'),
    input: document.querySelector('.input'),
    button: document.querySelector('.button'),
    ul: document.querySelector('.tasks_list'),
    filterCompleted: document.querySelector('#completed'),
    filterUnCompleted: document.querySelector('#uncompleted'),
  };

  // Создаем state для возможности манипулирования списком
  const state = {
    tasks: [],
    filter: {
      uncompleted: elements.filterUnCompleted.checked,
      completed: elements.filterCompleted.checked,
    }
  };

  //Функция для фильтрации списка (выше незавершенные задачи)
  function getFilteredList () {
    const uncompletedTasks = state.tasks.filter(task => (state.filter.uncompleted && !task.completed));
    const completedTasks = state.tasks.filter(task => (state.filter.completed && task.completed));
    return [...uncompletedTasks, ...completedTasks];
  }

  // Функция для обновления списка задач
  function renderList() {
    elements.ul.innerHTML = '';
    const filteredList = getFilteredList();
    filteredList.forEach((task) => {
      const { text, completed } = task;
        const taskEl = document.createElement('li');
        taskEl.classList.add('task');
        completed ? taskEl.classList.add('completed') : null;

        taskEl.addEventListener('click', function() {
          toggleCompletedTask(task);
        })

        const textEl = document.createElement('span');
        textEl.textContent = text;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = "X";
        deleteBtn.addEventListener('click', function(event) {
          event.stopPropagation();
          deleteTask(task);
        })
        
        taskEl.appendChild(textEl);
        taskEl.appendChild(deleteBtn);
        elements.ul.appendChild(taskEl);
    });
  }

  //Функция для удаления задачи
  function deleteTask (task) {
    const index = state.tasks.indexOf(task);
    state.tasks.splice(index, 1);
    renderList();
  }

  //Функция отметить задачу как "выполнено"
  function toggleCompletedTask (taskEl) {
    const task = state.tasks.find(task => task.id === taskEl.id);
    if(task.completed) {
      task.completed = false;
    } else {
      task.completed = true;
    }
    renderList();
  }

  // Событие на кнопку "Добавить"
  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    state.tasks.push({id: elements.input.value, text: elements.input.value, completed: false});
    elements.form.reset();
    elements.input.focus();
    renderList();
  });

  // События для фильтра
  elements.filterCompleted.addEventListener('change', (e) => {
    state.filter.completed = e.target.checked;
    renderList();
  });

  elements.filterUnCompleted.addEventListener('change', (e) => {
    state.filter.uncompleted = e.target.checked;
    renderList();
  });
}

init();