import Heap from "./heap";

export default class MaxHeap extends Heap {
    pairIsInCorrectOrder(firstElem, secondElem) {
        return this.compare.greaterThanOrEqual(firstElem, secondElem);
    }
}