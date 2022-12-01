var nodeCount;
var nodeDiameter;
var slider;
var traversing = false;

function setup() {
    var canvas = createCanvas(800, 800);
    canvas.parent("simulation")
    rectMode(CENTER);
    textAlign(CENTER);

    slider = document.getElementById("countSlider");
    nodeCount = slider.value;
    nodeDiameter = calculateDiameter();

    graph = new Graph();
    generateNodes(nodeCount);
    generateNeighbors();
    //console.log(graph);
    //graph.bfs(graph.nodes[0]);
}

// generates a new graph
function reload() {
    console.log('generating new graph...');
    graph = new Graph();
    nodeCount = slider.value;
    nodeDiameter = calculateDiameter();
    document.getElementById("nodeInfo").innerHTML = "{}";
    generateNodes(nodeCount);
    generateNeighbors();
    loop();
    console.log('graph complete');
}

// keeps the current graph but unfocuses all nodes
//   and does some housekeeping
function refresh() {
    document.getElementById("nodeInfo").innerHTML = "{}";
    for(const n of graph.nodes) {
        n.deactivate();
    }
    loop();
    console.log('graph refreshed');
}

function randomInt(max, min=0) {
    const num = Math.floor(Math.random() * (max - min)) + min;
    return num;
}

function generateNodes(n) {
    for (var i = 0; i < n; i++) {
        const x = randomInt(height - nodeDiameter, nodeDiameter);
        const y = randomInt(height - nodeDiameter, nodeDiameter);
        graph.addNode(new Node(x, y, i+1));
    }
}

function generateNeighbors() {
    for(var i = 0; i < graph.size; i++) {
        //randomly determines if node n will be connected to node j
        for(var j = 0; j < graph.size; j++) {
            var rand = randomInt(100);
            if(rand % 2 == 0 && !graph.get(graph.nodes[j]).includes(graph.nodes[i]))
                graph.addEdge(graph.nodes[i], graph.nodes[j]);
        }
        if(graph.get(graph.nodes[i]).length == 0) {
            var j = randomInt(graph.size);
            graph.addEdge(graph.nodes[i], graph.nodes[j]);
        }
    }
}

function calculateDiameter() {
    /* 
     * 200 is an arbitrary scaling factor.
     * I just thought it looked nice, but there
     * may be a better way to implement this dynamically
    */
    return Math.floor(200 / nodeCount);
}

/*function highlightNeighbors() {

}*/

/*function arrow(x1, y1, x2, y2) {
    line(x1, y1, x2, y2);
    triangle()
}*/

function getHoveredNode() {
    for(const n of graph.nodes) {
        if(n.isHovered(nodeDiameter)) {
            return n;
        } 
    }
}

function mouseClicked() {
    if(!mouseInCanvas()) return;
    let n = getHoveredNode();
    //console.log(mouseX, mouseY);
    //console.log(graph.getClosestNeighbors(graph.nodes[0]));
    if(n) {
        if(traversing) {
            console.log("node "+n.id+" selected for traversal");
            return getHoveredNode();
        }
        else {
            if(!n.active) {
                n.activate();
                console.log("node "+n.id+" has been activated");
                return getHoveredNode();
            }
            else if(n.active) {
                n.deactivate();
                console.log("node "+n.id+" has been deactivated");
                return getHoveredNode();
            }
        }
    }
    else {
        console.log("no node to select");
    }
}

function mouseInCanvas() {
    return mouseX < width && mouseX >= 0 && mouseY < height && mouseY >= 0;
}

function bfs() {
    //traversing = true;
    refresh();
    document.getElementById("nodeInfo").innerHTML = "select node";
    //delayProgram(200);
    let start = randomInt(graph.size);
    //const start = focusedNodes.shift();
    noLoop();
    graph.bfs(start);
    document.getElementById("nodeInfo").innerHTML = "node " + start.id + " selected\nrefresh graph to reset";
    traversing = false;
}
  
function draw() {
    clear();
    background('black');
    graph.draw();

    document.getElementById("nodeCount").innerHTML = slider.value;
}

function delayProgram(ms) {
    var start = new Date().getTime();
    var end = 0;
    while((end - start) < ms) {
        end = new Date().getTime();
    }
}