/// <reference path="../../../node_modules/@types/jasmine/index.d.ts" />

import Flat2dGrid from '../../../src/utilities/Flat2dGrid';

describe('Flat2dGrid utility class', () => {
  it("should accept a rectangular 2-dimensional array in its constructor", () => {
    const testArray = [
      [1,2,3],
      [4,5,6],
      [7,8,9]
    ];

    const grid = new Flat2dGrid<number>(testArray);

    expect(grid).toBeDefined();
  });

  it("should not accept an irregular array", () => {
    const testArray = [
      [1, 2],
      [3, 4, 5, 6],
      [7, 8, 9]
    ];

    expect(() => new Flat2dGrid<number>(testArray)).toThrow();
  });

  describe("instance methods:", () => {
    const twoDimGrid: number[][] = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [10, 11, 12]
    ];
    const grid: Flat2dGrid<number> = new Flat2dGrid(twoDimGrid);

    it("getColums should return the length of the passed array", ()=>{
      expect(grid.getColumns()).toEqual(twoDimGrid.length);
    });

    it("getRows should return the length of the individual arrays", () => {
      expect(grid.getRows()).toEqual(twoDimGrid[0].length);
    });

    it("getAt should access the correct element with the given indices", () => {
      expect(twoDimGrid[0][0]).toEqual(grid.getAt(0, 0));
      expect(twoDimGrid[3][2]).toEqual(grid.getAt(3, 2));
      expect(twoDimGrid[1][0]).toEqual(grid.getAt(1, 0));
    });

    it("getAt should throw an error if the indices are out of bounds", () => {
      expect(() => grid.getAt(5, 0)).toThrow();
      expect(() => grid.getAt(0, 5)).toThrow();
    });
  });
});