import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto/create-task.dto';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    private readonly i18n: I18nService
  ) {}

  async getAllTasks(): Promise<Task[]> {
    return this.tasksRepository.find();
  }

  async createTask(taskParams: CreateTaskDto): Promise<Task> {
    const { title, description } = taskParams;
    const permitTaskParams = {
      title,
      description,
      isActive: false,
    };

    const task = await this.tasksRepository.create(permitTaskParams);

    try {
      return await this.tasksRepository.save(task);
    } catch (error) {
      throw new BadRequestException({
        message: I18nContext.current().t("task.create.failed"),
        data: {},
      })
    }
  }

  async getTaskById(id: number): Promise<Task> {
    const task = await this.tasksRepository.findOneBy({id});

    if (!task) {
      throw new NotFoundException({
        message: this.i18n.t("task.validate.id.not_found", { lang: I18nContext.current().lang, args: { id: id } }),
        data: {},
      });
    }

    return task;
  }

  async deleteTaskById(id: string) {
    const result = await this.tasksRepository.delete(id);
    return result.affected;
  }

  async updateTaskStatus(id: string, status: boolean) {
    const result =  await this.tasksRepository.update(id, {isActive: !!status});
    return result.affected;
  }
}
