import { Module } from '@nestjs/common';
import { TasksController } from './tasks-old.controller';
import { TasksService } from './tasks-old.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksRepository } from './dto/tasks.repository-old';

@Module({
  imports: [TypeOrmModule.forFeature([TasksRepository])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
