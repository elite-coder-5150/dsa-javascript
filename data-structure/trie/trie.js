import TrieNode from './trie-node';

const HEAD_CHARACTER = '*';

export default class Trie {
    constructor() {
        this.head = new TrieNode(HEAD_CHARACTER);
    }

    addWord(word) {
        const characters = Array.from(word);
        let currentNode = this.head;

        for (let charIdx = 0; charIdx < characters.length; charIdx += 1) {
            const isComplete = charIdx === characters.length - 1;
            currentNode = currentNode.addChild(characters[charIdx], isComplete);
        }

        return this;
    }

    deleteWord(word) {
        const depthFirstDelete = (currentNode, charIdx = 0) => {
            if (charIdx >= word.length) {
                // Return if we're trying to delete the character that's beyond the scope of the word.
                return;
            }

            const character = word[charIdx];
            const nextNode = currentNode.getChild(character);

            if (nextNode == null) {
                // Return if we're trying to delete a word that has not been added to the Trie.
                return;
            }

            // Recursively call delete on the next node that is in the path of the word to be deleted.
            depthFirstDelete(nextNode, charIdx + 1);

            // Since we're going to delete a word let's decrement the word count.
            currentNode.removeChild(character);
        };

        const getChild = (character) => {

        }

        // Start depth first deletion from the head node.
        depthFirstDelete(this.head);

        return this;
    }

    getChild(character) {
        return this.head.getChild(character);
    }

    suggestNextCharacters(word) {
        const lastCharacter = this.getLastCharacterNode(word);

        if (!lastCharacter) {
            return null;
        }

        return lastCharacter.suggestChildren();
    }

    suggestChildren(word) {
        const lastCharacter = this.getLastChild(word);

        if (!lastCharacter) {
            return null;
        }

        return lastCharacter.suggestChildren();
    }

    getLastChild(word) {
        let currentNode = this.head;
        for (let charIdx = 0; charIdx < word.length; charIdx += 1) {
            if (!currentNode.hasChild(word[charIdx])) {
                return null;
            }

            currentNode = currentNode.getChild(word[charIdx]);
        }

        return currentNode;
    }
    doesWordExist(word) {
        const lastCharacter = this.getChild(word[word.length - 1]);

        return !!lastCharacter && lastCharacter.isCompleteWord;
    }

    getLastCharacterNode(word) {
        let currentNode = this.head;
        for (let charIdx = 0; charIdx < word.length; charIdx += 1) {
            if (!currentNode.hasChild(word[charIdx])) {
                return null;
            }

            currentNode = currentNode.getChild(word[charIdx]);
        }

        return currentNode;
    }
}
