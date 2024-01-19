export interface ITask {
  id?: string; // unique identifier for the task
  title: string; // title of task
  description: string; // description of task
  isActive: boolean; // status of task
 }

 // Take advantage of typescript enumeration as a set of statuses
 export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
 }
