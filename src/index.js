/* eslint-disable */
import './style.css';
import { addTaskToList, tasksList, changeStatus } from './status.js';
import { addToDo, clearAll, editTodo, deleteTask, taskInput } from './addremove.js';

let taskCheckboxes = document.querySelectorAll('.list-checkbox');
let tasksElements = document.querySelectorAll('.tasks-list li');
const clearBtn = document.querySelector('.btn-clear');
const editInput = document.createElement('input');
editInput.setAttribute('type', 'text');

let toDoList = [];

const getTaskData = () => {
  toDoList = JSON.parse(localStorage.getItem('ListData') || '[]');
};

const storeListData = () => {
  localStorage.setItem('ListData', JSON.stringify(toDoList));
};

const updateCompletedToArray = (element) => {
  const listElement = element.parentNode.parentNode;
  if (element.checked) {
    toDoList[parseInt(listElement.dataset.id, 10)].completed = true;
  } else {
    toDoList[parseInt(listElement.dataset.id, 10)].completed = false;
  }
  storeListData();
};

const addListenerToBoxes = (boxes) => {
  boxes.forEach((checkBox) => {
    checkBox.addEventListener('click', (e) => {
      changeStatus(e.target.checked, e.target.nextSibling);
      updateCompletedToArray(e.target);
    });
  });
};

const updateCheckboxes = () => {
  taskCheckboxes = document.querySelectorAll('.list-checkbox');
  addListenerToBoxes(taskCheckboxes);
};

const updateArray = () => {
  const items = [...tasksList.children];

  toDoList = [];

  items.forEach((item, index) => {
    const childDiv = item.firstChild;
    const newTask = {
      description: childDiv.lastChild.textContent,
      completed: childDiv.firstChild.checked,
      index: index + 1,
    };
    toDoList.push(newTask);
  });
  storeListData();
};

const setEditListeners = (icons) => {
  icons.forEach((icon) => {
    icon.addEventListener('click', (e) => {
      if (e.target.classList.contains('fa-ellipsis-v')) {
        changeElipsisIcon(e.target);
        toggleEdit(e.target, editInput);
      } else {
        deleteTask(e.target);
        updateArray();
      }
    });
  });
};

const updateTasksElements = () => {
  tasksElements = document.querySelectorAll('.tasks-list li');
  setEditListeners(document.querySelectorAll('.list-icon'));
};

const displayList = () => {
  tasksList.innerHTML = '';
  toDoList.forEach((task) => addTaskToList(task));
  updateCheckboxes();
  updateTasksElements();
};

const setTaskInput = () => {
  taskInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      const newInput = {
        description: event.target.value,
        completed: false,
        index: toDoList.length + 1,
      };
      event.target.value = '';
      addToDo(newInput, toDoList);
      displayList();
      storeListData();
    }
  });
};

document.addEventListener('DOMContentLoaded', () => {
  getTaskData();
  storeListData();
  setTaskInput();
  displayList();
});

clearBtn.addEventListener('click', () => {
  clearAll(tasksList);
  updateArray();
});

editInput.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    changeTrashIcon(e.target);
    editTodo(e.target);
    if (e.target.value !== '') {
      editTodo(e.target.value);
      e.target.value = '';
      updateArray();
    }
  }
});