import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
// import { UserStatus } from '../user-status.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  //   @Column()
  //   status: UserStatus;
}
