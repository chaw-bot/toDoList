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

describe('completed task delete', () => {
  document.body.innerHTML = '<ul class="tasks-list">'
    + '<li data-id = "1"><input type="checkbox" checked><p>task 1</p></li>'
    + '<li data-id = "2"><input type="checkbox"><p>task 2</p></li>'
    + '<li data-id = "3"><input type="checkbox" checked><p>task 3</p></li>'
    + '</ul>';

  const tasksList = document.querySelector('.tasks-list');

  const tasksArray = [
    {
      description: 'task 1',
      completed: true,
      index: 1,
    },
    {
      description: 'task 2',
      completed: false,
      index: 2,
    },
    {
      description: 'task 3',
      completed: true,
      index: 3,
    },
  ];

  const deleteAllCompleted = () => {
    let currentChild = tasksList.firstChild;
    let backup;
    while (currentChild) {
      if (currentChild.firstChild.checked) {
        backup = currentChild.nextSibling;
        tasksList.removeChild(currentChild);
        currentChild = backup;
      } else {
        currentChild = currentChild.nextSibling;
      }
    }
    updateArray(tasksArray, tasksList);
    return tasksList;
  };

  test('the task list remain with only one child', () => {
    expect([...deleteAllCompleted().children].length).toBe(1);
  });

  test('get the task from the local storage', () => {
    expect(localStorage.getDataLocalStorage()[0]).toEqual(
      {
        description: 'task 2',
        completed: false,
        index: 1,
      },
    );
  });
});