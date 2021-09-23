const setToLocalStorage = ((toDo) => {
  localStorage.setItem('toDo', JSON.stringify(toDo));
});

const getFromLocalStorage = () => {
  const toDo = localStorage.getItem('toDo');
  return JSON.parse(toDo);
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

export { setToLocalStorage, getFromLocalStorage, checkboxState };
