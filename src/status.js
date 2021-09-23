import { getFromLocalStorage, setToLocalStorage } from './store';

const checkEvent = () => {
  const checkboxes = document.querySelectorAll('input[type=checkbox]');

  for (let i = 0; i < checkboxes.length; i++) {
    const task = checkboxes[i].nextElementSibling;

    checkboxes[i].addEventListener("click", function () {
      if (checkboxes[i].checked) {
        task.style.textDecoration = 'line-through';
      } else {
        task.style.textDecoration = 'none';
      }
      const toDoList = getFromLocalStorage();
      toDoList[i].completed = checkboxes[i].checked;
      setToLocalStorage(toDoList);
    });
  }
}

export { checkEvent };
