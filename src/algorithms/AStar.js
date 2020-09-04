var visitedNodesInOrder = [];
var nodesInShortestPathOrder = [];
var destinationRow, destinationCol;
var unvisitedNodes = [];

export function astar(grid, startNode, finishNode) {
    unvisitedNodes = getAllNodes(grid);
    startNode.distance = 0;
    //while there are still unvisited nodes:
    while (unvisitedNodes.length) {
        sortNodesByDistance(unvisitedNodes);
        const closestNode = unvisitedNodes.shift();
        closestNode.isVisited = true;
        //If we encounter a wall - skip it
        if (closestNode.isWall) continue;
        //Increase the distance of a node if it is a weight
        if (closestNode.isWeight) {
            closestNode.distance = 150;
        }
        if (closestNode.distance === Infinity) return visitedNodesInOrder;
        // NEED TO CHANGE
        visitedNodesInOrder.push(closestNode);
        if (closestNode === finishNode) return visitedNodesInOrder;
        updateUnvisitedNeighbours(closestNode, grid);
    }
    return visitedNodesInOrder;
}

//Our heuristic is implemented by measuring distance of current node from the end node
function getEuclidianDistance(x1, y1, x2, y2,) {
    var v1 = Math.pow(x1 - x2, 2);
    v1 = v1 ** 2;
    var v2 = Math.pow(y1 - y2, 2);
    v2 = v2 ** 2;
    return Math.pow(v1 + v2, 0.5);
}

function sortNodesByDistance(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => {
        return (nodeA.distance + getEuclidianDistance(nodeA.row, nodeA.col, destinationRow, destinationCol) -
            (nodeB.distance + getEuclidianDistance(nodeB.row, nodeB.col, destinationRow, destinationCol))
        );
    });
}

function updateUnvisitedNeighbours(node, grid) {
    const unvisitedNeighbours = getUnvisitedNeighbours(node, grid);
    for (const neighbour of unvisitedNeighbours) {
        if (neighbour.isWeight) {
            neighbour.distance = node.distance + 10;
            neighbour.previousNode = node;
        }
        else {
            neighbour.distance = node.distance + 1;
            neighbour.previousNode = node;
        }
    }
}

function getUnvisitedNeighbours(node, grid) {
    const neighbours = [];
    const { col, row } = node;
    if (row > 0) neighbours.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbours.push(grid[row + 1][col]);
    if (col > 0) neighbours.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbours.push(grid[row][col + 1]);
    return neighbours.filter(neighbour => !neighbour.isVisited);
}

function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
        for (const node of row) {
            nodes.push(node);
        }
    }
    return nodes;
}

export function getNodesInShortestPathOrderAStar(finishNode) {
    let currentNode = finishNode;
    while (currentNode !== null) {
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
}

export function solveAStar(grid, startNode, finishNode) {
    visitedNodesInOrder = [];
    nodesInShortestPathOrder = [];
    destinationRow = finishNode.row;
    destinationCol = finishNode.col;
    return astar(grid, startNode, finishNode);
}