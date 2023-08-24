import { TaskManager } from "../src/modules/util";
import { JSDOM } from 'jsdom';

const mockedTasksArray = [
    { description: 'Task 1', completed: false, index: 1 },
    { description: 'Task 2', completed: true, index: 2 }
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
      clear: jest.fn()
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
    test('Added Tasks and update indexes based on array position', () => {
      const tasks = [
        { description: 'Task 1', completed: false, index: 1 },
        { description: 'Task 2', completed: true, index: 2 },
        { description: 'Task 3', completed: false, index: 3 }
      ];
      const taskManager = new TaskManager('#task-list');

      tasks.forEach((task) => {
        taskManager.addTask(task);
      })

      expect(taskManager.tasks[0].index).toBe(1);
      expect(taskManager.tasks[0].description.description).toBe('Task 1');
      expect(taskManager.tasks[1].index).toBe(2);
      expect(taskManager.tasks[1].description.description).toBe('Task 2');
      expect(taskManager.tasks[2].index).toBe(3);
      expect(taskManager.tasks[2].description.description).toBe('Task 3');
    });
  });


  describe('renderTasks', () => {
    test('Mocked 2 task in Local storage. Added 3 tasks', () => {

      taskManager.addTask('Task 1');
      taskManager.addTask('Task 2');
      taskManager.addTask('Task 3');
 
      taskManager.renderTasks();

      expect(document.querySelectorAll('.task')).toHaveLength(5);
    });
  });
});
