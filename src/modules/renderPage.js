import { treeDots, refresh } from './svg.js';

const tasks = [
  { description: 'Come to Nigeria', completed: false, index: 1 },
  { description: 'Read shell and Linux', completed: true, index: 2 },
  { description: 'Go, buy a drink', completed: false, index: 3 },
];
const taskList = document.getElementById('task-list');

const renderTasks = () => {
  taskList.innerHTML = tasks
    .map((task) => `
            <li class="task ${task.completed ? 'completed' : ''}">
                <input type="checkbox" class="completed-checkbox" ${task.completed ? 'checked' : ''}>
                <span class="task-description">${task.description}</span>
                <button class="treeDots">${treeDots}</button>
            </li>
        `)
    .join('');
};

const int = () => {
    document.getElementById('refreshSvg').innerHTML = refresh;
    renderTasks();
};

export default int;