"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const task_entity_1 = require("../models/task.entity");
const config_1 = __importDefault(require("./config"));
class TasksService {
    constructor() {
        this.tasksRepository = config_1.default.getRepository(task_entity_1.Task);
    }
    // Gets all tasks
    getTasks() {
        return __awaiter(this, void 0, void 0, function* () {
            const allTasks = yield this.tasksRepository.find();
            return allTasks;
        });
    }
    // Creates a new task
    addTask(createTaskParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const fullTask = {
                name: createTaskParams.name,
                completed: false,
            };
            const inserted = yield this.tasksRepository.save(fullTask);
            return inserted;
        });
    }
    // Deletes a specific task
    deleteTask(taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.tasksRepository.delete(taskId);
        });
    }
    // Deletes all tasks
    deleteAllTasks() {
        return __awaiter(this, void 0, void 0, function* () {
            const records = yield this.getTasks();
            if (records) {
                records.forEach((task) => {
                    this.tasksRepository.delete(task.id);
                });
            }
        });
    }
    // Get a task by its id
    getTaskById(taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = this.tasksRepository.findOneBy({ id: taskId });
            return task;
        });
    }
    // Toggles a specific task's status
    toggleTask(taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            const _old = yield this.tasksRepository.findOneBy({ id: taskId });
            if (!_old || !_old.id)
                return false;
            const _new = Object.assign(Object.assign({}, _old), { status: task_entity_1.TaskStatus.inprogress });
            yield this.tasksRepository.update({ id: taskId }, _new);
            return true;
        });
    }
    // Toggles All
    toggleAll(status) {
        return __awaiter(this, void 0, void 0, function* () {
            const records = yield this.getTasks();
            records.forEach((task) => {
                task.status = status;
                this.tasksRepository.save(task);
            });
            return status;
        });
    }
}
exports.TasksService = TasksService;
