export class Task {
    name: string;
    priority: number;
    completed: boolean = false;
    expanded: boolean = false;

    constructor(name?: string, priority?: number) {
        if (name != undefined) {
            this.name = name;
        }
        if (priority != undefined) {
            this.priority = priority;
        }
        this.completed = false;
        this.expanded = false;
    }
}