import {
  Body,
  Controller,
  Delete,
  Example,
  Get,
  Path,
  Post,
  Put,
  Query,
  Res,
  Route,
  SuccessResponse,
  TsoaResponse,
} from "tsoa";
import {Task, TaskStatus} from "../models/task.entity";
import {ITask} from "./task.interface";
import {TasksService, CreateTaskDto} from "./tasksService";

@Route("tasks")
export class TasksController extends Controller {
  taskService: TasksService;
  constructor() {
    super();
    this.taskService = new TasksService();
  }
  /**
   * Gets list of all tasks.
   *
   */
  @Example<ITask[]>([
    {
      id: "0",
      name: "An example task",
      status: TaskStatus.todo,
    },
  ])
  @Get()
  public async getTasks(): Promise<Task[] | undefined> {
    return this.taskService.getTasks();
  }

  /**
   * Add a new task. Remember that the demo API will not persist this data.
   *
   */
  @Example<string>("Successfully added task.")
  /**
   * @example requestBody "52907745-7672-470e-a803-a2f8feb52944"
   */
  @Post()
  @SuccessResponse("201", "Created") // Custom success response
  public async createTask(@Body() requestBody: CreateTaskDto): Promise<Task> {
    return this.taskService.addTask(requestBody);
  }

  /**
   * Deletes a task given the id.
   * @taskId The id of the task to delete.
   */
  @Delete("{taskId}")
  public async deleteTask(@Path() taskId: number): Promise<void> {
    this.taskService.deleteTask(taskId);
  }

  @Delete()
  public async deleteAllTasks() {
    this.taskService.deleteAllTasks();
    return `Deleted all tasks`;
  }

  /**
   * Get the task with the given id.
   * @taskId The id of the task to get.
   */
  @Get("{taskId}")
  public async getTaskById(@Path() taskId: number) {
    const task = this.taskService.getTaskById(taskId);
    return task;
  }

  /**
   * Toggles the completion status of the task with the given id.
   * @taskId The id of the task to toggle.
   */
  @Put("/toggle/{taskId}")
  public async toggleTask(@Path() taskId: number): Promise<boolean> {
    const success = this.taskService.toggleTask(taskId);
    return success;
  }

  /**
   * Toggles the completion status of all tasks to the given status.
   * @taskId The status to toggle to. True = Complete; False = Incomplete.
   */
  @Put("/markAll/{setting}")
  public async toggleAll(@Path() setting: TaskStatus): Promise<void> {
    this.taskService.toggleAll(setting);
  }
}
