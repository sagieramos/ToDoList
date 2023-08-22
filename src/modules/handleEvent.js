import TaskManager from './renderPage.js';
import refreshImg from '../assets/refresh.svg';
import deleteImg from '../assets/delete.svg';

const taskManager = new TaskManager('#task-list');
const refresh = document.getElementById('refreshSvg');
let editInput = false;

refresh.src = refreshImg;

const handleFormSubmission = (e) => {
  e.preventDefault();
  const { target } = e;

  if (target.matches('#todoForm')) {
    const input = document.querySelector('#enter-description');
    const description = input.value.trim();

    if (description !== '') {
      taskManager.addTask(description);
      input.value = '';
    }
  } else if (target.matches('#todo-edit')) {
    const input = document.querySelector('#edit-input');
    taskManager.updateTaskDescription(input.value.trim());
  }
};

const handleClicks = (e) => {
  const { target } = e;
  if (target.matches('#confirm-edit')) {
    e.preventDefault();
    const { value } = document.querySelector('#edit-input');
    taskManager.updateTaskDescription(value.trim());
  }
  if (target.matches('#clearCompleted')) {
    taskManager.clearCompleted();
  } else if (target.matches('.completed-checkbox')) {
    taskManager.updateTaskCompletion(target);
  } else if (target.matches('#treeDots-delete')) {
    taskManager.deleteTask();
    editInput = true;
  } else if (target.matches('*:not(#edit-input)') && editInput) {
    taskManager.renderTasks();
    editInput = false;
  } else if (target.matches('.treeDots')) {
    const index = [...document.querySelectorAll('.treeDots')].indexOf(target);
    target.src = deleteImg;
    target.id = 'treeDots-delete';
    taskManager.getIndex(index);
    editInput = true;
  } else if (target.matches('.delete-task')) {
    taskManager.deleteTask();
  } else if (target.matches('.task-description')) {
    editInput = true;
    const index = [...document.querySelectorAll('.task-description')].indexOf(target);
    target.innerHTML = taskManager.editDescription(index);
  }
};

export { handleFormSubmission, handleClicks };