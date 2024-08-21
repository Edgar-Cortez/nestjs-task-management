import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private tasksRepository: Repository<Task>,
  ) {}

  create(createTaskDto: CreateTaskDto) {
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
