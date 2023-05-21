import Comparator from "../../util/comparator";

export default function linearSearch(sortedArray, seekElement, comparatorCallback) {
    const comparator = new Comparator(comparatorCallback);
    const foundIndex = [];

    sortedArray.forEach((element, index) => {
       if (comparator.equal(element, seekElement)) {
            foundIndex.push(index);
        }
    });

    return foundIndex;
}
