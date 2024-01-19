import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto/create-task.dto';
import { I18n, I18nContext } from 'nestjs-i18n';
import { PositiveNumberValidationPipe } from './pipes/positive-number-validation.pipe';
import { CustomValidationRes } from './pipes/custom_validation_res.pipe';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService){}

  @Get()
  getTasks() {
    return this.tasksService.getAllTasks();
  }

  @Post()
  @UsePipes(new CustomValidationRes())
  createTask(
    @I18n() i18n: I18nContext,
    @Body() taskParams: CreateTaskDto
  ) {
    return this.tasksService.createTask(taskParams)
               .then((value) => {return {message: i18n.t("task.create.success"), data: value}});
  }

  @Get('/:id')
  getTaskById(@Param('id', PositiveNumberValidationPipe) id: string) {
    return this.tasksService.getTaskById(+id);
  }

  @Delete('/:id')
  deleteTaskById(
    @Param('id', PositiveNumberValidationPipe) id: string,
    @I18n() i18n: I18nContext
  ) {
    if(this.tasksService.deleteTaskById(id)) return {message: i18n.t("task.delete.success", { args: {id: id}})}
    else return {message: i18n.t("task.delete.failed")}
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id', PositiveNumberValidationPipe) id: string,
    @Body("active") active: boolean,
    @I18n() i18n: I18nContext
  ) {
    if(this.tasksService.updateTaskStatus(id, !!active)) return {message: i18n.t("task.update.success", { args: {id: id}})}
    else return {message: i18n.t("task.update.failed")}
  }
}
