import './style.css';

// call list
const list = document.querySelector('.list');

// task array of objects
const toDoList = [
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
    completed: true,
    index: 2,
  },
];

// populate list
const populate = () => {
  // sort the array
  const sortedList = toDoList.sort((x, y) => x.index - y.index);

  // iterate
  for (let i = 0; i < sortedList.length; i += 1) {
    list.insertAdjacentHTML('beforeend', `
      <div class="task">
        <div>
          <input class="check" type="checkbox" name="item-${sortedList[i].index}">
          <label for="item-${sortedList[i].index}">${sortedList[i].description}</label>
        </div>
        <div class="material-icons-outlined">
          more_vert
        </div>
      </div>

      <hr>
    `);
  }
};

window.onload = populate();