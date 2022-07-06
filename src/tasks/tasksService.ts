import {ITask} from "./task.interface";

export type CreateTaskDto = Pick<ITask, "name">;

export class TasksService {
  private static tasks: ITask[] = [
    {id: "1", name: "Nest App", completed: false},
  ];

  // Computes Next Task id
  private nextTaskId(tasks: ITask[]): string {
    const maxId = tasks.reduce(
      (maxId, task) => Math.max(Number(task.id), maxId),
      -1
    );
    return (maxId + 1).toString();
  }

  // Gets all tasks
  public getTasks(): ITask[] {
    return TasksService.tasks;
  }

  // Creates a new task
  public addTask(createTaskParams: CreateTaskDto) {
    const newTask = {
      id: this.nextTaskId(TasksService.tasks),
      name: createTaskParams.name,
      completed: false,
    };
    TasksService.tasks.push(newTask);
    return "Successfully added task.";
  }

  // Deletes a specific task
  public deleteTask(taskId: string) {
    TasksService.tasks.filter((item) => item.id !== taskId);
  }

  // Get a task by its id
  public getTaskById(taskId: string) {
    return TasksService.tasks.find((item) => item.id === taskId);
  }

  // Toggles a specific task's status
  public toggleTask(taskId: string) {
    const task = TasksService.tasks.find((item) => item.id === taskId);
    if (task) {
      task.completed = !task.completed;
      return true;
    }
  }

  // Toggles All
  public toggleAll(setting: string) {
    if (setting === "1") {
      TasksService.tasks.forEach((task) => {
        task.completed = true;
      });
    } else if (setting === "0") {
      TasksService.tasks.forEach((task) => {
        task.completed = false;
      });
    }
  }
}
