export default class Flat2dGrid<T> {
    private flatArray;
    private columns;
    private rows;
    constructor(twoDimArray: Array<T[]>);
    getColumns(): number;
    getRows(): number;
    getAt(x: number, y: number): T;
}
