export default class BloomFilter {
    constructor(size = 100) {
        this.size = size;
        this.storage = this.createStore(size);
    }

    insert(item) {
        const hashValues = this.getHashValues(item);

        hashValues.forEach(val => this.storage.setValue(val));

        return this;
    }

    mayContain(item) {
        const hashValues = this.getHashValues(item);

        for (let hashIndex = 0; hashIndex < hashValues.length; hashIndex += 1) {
            if (!this.storage.getValue(hashValues[hashIndex])) {
                return false;
            }
        }

        return true;
    }

    createStore(size) {
        const storage = [];

        for (let storageCellIndex = 0; storageCellIndex < size; storageCellIndex += 1) {
            storage.push(false);
        }

        const storageInterface = {
            getValue(index) {
                return storage[index];
            },
            setValue(index) {
                storage[index] = true;
            }
        };

        return storageInterface;
    }

    hash1(item) {
       let hash = 0;

       for (let charIndex = 0; charIndex < item.length; charIndex++) {
            const char = item.charCodeAt(charIndex);
            hash = (hash << 5) + hash + char;
            hash &= hash; // Convert to 32bit integer
            hash = Math.abs(hash);
        }

        return hash % this.size;
    }

    hash2(item) {
        let hash = 5381;

        for (let charIndex = 0; charIndex < item.length; charIndex++) {
            const char = item.charCodeAt(charIndex);
            hash = (hash << 5) + hash + char; /* hash * 33 + c */
        }

        return Math.abs(hash % this.size);
    }

    hash3(item) {
        let hash = 0;

        for (let charIndex = 0; charIndex < item.length; charIndex++) {
            const char = item.charCodeAt(charIndex);
            hash = (hash << 5) - hash;
            hash += char;
            hash &= hash; // Convert to 32bit integer
        }

        return Math.abs(hash % this.size);
    }

    getHashValues(item) {
        return [
            this.hash1(item),
            this.hash2(item),
            this.hash3(item)
        ];
    }
}