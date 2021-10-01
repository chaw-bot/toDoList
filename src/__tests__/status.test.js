/**
 * @jest-environment jsdom
 */

import LocalStorage from '../store.js';

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

describe('update checked status', () => {
  document.body.innerHTML = '<ul class="tasks-list">'
  + '<li data-id = "1"><input type="checkbox" checked="false"><p>test 1</p></li>'
  + '</ul>';

  const tasksList = document.querySelector('.tasks-list');

  const tasksArray = [
    {
      description: 'test 1',
      completed: false,
      index: 1,
    },
  ];

  const changeStatus = () => {
    const task = document.querySelector('li[data-id="1"]');
    if (!task.firstChild.checked) {
      task.firstChild.checked = false;
    } else {
      task.firstChild.checked = true;
    }
    updateArray(tasksArray, tasksList);
    return task;
  };

  test('change the status of the task in the DOM', () => {
    expect(changeStatus().firstChild.checked).toBeTruthy();
  });

  test('get updated completed attribute from local storage', () => {
    expect(localStorage.getDataLocalStorage()[0].completed).toBeTruthy();
  });
});