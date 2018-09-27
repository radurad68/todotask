import { Task } from '../interfaces/task';

export interface Project {
    tasks: Array<Task>;
    name: string;
    color: number;
}