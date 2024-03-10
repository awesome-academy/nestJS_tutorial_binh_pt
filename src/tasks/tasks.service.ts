import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto/create-task.dto';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    private readonly i18n: I18nService,
  ) {}

  async getAllTasks(): Promise<Task[]> {
    return this.tasksRepository.find();
  }

  async createTask(taskParams: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = taskParams;
    const permitTaskParams = {
      title,
      description,
      isActive: false,
      user,
    };
    const task = await this.tasksRepository.create(permitTaskParams);

    try {
      return await this.tasksRepository.save(task);
    } catch (error) {
      throw new BadRequestException({
        message: I18nContext.current().t('task.create.failed'),
        data: {},
      });
    }
  }

  async getTaskById(id: number, user: User): Promise<Task> {
    const task = await this.tasksRepository.findOneBy({ id, user });

    if (!task) {
      throw new NotFoundException({
        message: this.i18n.t('task.validate.id.not_found', {
          lang: I18nContext.current().lang,
          args: { id: id },
        }),
        data: {},
      });
    }

    return task;
  }

  async deleteTaskById(id: string, user: User) {
    const task = await this.getTaskById(+id, user);
    const result = await this.tasksRepository.delete(task);
    return result.affected;
  }

  async updateTaskStatus(id: string, status: boolean, user: User) {
    const task = await this.getTaskById(+id, user);
    const result = await this.tasksRepository.update(task, {
      isActive: !!status,
    });
    return result.affected;
  }
}
