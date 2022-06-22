"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksController = void 0;
const tsoa_1 = require("tsoa");
const tasksService_1 = require("./tasksService");
let TasksController = class TasksController extends tsoa_1.Controller {
    /**
     * Gets list of all tasks.
     *
     */
    getTasks() {
        return __awaiter(this, void 0, void 0, function* () {
            return new tasksService_1.TasksService().getTasks();
        });
    }
    /**
     * Add a new task. Remember that the demo API will not persist this data.
     *
     */
    createTask(requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            this.setStatus(201); // set return status 201
            return new tasksService_1.TasksService().addTask(requestBody);
        });
    }
    /**
     * Deletes a task given the id.
     * @taskId The id of the task to delete.
     */
    deleteTask(taskId, notFoundResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!taskId) {
                return notFoundResponse(404, {
                    reason: "Please provide a taskId to delete.",
                });
            }
            new tasksService_1.TasksService().deleteTask(taskId);
        });
    }
    /**
     * Toggles the completion status of the task with the given id.
     * @taskId The id of the task to toggle.
     */
    toggleTask(taskId, notFoundResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!taskId) {
                return notFoundResponse(404, {
                    reason: "Please provide a taskId to toggle.",
                });
            }
            new tasksService_1.TasksService().toggleTask(taskId);
        });
    }
    /**
     * Toggles the completion status of all tasks to the given status.
     * @taskId The status to toggle to. True = Complete; False = Incomplete.
     */
    toggleAll(setting, notFoundResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!setting) {
                return notFoundResponse(404, {
                    reason: "Please provide a setting to toggle all tasks to: true or false.",
                });
            }
            new tasksService_1.TasksService().toggleAll(setting);
        });
    }
};
__decorate([
    (0, tsoa_1.Example)([
        {
            id: "0",
            name: "An example task",
            completed: true,
        },
    ]),
    (0, tsoa_1.Get)()
], TasksController.prototype, "getTasks", null);
__decorate([
    (0, tsoa_1.Example)("Successfully added task.")
    /**
     * @example requestBody "52907745-7672-470e-a803-a2f8feb52944"
     */
    ,
    (0, tsoa_1.Post)(),
    (0, tsoa_1.SuccessResponse)("201", "Created") // Custom success response
    ,
    __param(0, (0, tsoa_1.Body)())
], TasksController.prototype, "createTask", null);
__decorate([
    (0, tsoa_1.Delete)("{taskId}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Res)())
], TasksController.prototype, "deleteTask", null);
__decorate([
    (0, tsoa_1.Put)("/toggle/{taskId}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Res)())
], TasksController.prototype, "toggleTask", null);
__decorate([
    (0, tsoa_1.Put)("/markAll/{setting}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Res)())
], TasksController.prototype, "toggleAll", null);
TasksController = __decorate([
    (0, tsoa_1.Route)("tasks")
], TasksController);
exports.TasksController = TasksController;
