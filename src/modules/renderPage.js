import threedots from '../assets/threedot.svg'

import '../styles/style.css';

const createTaskElement = (task) => {
  const taskElement = document.createElement('li');
  taskElement.className = `task ${task.completed ? 'completed' : ''}`;
  taskElement.innerHTML = `
      <input type="checkbox" class="completed-checkbox" ${task.completed ? 'checked' : ''}>
      <span class="index">${task.index}.</span>
      <span class="task-description">${task.description}</span>
      <img class="treeDots" src="${threedots}" alt="">
  `;
  return taskElement;
};
class TaskManager {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        this.taskList = document.getElementById('task-list');
        
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
        
        this.tasks.forEach((task, index) => {
            const taskElement = createTaskElement(task, index);
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
    
    clearCompleted() {
      const completedCheckboxes = [...document.querySelectorAll('.completed-checkbox')];
      const newTasks = this.tasks.filter((task, index) => {
          return !completedCheckboxes[index].checked;
      });
      this.tasks = newTasks;
      this.renderTasks();
    }

    addTask(description) {
        const newTask = {
            description: description,
            completed: false,
            index: this.tasks.length + 1,
        };
        this.tasks.push(newTask);
        this.renderTasks();
    }
    
    deleteTask(index) {
        this.tasks.splice(index, 1);
        this.renderTasks();
    }
    

}

export default TaskManager;