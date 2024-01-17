import { TaskStatus } from "src/tasks/task.model";

export class GetTasksFilterDto {
 status: TaskStatus;
 searchString: string;
}
