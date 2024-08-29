import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
// import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
// import { Repository } from 'typeorm';
import { TaskStatus } from './tasks-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(
    // @InjectRepository(Task) private tasksRepository: Repository<Task>,
    private tasksRepository: TasksRepository,
  ) {}

  // ********** Ariel **********
  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
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

  getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksRepository.filterTasks(filterDto);
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
  // create(createTaskDto: CreateTaskDto): Promise<Task> {
  //   const newTask = this.tasksRepository.create(createTaskDto);

  //   console.log('TasksService', newTask);
  //   return this.tasksRepository.save(newTask);
  // }

  // findAll() {
  //   return this.tasksRepository.find();
  // }

  // findOne(id: string) {
  //   // write exception if ID not found
  //   return this.tasksRepository.findOneBy({ id });
  // }

  // async update(id: string, updateTaskDto: UpdateTaskDto) {
  //   const task = await this.findOne(id);

  //   return this.tasksRepository.save({ ...task, ...updateTaskDto });
  // }

  // async remove(id: string) {
  //   const task = await this.findOne(id);

  //   return this.tasksRepository.remove(task);
  // }
}
