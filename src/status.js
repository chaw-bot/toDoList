const tasksList = document.querySelector('.tasks-list');

const addTaskToList = (task) => {
  const taskItem = document.createElement('li');
  const checkBox = document.createElement('input');
  const taskDescription = document.createElement('label');
  const checkDescription = document.createElement('div');
  const icon = document.createElement('i');
  icon.classList.add('fas', 'fa-trash', 'list-icon');
  taskItem.classList.add('element-border');
  taskItem.setAttribute('data-id', task.index);
  taskItem.setAttribute('id', `Task${task.index}`);
  taskItem.draggable = true;
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

const changeStatus = (bool, label) => {
  if (bool) {
    label.style.textDecoration = 'line-through';
  } else {
    label.style.textDecoration = 'none';
  }
};

export { addTaskToList, changeStatus, tasksList };