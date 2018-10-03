import { Task } from '../interfaces/task';
import { Colors} from '../interfaces/colors';

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
        if (color != null && color != undefined && color < Colors.list.length) {
            this.color = color;
        }
        else
        {
            this.color = 0;
        }
        if (tasks != null && tasks != undefined) {
            this.tasks = tasks;
        }
        else {
            this.tasks = new Array<Task>();
        }
        this.updateCount();
        this.colorRgb = Colors.list[this.color];
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

    updateColor(color: number) {
        this.color = color;
        this.colorRgb = Colors.list[this.color];
    } 

    private updateCount() {
        this.count = this.tasks.length;
    }
}