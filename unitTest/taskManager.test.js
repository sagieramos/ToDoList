import { JSDOM } from 'jsdom';
import { TaskManager } from '../src/modules/util.js';

const mockedTasksArray = [
  { description: 'Task 1', completed: true, index: 1 },
  { description: 'Task 2', completed: false, index: 2 },
  { description: 'Task 3', completed: false, index: 3 },
  { description: 'Task 4', completed: false, index: 4 },
];

describe('TaskManager', () => {
  let taskManager;

  beforeAll(() => {
    const dom = new JSDOM('<!doctype html><html><body><div id="task-list"></div></body></html>');

    global.document = dom.window.document;
    global.window = dom.window;

    global.localStorage = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      clear: jest.fn(),
    };
  });

  afterAll(() => {
    delete global.document;
    delete global.window;
    delete global.localStorage;
  });

  beforeEach(() => {
    localStorage.getItem.mockReturnValueOnce(JSON.stringify(mockedTasksArray));
    localStorage.getItem.mockClear();
    localStorage.setItem.mockClear();
    localStorage.clear.mockClear();

    taskManager = new TaskManager('#task-list');
  });

  describe('saveTasksToLocalStorage', () => {
    test('should save tasks to localStorage', () => {
      const newTask = { description: 'New Task', completed: false, index: 3 };
      taskManager.tasks.push(newTask);

      taskManager.saveTasksToLocalStorage();

      expect(localStorage.setItem).toHaveBeenCalledWith('tasks', JSON.stringify(taskManager.tasks));
    });
  });

  describe('addTask', () => {
    test('Add Tasks to LocalStorage', () => {
      const tasks = [
        { description: 'Task 1', completed: false, index: 1 },
        { description: 'Task 2', completed: true, index: 2 },
        { description: 'Task 3', completed: false, index: 3 },
      ];
      const taskManager = new TaskManager('#task-list');

      tasks.forEach((task) => {
        taskManager.addTask(task);
      });

      expect(taskManager.tasks[0].description.index).toBe(1);
      expect(taskManager.tasks[0].description.completed).toBe(false);
      expect(taskManager.tasks[0].description.description).toBe('Task 1');

      expect(taskManager.tasks[1].description.index).toBe(2);
      expect(taskManager.tasks[1].description.description).toBe('Task 2');
      expect(taskManager.tasks[1].description.completed).toBe(true);

      expect(taskManager.tasks[2].description.index).toBe(3);
      expect(taskManager.tasks[2].description.description).toBe('Task 3');
      expect(taskManager.tasks[2].description.completed).toBe(false);
    });
  });

  describe('renderTasks', () => {
    test('Mocked 2 task in Local storage. Added 3 tasks', () => {
      taskManager.addTask('Task 1');
      taskManager.addTask('Task 2');
      taskManager.addTask('Task 3');

      taskManager.renderTasks();

      expect(document.querySelectorAll('.task')).toHaveLength(7);
    });
  });

  describe('delete', () => {
    test('Remove a task from localstorage', () => {
      taskManager.addTask('Task 1');
      taskManager.addTask('Task 2');
      taskManager.addTask('Task 3');

      taskManager.getIndex(1);
      taskManager.deleteTask();

      expect(document.querySelectorAll('.task')).toHaveLength(6);
    });
  });

  describe('Test part 2', () => {

    test('Status in the task-list is true and false respectively', () => {
      expect(taskManager.tasks[0].completed).toBe(true);
      expect(taskManager.tasks[1].completed).toBe(false);
    });

    test('Contents in task-list is "Task 1" and "Task 2 respectively"', () => {
      expect(taskManager.tasks[0].description).toBe('Task 1');
      expect(taskManager.tasks[1].description).toBe('Task 2');
    });

    //

  });
});
