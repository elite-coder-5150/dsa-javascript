import Heap from './heap';

export default class MinHeap extends Heap {
    pairIsInCorrectOrder(firstElem, secondElem) {
        return this.compare.lessThanOrEqual(firstElem, secondElem);
    }
}