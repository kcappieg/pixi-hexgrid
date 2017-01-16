/// <reference path="../../../node_modules/@types/jasmine/index.d.ts" />

import KdTree from '../../../src/utilities/KdTree';
import {MultiDimensional} from '../../../src/utilities/Comparable';

//bare minimum implementations for testing KdTree class
//START HERE! (FINISHING IMPLEMENTATIONS)
class Point2d implements MultiDimensional {
	x: number;
	y: number;

	getDimensions(): number {return 2;}

	compare(other: Point2d, dimension = 1): number {
		let comparison1: number = this.getDimension();
		let comparison2: number = other.getDimension();

		if (comparison1 > comparison2){
			return 1;
		} else if (comparison1 === comparison2){
			return 0;
		} else {
			return -1;
		}
	}

	getDimension(dim: number){
		switch(dim){
			case 1:
				return x;
			case 2:
				return y;
		}
	}
}

class Point3d extends Point2d {
	z: number;

	getDimensions(): number {return 3;}
	getDimension(dim: number){
		if (dim < 3) {return super.getDimension(dim);}
		else if (dim === 3) {return z;}
	}
}

describe("KdTree utility class", function(){
	xit("should accept an array of type MultiDimensional");
	xit("should not accept an array of objects that do not implement MultiDimensional");
	describe("nearestNeighbor mehtod", function(){
		xit("should accept a point implementing Multidimensional")
	})
})