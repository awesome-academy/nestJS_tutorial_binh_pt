import { v4 as uuidv4 } from 'uuid';

import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto.ts/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(taskParams: CreateTaskDto): Task {
    const { title, description } = taskParams

    const task: Task = {
      id: uuidv4(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  deleteTaskById(id: string): Task {
    const task: Task = this.getTaskById(id);
    if(!task) return

    this.tasks = this.tasks.filter((t) => t.id != task.id)
    return task
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    const task: Task = this.getTaskById(id);

    if(!task) return
    task.status = status;

    return task;
  }

  getTasksWithFilter(filterTaskDto: GetTasksFilterDto): Task[] {
    let { status, searchString } = filterTaskDto;
    let tasks = this.getAllTasks();
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    if (searchString) {
      searchString = searchString.toLowerCase();
      tasks = tasks.filter(
        (task) =>
          task.title.toLowerCase().includes(searchString) ||
          task.description.toLowerCase().includes(searchString),
      );
    }

    return tasks;
  }
}
