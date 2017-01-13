export default class Flat2dGrid {
    constructor(twoDimArray) {
        this.flatArray = [];
        this.columns = twoDimArray.length;
        this.rows = twoDimArray[0].length;
        for (let i = 0; i < twoDimArray.length; i++) {
            for (let j = 0; j < twoDimArray[i].length; j++) {
                if (twoDimArray[i].length !== this.rows) {
                    throw new Error("2-dimensional array is not uniformly rectangular");
                }
                const index = i * twoDimArray[i].length + j;
                this.flatArray[index] = twoDimArray[i][j];
            }
        }
    }
    getColumns() {
        return this.columns;
    }
    getRows() {
        return this.rows;
    }
    getAt(x, y) {
        if (x >= this.columns || y >= this.rows || x < 0 || y < 0) {
            throw new Error("Index out of bounds");
        }
        const index = x * this.rows + y;
        return this.flatArray[index];
    }
}
//# sourceMappingURL=Flat2dGrid.js.map