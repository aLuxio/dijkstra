var nodeCount;
var nodeDiameter;
var slider;

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
    let n = getHoveredNode();
    console.log(mouseX, mouseY);
    console.log(graph.getClosestNeighbors(graph.nodes[0]));
    if(n) {
        if(!n.focused) {
            n.focus();
            console.log("node "+n.id+" has been focused");
        }
        else if(n.focused) {
            n.unfocus();
            console.log("node "+n.id+" has been unfocused");
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
    noLoop();
    refresh();
    document.getElementById("nodeInfo").innerHTML = "select node";
    //delayProgram(200);
    let start = graph.nodes[4];
    graph.bfs(start);
    document.getElementById("nodeInfo").innerHTML = "node " + start.id + " selected\nrefresh graph to reset";
}
  
function draw() {
    clear();
    background('black');
    graph.draw();

    document.getElementById("nodeCount").innerHTML = slider.value;
    

    /* if(graph.size > 0) {
        
    }
    else {
        nodeDiameter = 1;
    } */
}

function delayProgram(ms) {
    var start = new Date().getTime();
    var end = 0;
    while((end - start) < ms) {
        end = new Date().getTime();
    }
}