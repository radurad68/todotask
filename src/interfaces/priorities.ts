import { Task } from '../interfaces/task';
import { Colors} from '../interfaces/colors';

export class Priority {
    name: string;
    colorRgb: string;
    index: number;

    constructor(name?: string, colorRgb?: string, index?: number) {
        if (name != null && name != undefined) {
            this.name = name;
        }
        if (colorRgb != null && colorRgb != undefined) {
            this.colorRgb = colorRgb;
        }
        if (index != null && index != undefined) {
            this.index = index;
        }
    }

}

export class Priorities {
    static list: Array<Priority>;

    static populatePriorities() {
        Priorities.list = new Array<Priority>();
        let priority1 = new Priority('Priority 1', Colors.listPriorities[0], 0);
        let priority2 = new Priority('Priority 2', Colors.listPriorities[1], 1);
        let priority3 = new Priority('Priority 3', Colors.listPriorities[2], 2);
        let priority4 = new Priority('Priority 4', Colors.listPriorities[3], 3);
        Priorities.list.push(priority1);
        Priorities.list.push(priority2);
        Priorities.list.push(priority3);
        Priorities.list.push(priority4);
    }
}