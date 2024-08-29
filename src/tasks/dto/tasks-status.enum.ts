// THIS WAS BEFORE USING POSTGRESQL, WE ARE USING task.entity.ts
// export interface Task {
//   id: string;
//   title: string;
//   description: string;
//   status: TaskStatus;
// }

export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}
