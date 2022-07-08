import {TaskStatus} from "../models/task.entity";

export interface ITask {
  id: string;
  name: string;
  status: TaskStatus;
}
