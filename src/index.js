import './styles/style.css'
import {treeDots, refresh} from './modules/svg';
/* import refresh  from './assets/refresh.svg' */

const tasks = [
    { description: 'Buy groceries', completed: false, index: 1 },
    { description: 'Read a book', completed: true, index: 2 },
    { description: 'Go for a walk', completed: false, index: 3 },
];
document.getElementById('refreshSvg').innerHTML = refresh;
const taskList = document.getElementById('task-list');

const renderTasks = () => {
    taskList.innerHTML = tasks
        .map(task => `
            <li class="task ${task.completed ? 'completed' : ''}">
                <input type="checkbox" class="completed-checkbox" ${task.completed ? 'checked' : ''}>
                <span class="task-description">${task.description}</span>
                <button class="treeDots">${treeDots}</button>
            </li>
        `)
        .join('');
}

renderTasks();
