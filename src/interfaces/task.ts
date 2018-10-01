export class Task {
    name: string;
    priority: number;

    constructor(name?: string, priority?: number) {
        if (name != undefined) {
            this.name = name;
        }
        if (priority != undefined) {
            this.priority = priority;
        }
    }
}