const setToLocalStorage = ((toDo) => {
  localStorage.setItem('toDo', JSON.stringify(toDo));
});

const getFromLocalStorage = () => {
  const toDo = localStorage.getItem('toDo');
  return JSON.parse(toDo);
};

export { setToLocalStorage, getFromLocalStorage };
