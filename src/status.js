import { setToLocalStorage } from './store.js';

const sortIndex = (list) => {
  for (let i = 0; i < list.length; i += 1) {
    list[i].index = i;
  }
  return list;
};

const generateTodoList = () => {
  const list = document.getElementsByClassName('task');
  const toDoList = [];
  for (let i = 0; i < list.length; i += 1) {
    const description = list[i].children[0].children[1].innerText;
    const completed = list[i].children[0].children[0].checked;
    const index = list[i].children[0].children[0].name.split('-')[1];

    toDoList.push({
      description,
      completed,
      index,
    });
  }
  return toDoList;
};

const refreshStore = () => {
  const todoList = generateTodoList();
  const sortedList = sortIndex(todoList);

  setToLocalStorage(sortedList);
};

export { generateTodoList, sortIndex, refreshStore };
