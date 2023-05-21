import LinkedList from "../linked-list/linked-list";

export default class GraphNode {
    constructor(value) {
        if (value === undefined) {
            throw new Error('Graph node must have a value');
        }

        const edgeComparator = (edgeA, edgeB) => {
            if (edgeA.getKey() === edgeB.getKey()) {
                return 0;
            }

            return edgeA.getKey() < edgeB.getKey() ? -1 : 1;
        }

        this.value = value;
        this.edges = new LinkedList(edgeComparator);
    }

    addEdge(edge) {
        this.edges.append(edge);
        return this;
    }

    deleteEdge(edge) {
        this.edges.delete(edge);
    }

    getNeighbors() {
        const edges = this.edges.toArray();

        const neighborsConverter = (node) => {
            return node.value;
        }

        return edges.map(neighborsConverter);
    }

    getEdges() {
        return this.edges.toArray().map(linkedListNode => linkedListNode.value);
    }

    getDegree() {
        return this.edges.toArray().length;
    }

    hasEdge(requiredEdge) {
        const edgeNode = this.edges.find({
            callback: edge => edge === requiredEdge,
        });

        return !!edgeNode;
    }

    hasNeighbor(node) {
        const nodeComparator = (nodeValue, node) => {
            return nodeValue === node;
        }

        return !!this.findNeighbor(node, nodeComparator);
    }

    findEdge(node, edgeComparator) {
        const edgeFinder = (edge) => {
            return edgeComparator && edgeComparator(edge, node);
        }

        const edge = this.edges.find({ callback: edgeFinder });

        return edge ? edge.value : null;
    }

    getKey() {
        return this.value;
    }

    deleteAllEdges() {
        this.getEdges().forEach(edge => this.deleteEdge(edge));

        return this;
    }

    toString(callback) {
        return callback ? callback(this.value) : `${this.value}`;
    }
}
