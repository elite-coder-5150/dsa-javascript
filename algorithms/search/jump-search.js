import Comparator from "../../util/comparator";

export default function jumpSearch(arr, seekElem, comparatorCb) {
    const comparator = new Comparator(comparatorCb);
    const arrSize = arr.length;
    const jumpSize = Math.floor(Math.sqrt(arrSize));

    let blockStart = 0;
    let blockEnd = jumpSize;

    while (comparator.greaterThan(seekElem, arr[Math.min(blockEnd, arrSize) - 1])) {
        blockStart = blockEnd;
        blockEnd += jumpSize;

        if (blockStart > arrSize) {
            return -1;
        }
    }

    let currentIndex = blockStart;

    while (currentIndex < Math.min(blockEnd, arrSize)) {
        if (comparator.equal(arr[currentIndex], seekElem)) {
            return currentIndex;
        }

        currentIndex += 1;
    }

    return -1;
}
