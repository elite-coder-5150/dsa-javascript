export default class Graph {
    constructor(isDirected = false) {
        this.nodes = {};
        this.edges = {};
        this.isDirected = isDirected;
    }

    addNode(newNode) {
        this.nodes[newNode] = newNode;
        return this;
    }

    getNodeByKey(nodeKey) {
        return this.nodes[nodeKey];
    }

    getNeighbors(node) {
        return node.getNeighbors();
    }

    getAllNodes() {
        return Object.values(this.nodes);
    }

    getAllEdges() {
        return Object.values(this.edges);
    }

    addEdge(edge) {
        let startNode = this.getNodeByKey(edge.start);
        let endNode = this.getNodeByKey(edge.end);

        if (!startNode) {
            this.addNode(edge.start);
            startNode = this.getNodeByKey(edge.start);
        }

        if (!endNode) {
            this.addNode(edge.end);
            endNode = this.getNodeByKey(edge.end);
        }

        if (this.edges[edge.getKey()]) {
            throw new Error('Edge has already been added before');
        } else {
            this.edges[edge.getKey()] = edge;
        }

        if (this.isDirected) {
            startNode.addEdge(edge);
        } else {
            startNode.addEdge(edge);
            endNode.addEdge(edge);
        }

        return this;
    }

    deleteEdge(edge) {
        if (this.edges[edge.getKey()]) {
            delete this.edges[edge.getKey()];
        } else {
            throw new Error('Edge not found in graph');
        }

        const startNode = this.getNodeByKey(edge.start);
        const endNode = this.getNodeByKey(edge.end);

        startNode.deleteEdge(edge);
        endNode.deleteEdge(edge);
    }

    findEdge(startNode, endNode) {
        const node = this.getNodeByKey(startNode);

        if (!node) {
            return null;
        }

        return node.findEdge(endNode);
    }

    reverse() {
        this.getAllEdges().forEach((edge) => {
            this.deleteEdge(edge);
            edge.reverse();
            this.addEdge(edge);
        });

        return this;
    }

    getNodesIndices() {
        const nodesIndices = {};
        this.getAllNodes().forEach((node, index) => {
            nodesIndices[node.getKey()] = index;
        });

        return nodesIndices;
    }

    getAdjacencyMatrix() {
        const nodes = this.getAllNodes();
        const nodesIndices = this.getNodesIndices();

        const adjacencyMatrix = Array(nodes.length).fill(null).map(() => {
            return Array(nodes.length).fill(Infinity);
        });

        nodes.forEach((node, nodeIndex) => {
            node.getNeighbors().forEach((neighbor) => {
                const neighborIndex = nodesIndices[neighbor.getKey()];
                adjacencyMatrix[nodeIndex][neighborIndex] = this.findEdge(node, neighbor).weight;
            });
        });

        return adjacencyMatrix;
    }

    toString() {
        return Object.keys(this.nodes).toString();
    }
}

let g = new Graph();
g.getAdjacencyMatrix();
