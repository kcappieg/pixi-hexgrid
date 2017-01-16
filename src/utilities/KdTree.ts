import {MultiDimensional} from "./Comparable";

// implementation of the K-d data structure for 2 dimensions
  // Utility class for the KdTree class
  class ContainerNode<T> {
    left: ContainerNode<T> = null;
    right: ContainerNode<T> = null;

    private content: T;

    constructor(content: T){
      this.content = content;
    }

    getContent(): T {
      return this.content;
    }
  }

  //Simple in-place shuffling algorithm to randomize an array
  function shuffle(array: any[]): void{
    for (var i=0, random, temp; i < array.length-1; i++){
      random = Math.floor(Math.random() * (array.length - i)) + i;
      temp = array[i];
      array[i] = array[random];
      array[random] = temp;
    }
  }

  export default class KdTree<T extends MultiDimensional> {
    private rootNode: ContainerNode<T> = null;

    constructor(source: T[]){
      shuffle(source);
      for (let i = 0; i < source.length; i++){
        this.rootNode = addNode(source[i], this.rootNode, 1);
      }
    }

    private addNode(content: T, root: ContainerNode<T>, dimension: number)
      : ContainerNode<T> {
      if (root === null) {
        return new ContainerNode(content);
      }

      let newDimension: number = dimension+1;
      if (newDimension > content.getDimensions()){
        newDimension = 1;
      }

      if (content.compare(root.getContent(), dimension) > 0) {
        return this.addNode(content, root.right, newDimension);
      } else {
        return this.addNode(content, root.left, newDimension);
      }
    }

    public nearestNeighbor(point: T): T {
      return this.nearestNeighbor(point, this.rootNode, null, Infinity, 1).getContent();
    }

  /**
   *  Implementation of the K-D Search Algorithm
   */
    private kdSearch(point: T, root: ContainerNode<T>,
      bestNode: ContainerNode<T>, bestDist: number, dimension: number): ContainerNode<T> {

    //establish baseline for the distance to the root, and set the best distance and best node if none exists
      let currentDist = point.distanceBetween(root.getContent());
      if (!bestNode || currentDist < bestDist){
        bestNode = root;
        bestDist = currentDist;
      }

      if(root.left !== null || root.right !== null) {
        let nextBest: ContainerNode<T>;
        let alternate: ContainerNode<T>;

      //basic compares for determining the next closest node in the K-d search
        if (point.compare(root.getContent(), dimension) > 0){
          nextBest = root.right;
          alternate = root.left;
        } else {
          nextBest = root.left;
          alternate = root.right;
        }

        let nextDimension = dimension + 1;
        if (nextDimension > point.getDimensions()){
          nextDimension = 1;
        }

      //Get the next best node. If none is better, will ultimately return the current bestNode
        if (nextBest !== null){
          bestNode = this.kdSearch(point, nextBest, bestNode, bestDist, nextDimension);
        }
      //refresh the best distance
        bestDist = point.distanceBetween(bestNode.getContent());
      //if the best distance is further than a direct line to the plain represented by the current
      //dimension, see if there is a better node in the alternate node path
        if (alternate !== null && bestDist > point.distanceToPlain(bestNode.getContent(), dimension)){
          bestNode = this.kdSearch(point, alternate, bestNode, bestDist, nextDimension);
        }
      }

    //this may return the node pased to the function if no other node down the tree was
    //closer to the target point
      return bestNode;
    }
  }