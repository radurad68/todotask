export class Colors {
    static list: Array<string> = ["gray", "red", "darkred", "gold", "orange", "lightyellow", "yellow", "darkgreen", "green", "lime", "blue", "lightblue", "cyan", "pink", "indigo", "purple", "violet"];

    static getIndex(color: string) {
        for(let index = 0; index < Colors.list.length; index++) {
            if (Colors.list[index] == color) {
                return index;
            }
        }
        return 0;
    }
}