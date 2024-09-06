import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
    }),
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      entities: ['dist/**/*.entity.js'],
      database: 'task-management',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      autoLoadEntities: true,
      synchronize: true, // Turn off for PRODUCTION
    }),
    AuthModule,
  ],
})
export class AppModule {}
