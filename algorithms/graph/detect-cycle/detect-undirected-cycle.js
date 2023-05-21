import dfs from '../dfs/dfs';

export default function detectUndirectedCycle (graph)  {
    let cycle = null;
    const visitedNodes = {};
    const parents = {};

    const callbacks = {
        allowTraversal: ({ currentNode, nextNode }) => {
            if (cycle) {
                return false;
            }

            const currentNodeParent = parent[currentNode.getKey()];
            const currentNodeParentKey = currentNodeParent ? currentNodeParent.getKey() : null;

            return currentNodeParentKey !== nextNode.getKey();
        },

        enterNode: ({ currentNode, previousNode }) => {
            if (visitedNodes[currentNode.getKey()]) {
                cycle = [];
                let currentCycleNode = currentNode;
                let previousCycleNode = previousNode;

                while (previousCycleNode.getKey() !== currentNode.getKey()) {
                    cycle.unshift(currentCycleNode);
                    currentCycleNode = previousCycleNode;
                    previousCycleNode = parents[previousCycleNode.getKey()];
                }

                cycle.unshift(currentCycleNode);
            } else {
                visitedNodes[currentNode.getKey()] = currentNode;
                parents[currentNode.getKey()] = previousNode;
            }
        }
    };

    const startNode = graph.getAllNodes()[0];
    dfs(graph, startNode, callbacks);

    return cycle;;

}
