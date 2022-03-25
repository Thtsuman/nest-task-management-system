import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTasksDto } from './dto/filter-tasks.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    const result = this.tasks.find((task) => task.id === id);

    if (!result) {
      throw new NotFoundException();
    }
    return result;
  }

  createNewTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  deleteTaskById(id: string): string {
    const found = this.getTaskById(id);
    this.tasks = this.tasks.filter((task) => task.id !== found.id);
    return 'Task deleted successfully';
  }

  updateStatus(id: string, status: TaskStatus): Task {
    const updateTaskObj = this.getTaskById(id);
    updateTaskObj.status = status;

    return updateTaskObj;
  }

  filterTask(filterTaskObj: FilterTasksDto): Task[] {
    const { search, status } = filterTaskObj;

    let filteredTasks = this.tasks;

    if (status) {
      filteredTasks = filteredTasks.filter((task) => task.status === status);
    }

    if (search) {
      filteredTasks = filteredTasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        } else return false;
      });
    }

    return filteredTasks;
  }
}
