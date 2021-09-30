let descriptionBackup;

const taskInput = document.querySelector('.input-task');

const addToDo = (task, tasks) => {
  tasks.push(task);
};

const clearAll = (tasksList) => {
  let currentChild = tasksList.firstChild;
  let backup;
  while (currentChild) {
    if (currentChild.firstChild.firstChild.checked) {
      backup = currentChild.nextSibling;
      tasksList.removeChild(currentChild);
      currentChild = backup;
    } else {
      currentChild = currentChild.nextSibling;
    }
  }
};

const editTodo = (e) => {
  const currentTaskDescription = e.parentNode.firstChild.lastChild;
  descriptionBackup = e.parentNode.firstChild.replaceChild(input, currentTaskDescription);
  descriptionBackup.innerHTML = e;
  e.parentNode.replaceChild(descriptionBackup, e);
};

const deleteTask = (e) => {
  e.parentNode.parentNode.removeChild(e.parentNode);
};

export { addToDo, clearAll, editTodo, deleteTask, taskInput };
