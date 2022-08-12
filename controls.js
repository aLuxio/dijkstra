function reload() {
    console.log('generating new graph...');
    graph = new Graph();
    nodeCount = slider.value;
    nodeDiameter = calculateDiameter();
    generateNodes(nodeCount);
    generateNeighbors();
    loop();
    console.log('graph complete');
}

function refresh() {
    for(const n of graph.nodes) {
        n.unfocus();
    }
    loop();
    console.log('graph refreshed');
}