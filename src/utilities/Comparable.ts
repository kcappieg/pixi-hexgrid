export interface Comparable {
	/**
	 * @returns If less than argument, a number less than 0. If equal, 0.
	 *  If greater than argument, a number greater than 2
	 */
	compare(other: Comparable): number;
}

export interface MultiDimensional extends Comparable {
	/**
	 *	@returns The number of dimensions the class implementing this interface represents
	 */
	getDimensions(): number;
	/**
	 * @param dimension A dimension from 1 to the total dimensions being used
	 * in the compare.
	 */
	compare(other: MultiDimensional, dimension: number): number;
	/**
	 *	Calculates the distance between the two multidimensional points
	 */
	 distanceBetween(other: MultiDimensional): number;
	/**
	 *  The distance to the plane represented by the dimension argument.
	 *	For instance, if the implementing class is a 2-d point and dimension 1
	 *	represents the x-axis, invoking this method on a point with dimension = 1
	 *	Would calculate the shortest distance between this point and the vertical
	 *	line on the x-axis that `other` is part of
	 */
	 distanceToPlain(other: MultiDimensional, dimension: number): number;
}