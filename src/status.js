import { getFromLocalStorage, setToLocalStorage } from './store';

const checkEvent = () => {
  const checkboxes = document.querySelectorAll('input[type=checkbox]');

  for (let i = 0; i < checkboxes.length; i += 1) {
    const task = checkboxes[i].nextElementSibling;

    checkboxes[i].addEventListener('click', () => {
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
};

const checkboxState = () => {
  const checkboxes = document.querySelectorAll('input[type=checkbox]');

  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      localStorage.setItem(checkbox.id, 'checked');
    } else {
      localStorage.setItem(checkbox.id, 'unchecked');
    }
  });

  checkboxes.forEach((checkbox) => {
    if (localStorage.getItem(checkbox.id) === 'checked') {
      checkbox.checked = true;
    } else {
      checkbox.checked = false;
    }
  });
};

export { checkEvent, checkboxState };
