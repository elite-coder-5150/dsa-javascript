import Queue from 'data-structure/queue/queue';

export const initCallbacks = (callbacks = {}) => {
    const initiatedCallback = callbacks;

    const stubCallback = () => {};

    const allowTraversalCallback = (
        () => {
            const seen = {};
            return ({ nextVertex }) => {
                if (!seen[nextVertex.getKey()]) {
                    seen[nextVertex.getKey()] = true;
                    return true;
                }
                return false;
            };
        }
    )();
    initiatedCallback.allowTraversal = callbacks.allowTraversal || (() => true);
    initiatedCallback.enterNode = callbacks.enterNode || stubCallback;
    initiatedCallback.leaveNode = callbacks.leaveNode || stubCallback;

    return initiatedCallback;
}

export const bfs = (graph, startVertex, callbacks) => {
    const previousVertex = null;
    const queue = new Queue();
    queue.enqueue({ previousVertex, currentVertex: startVertex });

    while (!queue.isEmpty()) {
        const { previousNode, currentNode } = queue.dequeue();
        callbacks.enterNode({ currentNode, previousNode });

        graph.getNeighbors(currentNode).forEach((nextVertex) => {
            if (callbacks.allowTraversal({ previousNode, currentNode, nextVertex })) {
                queue.enqueue({ previousNode: currentNode, currentNode: nextVertex });
            }
        });

        callbacks.leaveNode({ currentNode, previousNode });
    }
}
bfs();
