var visitedNodesInOrder = [];
var nodesInShortestPathOrder = [];
var destinationRow, DestinationCol;
var ok = 0;
var type = 1;

function dfs(grid, row, col, par, d) {
    const node = grid[row][col];
    if (node.isWall) return;
    visitedNodesInOrder.push(node);
    node.isVisited = true;
    node.previousNode = par;
    node.distance = d;
    if (row === destinationRow && col === DestinationCol) {
        nodesInShortestPathOrder.push(node);
        ok = 1;
        return;
    }

    const unvisitedNeighbours = getUnvisitedNeighbours(node, grid);
    if (type === 0) shuffle(unvisitedNeighbours);
    for (const neighbour of unvisitedNeighbours) {
        if (neighbour.isVisited === false) {
            dfs(grid, neighbour.row, neighbour.col, node, d + 1);
            if (ok) {
                nodesInShortestPathOrder.push(node);
                node.previousNode = par;
                break;
            }
        }
    }
}

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
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
    ok = 0;
    destinationRow = finishNode.row;
    DestinationCol = finishNode.col;
    type = t;
    dfs(grid, startNode.row, startNode.col, null, 0);
    return visitedNodesInOrder;
}

export function getNodesInShortestPathOrderDFS() {
    nodesInShortestPathOrder.reverse();
    return nodesInShortestPathOrder;
}