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
import {ITask} from "./task.interface";
import {TasksService, CreateTaskDto} from "./tasksService";

@Route("tasks")
export class TasksController extends Controller {
  /**
   * Gets list of all tasks.
   *
   */
  @Example<ITask[]>([
    {
      id: "0",
      name: "An example task",
      completed: true,
    },
  ])
  @Get()
  public async getTasks(): Promise<ITask[]> {
    return new TasksService().getTasks();
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
  public async createTask(@Body() requestBody: CreateTaskDto): Promise<string> {
    this.setStatus(201); // set return status 201
    return new TasksService().addTask(requestBody);
  }

  /**
   * Deletes a task given the id.
   * @taskId The id of the task to delete.
   */
  @Delete("{taskId}")
  public async deleteTask(
    @Path() taskId: string,
    @Res() notFoundResponse: TsoaResponse<404, {reason: string}>
  ): Promise<void> {
    if (!taskId) {
      return notFoundResponse(404, {
        reason: "Please provide a taskId to delete.",
      });
    }
    new TasksService().deleteTask(taskId);
  }

  /**
   * Toggles the completion status of the task with the given id.
   * @taskId The id of the task to toggle.
   */
  @Put("/toggle/{taskId}")
  public async toggleTask(
    @Path() taskId: string,
    @Res() notFoundResponse: TsoaResponse<404, {reason: string}>
  ): Promise<void> {
    if (!taskId) {
      return notFoundResponse(404, {
        reason: "Please provide a taskId to toggle.",
      });
    }
    new TasksService().toggleTask(taskId);
  }

  /**
   * Toggles the completion status of all tasks to the given status.
   * @taskId The status to toggle to. True = Complete; False = Incomplete.
   */
  @Put("/markAll/{setting}")
  public async toggleAll(
    @Path() setting: string,
    @Res() notFoundResponse: TsoaResponse<404, {reason: string}>
  ): Promise<void> {
    if (!setting) {
      return notFoundResponse(404, {
        reason:
          "Please provide a setting to toggle all tasks to: true or false.",
      });
    }
    new TasksService().toggleAll(setting);
  }
}
