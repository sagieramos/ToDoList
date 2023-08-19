import threedots from '../assets/threedot.svg';

import '../styles/style.css';

const createTaskElement = (task) => {
  const taskElement = document.createElement('li');
  taskElement.className = `task ${task.completed ? 'completed' : ''}`;
  taskElement.setAttribute('draggable', 'true');
  taskElement.innerHTML = `
      <input type="checkbox" class="completed-checkbox" ${task.completed ? 'checked' : ''}>
      <span class="task-description">${task.index}. ${task.description}</span>
      <img class="treeDots" src="${threedots}" alt="">
  `;
  return taskElement;
};
class TaskManager {
  constructor(container) {
    this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    this.taskList = document.querySelector(`${container}`);
    this.activeIndex = null;
    this.renderTasks();
    this.initializeDragAndDrop();
  }

  initializeDragAndDrop() {
    this.taskList.addEventListener('dragstart', (e) => {
      // Set data to be transferred during drag
      e.dataTransfer.setData('text/plain', e.target.dataset.index);
    });

    this.taskList.addEventListener('dragover', (e) => {
      e.preventDefault();
    });

    this.taskList.addEventListener('drop', (e) => {
      e.preventDefault();
      const sourceIndex = parseInt(e.dataTransfer.getData('text/plain'));
      const targetIndex = parseInt(e.target.dataset.index);
      
      if (!isNaN(sourceIndex) && !isNaN(targetIndex)) {
        // Rearrange tasks based on drag and drop
        const [draggedTask] = this.tasks.splice(sourceIndex, 1);
        this.tasks.splice(targetIndex, 0, draggedTask);
        this.renderTasks();
      }
    });
  }

  saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  updateTaskIndexes() {
    this.tasks.forEach((task, index) => {
      task.index = index + 1;
    });
  }

  renderTasks() {
    this.updateTaskIndexes();
    this.taskList.innerHTML = '';

    this.tasks.forEach((task, index) => {
      const taskElement = createTaskElement(task);
      taskElement.setAttribute('data-index', index);
      this.taskList.appendChild(taskElement);
    });

    this.saveTasksToLocalStorage();
  }

  updateTaskCompletion(target) {
    const targetClass = target.className;
    const targetIndex = [...document.querySelectorAll(`.${targetClass}`)].indexOf(target);
    this.tasks[targetIndex].completed = target.checked;
    this.saveTasksToLocalStorage();
    this.renderTasks();
  }

  updateTaskDescription(value) {
    this.tasks[this.activeIndex].description = value;
    this.renderTasks();
  }

  clearCompleted() {
    const completedCheckboxes = [...document.querySelectorAll('.completed-checkbox')];
    const newTasks = this.tasks.filter((task, index) => !completedCheckboxes[index].checked);
    this.tasks = newTasks;
    this.renderTasks();
  }

  getIndex(index) {
    this.activeIndex = index;
  }

  editDescription(index) {
    this.activeIndex = index;
    return `
      <form id="todo-edit" action="#">
      <textarea id="edit-input" cols="30" rows="10" id="edit-input" name="edit" type="text" maxlength="500" minlength="1" required>${this.tasks[index].description}</textarea>
      <button id="confirm-edit">Submit</button>
      </form>
    `;
  }

  addTask(description) {
    const newTask = {
      description,
      completed: false,
      index: this.tasks.length + 1,
    };
    this.tasks.push(newTask);
    this.renderTasks();
  }

  deleteTask() {
    this.tasks.splice(this.activeIndex, 1);
    this.renderTasks();
  }
}

export default TaskManager;
