import threedots from '../assets/threedot.svg';

import '../styles/style.css';

const createTaskElement = (task) => {
  const taskElement = document.createElement('li');
  taskElement.className = `task ${task.completed ? 'completed' : ''}`;
  taskElement.innerHTML = `
      <input type="checkbox" class="completed-checkbox" ${task.completed ? 'checked' : ''}>
      <span class="task-description">${task.index}. ${task.description}</span>
      <img class="treeDots" src="${threedots}" alt="verticalDot">
  `;
  return taskElement;
};
class TaskManager {
  constructor(container) {
    this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    this.taskList = document.querySelector(`${container}`);
    this.activeIndex = null;
    this.renderTasks();
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
    const fragment = document.createDocumentFragment();

    this.tasks.forEach((task) => {
      fragment.appendChild(createTaskElement(task));
    });

    this.taskList.appendChild(fragment);

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
        <textarea id="edit-input" cols="30" rows="10" name="edit" type="text" maxlength="500" minlength="1" required>${this.tasks[index].description}
        </textarea>
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