import TaskManager from "./modules/renderPage";

const taskManager = new TaskManager();

const todoForm = document.getElementById('todoForm');
const clearCompletedButton = document.getElementById('clearCompleted');

console.log('Todo form:', todoForm);
console.log('Clear completed button:', clearCompletedButton);

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
 /*    console.log('Clear completed button clicked '+ target);
    taskManager.tasks = taskManager.tasks.filter(task => !task.completed);
    taskManager.updateTaskIndexes();
    taskManager.renderTasks(); */
    } else if (target.matches('input[type="checkbox"]')) {
        taskManager.checkbox(target);
    }
});
