import { IsEnum } from 'class-validator';
import { TaskStatus } from '../tasks-old-status.enum';

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
