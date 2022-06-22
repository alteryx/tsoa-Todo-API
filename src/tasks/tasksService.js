"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
class TasksService {
    // Computes Next Task id
    nextTaskId(tasks) {
        const maxId = tasks.reduce((maxId, task) => Math.max(Number(task.id), maxId), -1);
        return (maxId + 1).toString();
    }
    // Gets all tasks
    getTasks() {
        return TasksService.tasks;
    }
    // Creates a new task
    addTask(createTaskParams) {
        const newTask = {
            id: this.nextTaskId(TasksService.tasks),
            name: createTaskParams.name,
            completed: false,
        };
        TasksService.tasks.push(newTask);
        return "Successfully added task.";
    }
    // Deletes a specific task
    deleteTask(taskId) {
        TasksService.tasks.filter((item) => item.id !== taskId);
    }
    // Toggles a specific task's status
    toggleTask(taskId) {
        const task = TasksService.tasks.find((item) => item.id === taskId);
        if (task !== undefined) {
            task.completed = !task.completed;
        }
    }
    // Toggles All
    toggleAll(setting) {
        if (setting === "1") {
            TasksService.tasks.forEach((task) => {
                task.completed = true;
            });
        }
        else if (setting === "0") {
            TasksService.tasks.forEach((task) => {
                task.completed = false;
            });
        }
    }
}
exports.TasksService = TasksService;
TasksService.tasks = [
    { id: "1", name: "Nest App", completed: false },
];
