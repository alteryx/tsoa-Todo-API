import {Repository} from "typeorm";
import {Task, TaskStatus} from "../models/task.entity";
import {ITask} from "./task.interface";
import dataSource from "./config";

export type CreateTaskDto = Pick<ITask, "name">;

export class TasksService {
  private tasksRepository: Repository<Task> = dataSource.getRepository(Task);

  // Gets all tasks
  async getTasks(): Promise<Task[]> {
    const allTasks = await this.tasksRepository.find();
    return allTasks;
  }

  // Creates a new task
  async addTask(createTaskParams: CreateTaskDto): Promise<Task> {
    const fullTask = {
      name: createTaskParams.name,
      completed: false,
    };
    const inserted = await this.tasksRepository.save(fullTask);
    return inserted;
  }

  // Deletes a specific task
  async deleteTask(taskId: number) {
    await this.tasksRepository.delete(taskId);
  }

  // Deletes all tasks
  async deleteAllTasks() {
    const records = await this.getTasks();
    if (records) {
      records.forEach((task) => {
        this.tasksRepository.delete(task.id);
      });
    }
  }

  // Get a task by its id
  async getTaskById(taskId: number) {
    const task = this.tasksRepository.findOneBy({id: taskId});
    return task;
  }

  // Toggles a specific task's status
  async toggleTask(taskId: number): Promise<boolean> {
    const _old = await this.tasksRepository.findOneBy({id: taskId});
    if (!_old || !_old.id) return false;
    const _new = {..._old, status: TaskStatus.inprogress};
    await this.tasksRepository.update({id: taskId}, _new);
    return true;
  }

  // Toggles All
  async toggleAll(status: TaskStatus) {
    const records = await this.getTasks();
    records.forEach((task) => {
      task.status = status;
      this.tasksRepository.save(task);
    });
    return status;
  }
}
