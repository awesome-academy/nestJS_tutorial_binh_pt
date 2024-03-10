import { IsEnum, IsOptional } from 'class-validator';
import { TaskStatus } from 'src/tasks/task.model';

export class UpdateTaskStatusDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
