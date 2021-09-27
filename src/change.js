/* eslint-disable */
export const changeBtn = () => {
  const dots = document.querySelector('.dots');
  const deleteBtn = document.querySelector('.delete');

  dots.addEventListener('click', () => {
    dots.style.display = 'none';
    deleteBtn.style.display = 'block';
  });
};