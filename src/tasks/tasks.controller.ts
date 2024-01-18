import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto.ts/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto/get-tasks-filter.dto';
import { I18n, I18nContext } from 'nestjs-i18n';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService){}

  @Get()
  getTasks(@Query() filterTaskDto: GetTasksFilterDto): Task[] {
    if (Object.keys(filterTaskDto).length) {
      return this.tasksService.getTasksWithFilter(filterTaskDto);
    }

    return this.tasksService.getAllTasks();
  }

  @Post()
  createTask(@Body() taskParams: CreateTaskDto): Task {
    return this.tasksService.createTask(taskParams);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Delete('/:id')
  deleteTaskById(
    @Param('id') id: string,
    @I18n() i18n: I18nContext
  ): string {
    const taskDeleted = this.tasksService.deleteTaskById(id);

    if (!taskDeleted) return i18n.t("task.delete.failed");
    return i18n.t("task.delete.success", { args: {id: id}});
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status') taskStatus: TaskStatus,
  ): Task {
    return this.tasksService.updateTaskStatus(
      id, taskStatus
    );
  }
}