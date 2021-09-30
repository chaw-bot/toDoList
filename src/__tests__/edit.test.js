/**
 * @jest-environment jsdom
 */

import LocalStorage from '../store';

const localStorage = new LocalStorage();

const updateArray = (tasksArray, tasksList) => {
  const items = [...tasksList.children];

  tasksArray = [];

  items.forEach((item, index) => {
    const newTask = {
      description: item.lastChild.textContent,
      completed: item.firstChild.checked,
      index: index + 1,
    };
    tasksArray.push(newTask);
  });
  localStorage.setDataLocalStorage(tasksArray);
};

describe('edit methods tests', () => {
  document.body.innerHTML = '<ul class="tasks-list">'
  + '<li data-id = "1"><input type="checkbox"><p>task 1</p></li>'
  + '</ul>';

  const tasksList = document.querySelector('.tasks-list');

  const tasksArray = [
    {
      description: 'task 1',
      completed: false,
      index: 1,
    },
  ];

  const editTasks = (str) => {
    const task = document.querySelector('li[data-id="1"]');
    task.lastChild.textContent = str;
    updateArray(tasksArray, tasksList);
    return task;
  };

  test('edit dom text', () => {
    expect(editTasks('task 2').innerHTML).toBe('<input type="checkbox"><p>task 2</p>');
  });

  test('get edited description from local storage', () => {
    expect(localStorage.getDataLocalStorage()[0].description).toBe('task 2');
  });
});