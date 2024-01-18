export interface Task {
  id: string; // unique identifier for the task
  title: string; // title of task
  description: string; // description of task
  status: TaskStatus; // status of task
 }

 // Take advantage of typescript enumeration as a set of statuses
 export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
 }
