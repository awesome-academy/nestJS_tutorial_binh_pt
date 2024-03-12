import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatus } from 'src/tasks/task.model';

export class GetTasksFilterDto {
  @IsOptional()
  @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
  status: TaskStatus;

  @IsOptional()
  @IsNotEmpty()
  searchString: string;
}
