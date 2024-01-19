import { v4 as uuidv4 } from 'uuid';

import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto/get-tasks-filter.dto';
import { I18nContext, I18nService } from 'nestjs-i18n';

@Injectable()
export class TasksService {
  constructor(private readonly i18n: I18nService) {}

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
    const task = this.tasks.find((task) => task.id === id);

    if (!task) {
      throw new NotFoundException(this.i18n.t("task.validate.id.not_found", { lang: I18nContext.current().lang, args: { id: id } }));
    }

    return task;
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
