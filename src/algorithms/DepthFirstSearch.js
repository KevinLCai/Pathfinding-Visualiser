var visitedNodesInOrder = [];
var nodesInShortestPathOrder = [];
var destinationRow, destinationCol;
var pathFound = false;

function dfs(grid, row, col, distance) {
    const node = grid[row][col];
    if (node.isWall) return;
    visitedNodesInOrder.push(node);
    node.isVisited = true;
    node.distance = distance;
    if (row === destinationRow && col === destinationCol) {
        nodesInShortestPathOrder.push(node);
        pathFound = true;
        return;
    }

    const unvisitedNeighbours = getUnvisitedNeighbours(node, grid);
    for (const neighbour of unvisitedNeighbours) {
        if (neighbour.isVisited === false) {
            dfs(grid, neighbour.row, neighbour.col, node, distance + 1);
            if (pathFound) {
                nodesInShortestPathOrder.push(node);
                break;
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

export function solveDFS(grid, startNode, finishNode, t) {
    visitedNodesInOrder = [];
    nodesInShortestPathOrder = [];
    pathFound = false;
    destinationRow = finishNode.row;
    destinationCol = finishNode.col;
    dfs(grid, startNode.row, startNode.col, 0);
    return visitedNodesInOrder;
}

export function getNodesInShortestPathOrderDFS() {
    nodesInShortestPathOrder.reverse();
    return nodesInShortestPathOrder;
}