import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { TaskStatus } from "src/tasks/task.model";

export class UpdateTaskDto {
  @IsOptional()
  title: string;

  @IsOptional()
  description: string;

  @IsOptional()
  isActive: boolean;
}
