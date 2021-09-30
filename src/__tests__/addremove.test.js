/**
 * @jest-environment jsdom
 */

import LocalStorage from '../store.js';

describe('test add elements', () => {
  document.body.innerHTML = '<div>'
  + '<input type="text" name="task" id="task"'
  + 'class="input-task element-border" placeholder="Add to your list..." value="add testing">'
  + '<ul class="tasks-list">'
  + '</ul>'
  + '</div>';

  const event = new KeyboardEvent('keyup', { key: 'Enter' });

  const localStorage = new LocalStorage();

  const tasksList = document.querySelector('.tasks-list');

  let toDoList = [];

  const addTodoToList = (task) => {
    const taskItem = document.createElement('li');
    const checkBox = document.createElement('input');
    const taskDescription = document.createElement('label');
    const checkDescription = document.createElement('div');
    const icon = document.createElement('i');
    icon.classList.add('fas', 'fa-ellipsis-v', 'list-icon');
    taskItem.classList.add('element-border');
    taskItem.setAttribute('data-id', task.index);
    taskItem.setAttribute('id', `Task${task.index}`);
    checkBox.classList.add('list-checkbox');
    checkBox.setAttribute('type', 'checkbox');
    checkBox.checked = task.completed;
    taskDescription.innerHTML = task.description;
    if (task.completed) {
      taskDescription.style.textDecoration = 'line-through';
    }
    checkDescription.classList.add('check-description');
    checkDescription.appendChild(checkBox);
    checkDescription.appendChild(taskDescription);
    taskItem.appendChild(checkDescription);
    taskItem.appendChild(icon);
    tasksList.appendChild(taskItem);
  };

  const displayTasks = () => {
    tasksList.innerHTML = '';
    toDoList.forEach((task) => addTodoToList(task));
  };

  const checkDom = () => [...tasksList.children];

  // Act
  const add = (event) => {
    if (event.key === 'Enter') {
      toDoList = localStorage.getDataLocalStorage();
      const input = document.querySelector('.input-task');
      const inputValue = input.value;
      const task = {
        description: inputValue,
        completed: false,
        index: toDoList.length + 1,
      };
      toDoList.push(task);
      localStorage.setDataLocalStorage(toDoList);
      displayTasks();
      return toDoList;
    }
    return false;
  };

  const addTodo = add(event);

  // Assert
  test('add task to the list', () => {
    expect(addTodo.length === 1).toBeTruthy();
  });

  test('add a object', () => {
    expect(addTodo).toEqual([
      {
        description: 'add testing',
        completed: false,
        index: 1,
      },
    ]);
  });

  test('it adds the task to the list in the dom', () => {
    expect(checkDom().length !== 0).toBeTruthy();
  });
});

describe('remove method', () => {
  // Arrange
  document.body.innerHTML = '<ul class="tasks-list">'
  + '<li data-id = "1"><input type="checkbox" checked><p>test 1</p></li>'
  + '<li data-id = "2"><input type="checkbox"><p>test 1</p></li>'
  + '<li data-id = "3"><input type="checkbox" checked><p>test 3</p></li>'
  + '</ul>';

  const tasksList = document.querySelector('.tasks-list');

  let toDoList = [
    {
      description: 'test 1',
      completed: false,
      index: 1,
    },
    {
      description: 'test 2',
      completed: false,
      index: 2,
    },
    {
      description: 'test 3',
      completed: false,
      index: 3,
    },
  ];

  const localStorage = new LocalStorage();
  localStorage.setDataLocalStorage(toDoList);

  const updateArray = () => {
    const items = [...tasksList.children];

    toDoList = [];

    items.forEach((item, index) => {
      const newTask = {
        description: item.lastChild.textContent,
        completed: item.firstChild.checked,
        index: index + 1,
      };
      toDoList.push(newTask);
    });
    localStorage.setDataLocalStorage(toDoList);
  };

  const taskElem = document.querySelector('li[data-id="3"]');

  // Act
  const removeElement = (element) => {
    if (element) {
      tasksList.removeChild(element);
      updateArray();
      return toDoList;
    }
    return false;
  };

  // Assert
  test('remove an element from the array', () => {
    expect(removeElement(taskElem)).toHaveLength(2);
  });

  test('remove element from the list', () => {
    expect([...tasksList.children].length).toBe(2);
  });
});

describe('local storage management', () => {
  const localStorage = new LocalStorage();
  const arr = [{
    description: 'local storage test',
    completed: false,
    index: 1,
  }];
  localStorage.setDataLocalStorage(arr);
  test('it stores items', () => {
    expect(localStorage.getDataLocalStorage()).toEqual([{
      description: 'local storage test',
      completed: false,
      index: 1,
    }]);
  });
});