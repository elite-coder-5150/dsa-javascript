export default class DisjointSetItem {
    constructor(value, keyCallback) {
        this.value = value;
        this.keyCallback = keyCallback;
        this.parent = null;
        this.children = {};
    }
    
    getKey() {
        if (this.keyCallback) {
        return this.keyCallback(this.value);
        }
    
        return this.value;
    }
    
    getRoot() {
        return this.isRoot() ? this : this.parent.getRoot();
    }
    
    isRoot() {
        return this.parent === null;
    }
    
    getRank() {
        if (this.getChildren().length === 0) {
        return 0;
        }
    
        let rank = 0;
    
        this.getChildren().forEach((child) => {
        rank += 1;
    
        rank += child.getRank();
        });
    
        return rank;
    }
    
    getChildren() {
        return Object.values(this.children);
    }
    
    setParent(parent, forceSettingParentChild = true) {
        this.parent = parent;
    
        if (forceSettingParentChild) {
        parent.addChild(this);
        }
    
        return this;
    }
    
    addChild(child) {
        this.children[child.getKey()] = child;
        child.setParent(this, false);
    
        return this;
    }
    
    removeChild(child) {
        delete this.children[child.getKey()];
        child.setParent(null, false);
    
        return this;
    }
    
    removeChildren() {
        Object.keys(this.children).forEach((childKey) => {
        this.removeChild(this.children[childKey]);
        });
    
        return this;
    }
}