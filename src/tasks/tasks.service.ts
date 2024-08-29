import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { TaskStatus } from './tasks-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private tasksRepository: Repository<Task>,
  ) {}

  // ********** Ariel **********
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = this.tasksRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    await this.tasksRepository.save(task);
    return task;
  }

  async getTaskById(id: string): Promise<Task> {
    const foundTask = await this.tasksRepository.findOneBy({ id });

    if (!foundTask) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return foundTask;
  }

  // getAllTasks(): Promise<Task[]> {
  //   return this.tasksRepository.find();
  // }

  async filterTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { status, search } = filterDto;

    const query = this.tasksRepository.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
        { search: `%${search}%` },
      );
    }

    const tasks = await query.getMany();
    return tasks;
  }

  getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.filterTasks(filterDto);
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.getTaskById(id);

    return this.tasksRepository.save({ ...task, ...updateTaskDto });
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);

    task.status = status;
    this.tasksRepository.save(task);

    return task;
  }

  async deleteTask(id: string): Promise<void> {
    const result = await this.tasksRepository.delete(id);
    // console.log(result);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }

  // ********** Marius **********
  create(createTaskDto: CreateTaskDto): Promise<Task> {
    const newTask = this.tasksRepository.create(createTaskDto);

    console.log('TasksService', newTask);
    return this.tasksRepository.save(newTask);
  }

  findAll() {
    return this.tasksRepository.find();
  }

  findOne(id: string) {
    // write exception if ID not found
    return this.tasksRepository.findOneBy({ id });
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const task = await this.findOne(id);

    return this.tasksRepository.save({ ...task, ...updateTaskDto });
  }

  async remove(id: string) {
    const task = await this.findOne(id);

    return this.tasksRepository.remove(task);
  }
}
