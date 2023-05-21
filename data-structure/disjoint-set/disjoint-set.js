import DisjointSetItem from "./disjoint-set-item";

export default class DisjointSet {
    cosntructor(keycallback) {
        this.keyCallback = keyCallback;
        this.items = {};
    }

    makeSet(itemValue) {
        const disjointSetItem = new DisjointSetItem(itemValue, this.keyCallback);

        if (!this.items[disjointSetItem.getKey()]) {
            this.items[disjointSetItem.getKey()] = disjointSetItem;
        }

        return this;
    }

    find(itemValue) {
        const templateDisjointItem = new DisjointSetItem(itemValue, this.keyCallback);

        const requiredDisjointItem = this.items[templateDisjointItem.getKey()];

        if (!requiredDisjointItem) {
            return null;
        }

        return requiredDisjointItem.getRoot().getKey();
    }

    union(valueA, valueB) {
        const rootKeyA = this.find(valueA);
        const rootKeyB = this.find(valueB);

        if (rootKeyA === null || rootKeyB === null) {
            throw new Error('One or two values are not in sets');
        }

        if (rootKeyA === rootKeyB) {
            return this;
        }

        const rootA = this.items[rootKeyA];
        const rootB = this.items[rootKeyB];

        if (rootA.getRank() < rootB.getRank()) {
            rootB.addChild(rootA);

            return this;
        }

        rootA.addChild(rootB);
        return this;
    }

    inSameSet(valueA, valueB) {
        const rootKeyA = this.find(valueA);
        const rootKeyB = this.find(valueB);

        if (rootKeyA === null || rootKeyB === null) {
            throw new Error('One or two values are not in sets');
        }

        return rootKeyA === rootKeyB;
    }
}