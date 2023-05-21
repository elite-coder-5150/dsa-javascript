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

export const dfs_recursion = (graph, currentVertex, previousVertex, callbacks) => {
    callbacks.enterNode({ currentVertex, previousVertex });

    graph.getNeighbors(currentVertex).forEach((nextVertex) => {
        if (callbacks.allowTraversal({ previousVertex, currentVertex, nextVertex })) {
            dfs_recursion(graph, nextVertex, currentVertex, callbacks);
        }
    });

    callbacks.leaveNode({ currentVertex, previousVertex });
}

export const dfs = (graph, startVertex, callbacks) => {
    const previousVertex = null;
    dfs_recursion(graph, startVertex, previousVertex, initCallbacks(callbacks));
}

export const dfs_iterative = (graph, startVertex, callbacks) => {
    const previousVertex = null;
    const stack = [];
    stack.push({ previousVertex, currentVertex: startVertex });

    while (stack.length !== 0) {
        const { previousVertex, currentVertex } = stack.pop();
        callbacks.enterNode({ currentVertex, previousVertex });

        graph.getNeighbors(currentVertex).forEach((nextVertex) => {
            if (callbacks.allowTraversal({ previousVertex, currentVertex, nextVertex })) {
                stack.push({ previousVertex: currentVertex, currentVertex: nextVertex });
            }
        });

        callbacks.leaveNode({ currentVertex, previousVertex });
    }
}


dfs();
dfs_iterative();
dfs_recursion();
