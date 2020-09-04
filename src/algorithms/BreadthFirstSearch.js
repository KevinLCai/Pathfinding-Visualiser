var visitedNodesInOrder = [];
var nodesInShortestPathOrder = [];
var destinationRow, destinationCol;

function bfs(grid, row, col) {
    const tempNode = grid[row][col];
    tempNode.isVisited = true;
    tempNode.previousNode = null;
    tempNode.distance = 0;
    // Implement a Queue
    var queue = [];
    queue.push(tempNode);
    // While the queue is not empty
    while (queue.length > 0) {
        var node = queue.shift();
        visitedNodesInOrder.push(node);
        //If we have found the end node, return
        if (node.row == destinationRow && node.col == destinationCol) return;
        var unvisitedNeighbours = getUnvisitedNeighbours(node, grid);
        for (const neighbour of unvisitedNeighbours) {
            if (neighbour.isWall) continue;
            if (neighbour.isVisited === false) {
                queue.push(neighbour);
                neighbour.previousNode = node;
                neighbour.isVisited = true;
                neighbour.distance = node.distance + 1;
            }
        }
    }
}

function getUnvisitedNeighbours(node, grid) {
    const neighbours = [];
    const { row, col } = node;
    if (row > 0) neighbours.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbours.push(grid[row + 1][col]);
    if (col > 0) neighbours.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbours.push(grid[row][col + 1]);
    return neighbours.filter(neighbour => !neighbour.isVisited);
}

export function solveBFS(grid, startNode, finishNode) {
    visitedNodesInOrder = [];
    nodesInShortestPathOrder = [];
    destinationRow = finishNode.row;
    destinationCol = finishNode.col;
    bfs(grid, startNode.row, startNode.col);
    return visitedNodesInOrder;
}

export function getNodesInShortestPathOrderBFS(finishNode) {
    let currentNode = finishNode;
    while (currentNode) {
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
}