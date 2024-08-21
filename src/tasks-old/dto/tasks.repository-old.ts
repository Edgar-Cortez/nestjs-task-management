import { EntityRepository, Repository } from 'typeorm';
import { Task } from '../task-old.entity';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {}
