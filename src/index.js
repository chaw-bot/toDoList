import './style.css';
import { checkEvent } from './status';
import { setToLocalStorage, getFromLocalStorage, checkboxState } from './store';

// call list
const list = document.querySelector('.list');

// task array of objects
export const toDoList = [
  {
    description: 'Binge Netflix',
    completed: false,
    index: 0,
  },
  {
    description: 'Ride a bike',
    completed: false,
    index: 1,
  },
  {
    description: 'Start to-do list project',
    completed: false,
    index: 2,
  },
];

// populate list
export const populate = () => {
  if (getFromLocalStorage() === null) {
    setToLocalStorage(toDoList);
  } else {
    const sortedList = getFromLocalStorage().sort((a, b) => a.index - b.index);
    sortedList.sort((x, y) => x.index - y.index);
    for (let i = 0; i < sortedList.length; i += 1) {
      if (sortedList[i].completed === true) {
        checkEvent(sortedList[i].index, true);
      } else {
        checkEvent(sortedList[i].index, false);
      }
      // create list item
      const list = document.querySelector('.list');
      list.insertAdjacentHTML('beforeend', `
        <div class="task">
          <div class="checks">
            <input type="checkbox" name="item-${sortedList[i].index}" class="checkbox" ${sortedList[i].completed ? 'checked' : ''}>
            <span class="checkmark" ${sortedList[i].completed ? 'style="text-decoration: line-through"' : ''}>${sortedList[i].description}</span>
          </div>
          <div class="material-icons-outlined">more_vert</div>
        </div>
      `);
      checkEvent();
    }
  }
};

window.onload = () => {
  checkboxState();
  populate();
};
