import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksRepository } from './dto/tasks.repository';
import { Task } from './entities/task.entity';

@Module({
  //imports: [TypeOrmModule.forFeature([TasksRepository])],
  imports: [TypeOrmModule.forFeature([Task])], // marius espejo
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
