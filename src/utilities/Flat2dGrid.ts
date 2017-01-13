export default class Flat2dGrid<T> {
  private flatArray: T[] = [];
  private columns: number;
  private rows: number;

/**
 * Takes a rectangular 2-d array of one type and flattens it
 */
  constructor(twoDimArray: Array<T[]>) {
    this.columns = twoDimArray.length;
    this.rows = twoDimArray[0].length;

    for (let i=0; i < twoDimArray.length; i++){
      for (let j=0; j < twoDimArray[i].length; j++){
        if (twoDimArray[i].length !== this.rows){
          throw new Error("2-dimensional array is not uniformly rectangular");
        }
        const index: number = i * twoDimArray[i].length + j;
        this.flatArray[index] = twoDimArray[i][j];
      }
    }
  }

  getColumns(): number{
    return this.columns;
  }

  getRows(): number {
    return this.rows;
  }

/**
 * Access the 2-d array
 * @returns The element (type T) at the indexes provided
 */
  getAt(x: number, y: number): T {
    if (x >= this.columns || y >= this.rows || x < 0 || y < 0){
      throw new Error("Index out of bounds");
    }

    const index = x*this.rows + y;
    return this.flatArray[index];
  }
}