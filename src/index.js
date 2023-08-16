import TaskManager from "./modules/renderPage";
import refreshImg from "./assets/refresh.svg"

const taskManager = new TaskManager();

const todoForm = document.getElementById('todoForm');
const refresh = document.getElementById('refreshSvg');
refresh.src = refreshImg

todoForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const input = todoForm.querySelector('input[type="text"]');
    const description = input.value.trim();
    
    if (description !== '') {
        taskManager.addTask(description);
        input.value = '';
    }
});


window.addEventListener('click', (e) => {
    const it = ([...document.querySelectorAll('.task-description')])
    it.forEach((item) => {
        console.log(item.innerHTML);
    })
    const { target } = e;
    console.log(target);
    if (target.matches('#clearCompleted')) {
        taskManager.clearCompleted();
    } else if (target.matches('.completed-checkbox')) {
        taskManager. updateTaskCompletion(target);
    }
});
