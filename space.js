var nodeDiameter = 50;

function setup() {
    createCanvas(800, 800);

    graph = new Graph();
    generateNodes(10);
    generateNeighbors();
    //console.log(graph);
    //graph.bfs(graph.nodes[0]);
}

function randomInt(max) {
    const num = Math.floor(Math.random() * max);
    return num;
}

function generateNodes(n) {
    for (var i = 0; i < n; i++) {
        const x = randomInt(height - nodeDiameter);
        const y = randomInt(height - nodeDiameter);
        graph.addNode(new Node(x, y));
    }
}

function generateNeighbors() {
    /*for(const i in this.nodes) {
        for(const j in this.nodes) {
            var rand = Math.floor(Math.random() * 100);
            if(rand % 2 == 0) {
                this.addEdge(i, j);
            }
        }
    }*/
    for(var i = 0; i < graph.size; i++) {
        for(var j = 0; j < graph.size; j++) {
            var rand = Math.floor(Math.random() * 100);
            if(rand % 5 == 0)
                graph.addEdge(graph.nodes[i], graph.nodes[j]);
        }
    }
}

/*function highlightNeighbors() {

}*/

/*function arrow(x1, y1, x2, y2) {
    line(x1, y1, x2, y2);
    triangle()
}*/

function drawGraph() {
/*
    for(const n of graph.nodes) {
        for(const ni of graph.get(n)) {
            stroke('white');
            strokeWeight(3);
            //console.log('('+ni.x+','+ni.y+')');
            line(n.x, n.y, ni.x, ni.y);
        }
        stroke(color('gray'));
        strokeWeight(nodeDiameter);
        //circle(n.x, n.y, nodeDiameter);
        point(n.x, n.y);
    }
    redraw();
    */
   
    //draw lines first
    strokeWeight(int(nodeDiameter/8));
    stroke(255);
    for(const n of graph.nodes) {
        for(const j of graph.get(n)) {
            line(n.x, n.y, j.x, j.y);
        }
    }
    //draw points over lines
    strokeWeight(nodeDiameter);
    for(const n of graph.nodes) {
        if(n.isHovered()) {
            stroke('yellow');
        }
        else {
            stroke('gray');
        }
        //stroke('gray');
        point(n.x, n.y);
    }
    // use dijkstra's to draw points eventually (it will look cool)
}
  
function draw() {
    clear();
    background('black');
    drawGraph();

    if(graph.size > 0) {
        nodeDiameter = Math.floor(250 / graph.size);
    }
    else {
        nodeDiameter = 1;
    }
}