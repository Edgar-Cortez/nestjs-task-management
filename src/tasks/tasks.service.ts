import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './tasks-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';

@Injectable()
export class TasksService {
  // ******************** START - Marius Espejo tutorial ********************
  constructor(
    @InjectRepository(Task) private tasksRepository: Repository<Task>, // marius espejo tutorial
  ) {}

  getAllTasks() {
    return this.tasksRepository.find();
  }

  getTaskById(id: string) {
    return this.tasksRepository.findOneBy({ id });
  }

  createTask(createTaskDto: CreateTaskDto) {
    const newTask = this.tasksRepository.create(createTaskDto);

    return this.tasksRepository.save(newTask);
  }

  async updateTaskStatus(
    id: string,
    status: TaskStatus,
    updateTaskStatusDto: UpdateTaskStatusDto,
  ) {
    const task = await this.getTaskById(id);
    task.status = status;

    return this.tasksRepository.save({ ...task, ...updateTaskStatusDto });
  }

  async deleteTask(id: string) {
    const task = await this.getTaskById(id);
    //this.tasks = this.tasks.filter((task) => task.id != found.id);

    return this.tasksRepository.remove(task);
  }
  // ******************** END - Marius Espejo tutorial ********************

  // ****** DELETE ****** private tasks: Task[] = [];

  /* getAllTasks(): Task[] {
  //   return this.tasks;
   }*/

  /* getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
  //   const { status, search } = filterDto;
  //   // define a temporary array to hold the result
  //   let tasks = this.getAllTasks();
  //   // do something with the status
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }
  //   // do something with search
  //   if (search) {
  //     tasks = tasks.filter((task) => {
  //       if (task.title.includes(search) || task.description.includes(search)) {
  //         return true;
  //       }
  //       return false;
  //     });
  //   }
  //   //return final result
  //   return tasks;
   }*/

  /* getTaskById(id: string): Task {
  //   const found = this.tasks.find((task) => task.id === id);
  //   if (!found) {
  //     throw new NotFoundException(`Task with ID "${id}" not found.`);
  //   }
  //   return found;
   }*/

  /* createTask(createTaskDto: CreateTaskDto): Task {
  //   const { title, description } = createTaskDto;
  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };
  //   this.tasks.push(task);
  //   return task;
   }*/

  /* updateTaskStatus(id: string, status: TaskStatus): Task {
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
   }*/

  /* deleteTask(id: string): void {
  //   const found = this.getTaskById(id);
  //   this.tasks = this.tasks.filter((task) => task.id != found.id);
   }*/
}
