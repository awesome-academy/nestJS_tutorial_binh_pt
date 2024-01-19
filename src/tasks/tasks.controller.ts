import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards, UsePipes } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto/create-task.dto';
import { I18n, I18nContext } from 'nestjs-i18n';
import { PositiveNumberValidationPipe } from './pipes/positive-number-validation.pipe';
import { CustomValidationRes } from './pipes/custom_validation_res.pipe';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
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
    @Body() taskParams: CreateTaskDto,
    @Req() req
  ) {
    return this.tasksService.createTask(taskParams, req.user)
               .then((value) => {return {message: i18n.t("task.create.success"), data: value}});
  }

  @Get('/:id')
  getTaskById(
    @Param('id', PositiveNumberValidationPipe) id: string,
    @Req() req
  ) {
    return this.tasksService.getTaskById(+id, req.user);
  }

  @Delete('/:id')
  deleteTaskById(
    @Param('id', PositiveNumberValidationPipe) id: string,
    @I18n() i18n: I18nContext,
    @Req() req
  ) {
    return this.tasksService.deleteTaskById(id, req.user)
               .then(() => {return {message: i18n.t("task.delete.success", { args: {id: id}})}})
               .catch(error => {throw error})
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id', PositiveNumberValidationPipe) id: string,
    @Body("active") active: boolean,
    @I18n() i18n: I18nContext,
    @Req() req
  ) {
    return this.tasksService.updateTaskStatus(id, !!active, req.user)
               .then(() => {return {message: i18n.t("task.update.success", { args: {id: id}})}})
               .catch(error => {throw error})
  }
}
