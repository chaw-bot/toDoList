const setToLocalStorage = (toDo) => {
  localStorage.setItem('toDo', JSON.stringify(toDo));
};

const getFromLocalStorage = () => {
  const toDo = localStorage.getItem('toDo');
  return JSON.parse(toDo);
};

const markAsDone = (index, value) => {
  const toDo = getFromLocalStorage();
  toDo.forEach((item) => {
    if (item.index === Number(index) || item.index === index.toString()) {
      item.completed = value;
    }
  });
  setToLocalStorage(toDo);
};

const updateToDo = (task) => {
  const checkbox = task.children[0].children[0];
  const checkboxIndex = checkbox.getAttribute('name').split('-')[1];

  if (checkbox.checked) {
    markAsDone(checkboxIndex, true);
    checkbox.nextElementSibling.style.textDecoration = 'line-through';
  } else {
    markAsDone(checkboxIndex, false);
    checkbox.nextElementSibling.style.textDecoration = 'none';
  }
};

const reloadToDo = () => {
  const toDoList = document.getElementsByClassName('task');

  [...toDoList].forEach((toDoList) => {
    toDoList.children[0].children[0].addEventListener('change', () => {
      updateToDo(toDoList);
    });
  });
};

export { setToLocalStorage, getFromLocalStorage, reloadToDo };
