import { Task } from '../interfaces/task';

export class Project {
    tasks: Array<Task>;
    name: string;
    color: number;
    count: number;
    colorRgb: string = '#333333';

    constructor(name?: string, color?: number, tasks?: Array<Task>) {
        if (name != null && name != undefined) {
            this.name = name;
        }
        if (color != null && color != undefined) {
            this.color = color;
        }
        if (tasks != null && tasks != undefined) {
            this.tasks = tasks;
        }
        else {
            this.tasks = new Array<Task>();
        }
        this.updateCount();
    }

    addTask(task: Task) {
        this.tasks.push(task);
        this.updateCount();
    }

    removeTask(task: Task) {
        let index = this.tasks.indexOf(task);
        if (index != -1) {
            this.tasks.splice(index, 1);
            this.updateCount();
        }
    }

    moveTask(task: Task, project: Project) {
        this.removeTask(task);
        project.addTask(task);
        this.updateCount();
    }

    private updateCount() {
        this.count = this.tasks.length;
    }
}