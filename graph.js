class Graph {
    constructor() {
        this.graph = new Map();
        this.nodes = [];
    }

    addNode(node) {
        if(!this.graph.has(node)) {
            this.graph.set(node, []);
            this.nodes.push(node);
        }
    }

    addEdge(source, destination) {
        if(!this.graph.has(source) || !this.graph.has(destination)) {
            return false;
        }
        if(!this.graph.get(source).includes(destination)) {
            this.graph.get(source).push(destination);
        }
        if(!this.graph.get(destination).includes(source)) {
            this.graph.get(destination).push(source);
        }
    }

    bfs(node) {
        //boolean array denoting if each node was visited
        const visited = new Map();
        for(const n of this.nodes) {
            visited.set(n, false);
        }
        
        //make a queue for bfs
        const queue = [];
        //mark current node as visited and push it
        visited.set(node, true);
        queue.push(node);
        
        //dequeue node and do something with it
        while(queue.size != 0) {
            let n = queue.shift();
            console.log(n);
            //get neighbors
            //if neighbor has not been visited, mark it and enqueue it
            // n.forEach(function(value) {
            //     if(!visited.get(value)) {
            //         visited.set(value, true);
            //         queue.push(value);
            //     }
            // })
            for(const val of this.graph.get(node)) {
                if(!visited.get(val)) {
                    visited.set(val, true);
                    queue.push(val);
                }
            }
        }
    }

    get(node) {
        return this.graph.get(node);
    }

    get size() {
        return this.graph.size;
    }
}