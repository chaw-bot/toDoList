import './style.css';
import { sortIndex } from './status';
import { setToLocalStorage, getFromLocalStorage, reloadToDo } from './store';
import { addToDo, editToDo } from './addremove';

const toDoList = [];

// populate list
const populate = (toDoList, sort) => {
  let sortedTodo = [];
  if (sort) {
    sortedTodo = toDoList.sort((a, b) => a.index - b.index);
  } else {
    sortedTodo = toDoList;
  }

  for (let i = 0; i < sortedTodo.length; i += 1) {
    let style = '';
    let checkbox = '';
    if (sortedTodo[i].completed) {
      style = 'text-decoration: line-through;';
      checkbox = 'checked';
    } else {
      style = 'text-decoration: none;';
      checkbox = '';
    }
    // create list item
    document.getElementById('list').insertAdjacentHTML('beforeend', `
        <div class="task">
          <div class="checks">
            <input type="checkbox" name="item-${sortedTodo[i].index}" ${checkbox}>
            <label for="item-${sortedTodo[i].index}" style="${style}" contenteditable=true>${sortedTodo[i].description}</label>
          </div>
          <div class="buttons-end">
            <div class="material-icons-outlined">more_vert</div>
            <span class="material-icons-outlined delete" id="item-${sortedTodo[i].index}">delete_outline</span>
          </div>
        </div>
      `);
  }
};

window.addEventListener('load', () => {
  const localStore = getFromLocalStorage();
  if (localStore == null) {
    setToLocalStorage(toDoList, true);
    populate(toDoList);
  } else {
    const sortedTodo = sortIndex(localStore);
    populate(sortedTodo, false);
  }
  reloadToDo();
  addToDo();
  editToDo();
});

export { toDoList, populate };
