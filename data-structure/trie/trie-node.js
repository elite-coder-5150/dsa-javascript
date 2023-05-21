import HashTable from '../hash-table/HashTable';

export default class TrieNode {
    constructor(character, isCompleteWord = false) {
        this.character = character;
        this.isCompleteWord = isCompleteWord;
        this.children = new HashTable();
    }

    getChild(character) {
        return this.children.get(character);
    }


    addChild(character, isCompleteWord = false) {
        if (!this.children.has(character)) {
            this.children.set(character, new TrieNode(character, isCompleteWord));
        }

        const childNode = this.children.get(character);

        // In case we are trying to add a word "car" after we have already added a word "carpet".
        // We shouldn't mark "r" character as complete word.
        childNode.isCompleteWord = childNode.isCompleteWord || isCompleteWord;

        return childNode;
    }

    removeChild(character) {
        const childNode = this.getChild(character);

        // Delete childNode only if:
        // - childNode has NO children,
        // - childNode.isCompleteWord === false.
        if (
            childNode
            && !childNode.isCompleteWord
            && !childNode.hasChildren()
        ) {
            this.children.delete(character);
        }

        return this;
    }

    hasChild(character) {
        return this.children.has(character);
    }

    suggestChildren() {
        return [...this.children.getKeys()];
    }

    toString() {
        let childrenAsString = this.suggestChildren().toString();
        childrenAsString = childrenAsString ? `:${childrenAsString}` : '';
        const isCompleteString = this.isCompleteWord ? '*' : '';

        return `${this.character}${isCompleteString}${childrenAsString}`;
    }
}