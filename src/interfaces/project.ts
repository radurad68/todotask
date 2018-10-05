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
        this.update();
        this.colorRgb = Colors.list[this.color];
    }

    addTask(task: Task) {
        this.tasks.push(task);
        this.update();
    }

    removeTask(task: Task) {
        let index = this.tasks.indexOf(task);
        if (index != -1) {
            this.tasks.splice(index, 1);
            this.update();
        }
    }

    moveTask(task: Task, project: Project) {
        this.removeTask(task);
        project.addTask(task);
        this.update();
    }

    resetExpand() {
        this.tasks.map(task => {
            task.expanded = false;
        })
    }

    updateColor(color: number) {
        this.color = color;
        this.colorRgb = Colors.list[this.color];
    } 

    public update() {
        this.updateCount();
        this.sortTasks();
    }

    public updateCount() {
        this.count = 0;
        this.tasks.map(task => {
            if (!task.completed) {
                this.count += 1;
            }
        })
    }

    private sortTasks() {
        Array.prototype.sort.call(this.tasks, (task1, task2) => {
            return task1.priority < task2.priority;
        })
    }
}