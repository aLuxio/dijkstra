class Graph {
    constructor() {
        this.graph = new Map();
        this.nodes = [];
        this.focusedNodes = new Set();
    }

    draw() {
        //visited prevents lines from being drawn twice
        const visited = [];
        nodeDiameter = calculateDiameter();

        //draw lines first
        var lineThickness = int(nodeDiameter/8);
        strokeWeight(lineThickness > 0 ? lineThickness : 1);
        for(const n of graph.nodes) {
            visited.push(n);
            for(const j of graph.get(n)) {
                //skips node j if n is hovered or if it already has a line
                if(!n.isHovered(nodeDiameter) && visited.includes(j)) continue;
                stroke(n.isHovered(nodeDiameter) || n.focused && j.focused ? 'yellow' : 30);
                line(n.x, n.y, j.x, j.y);
            }
        }
        //calls draw function for each node
        for(const n of graph.nodes) {
            if(n.focused) {
                this.focusedNodes.add(n);
            }
            else {
                this.focusedNodes.delete(n);
            }
                
            n.draw(nodeDiameter);
        }
        // use dijkstra's to draw points eventually (it will look cool)
    }

    //appends a node to the graph
    addNode(node) {
        if(!this.graph.has(node)) {
            this.graph.set(node, []);
            this.nodes.push(node);
        }
    }

    //establishes a connection between two nodes in the graph
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

    //conducts a breadth-first search from a starting node
    bfs(node) {
        console.log('breadth first search (BFS) initiated');
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
        while(queue.length > 0) {
            let n = queue.shift();
            //console.log(n);
            n.focus();
            visited.set(n, true);
            //get neighbors
            //if neighbor has not been visited, mark it and enqueue it
            for(const val of this.graph.get(node)) {
                if(!visited.get(val)) {
                    queue.push(val);
                }
            }
        }
        console.log('BFS completed');
    }

    dijkstra(source, target) {
        let unvisited = new Set();
        let distances = new Map();
    }

    getClosestNeighbors(node) {
        let neighbors = this.get(node);
        neighbors.sort(x => node.distanceTo(x));
        return neighbors;
    }

    getFocusedNodes() {
        var nodes = [];
        for(var i = 0; i < this.graph.length; i++) {
            if(this.graph[i].isFocused())
                nodes.push(this.graph[i]);
        }
        return nodes;
    }

    get(node) {
        return this.graph.get(node);
    }

    get size() {
        return this.graph.size;
    }
}