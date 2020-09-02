import { dijkstra, getNodesInShortestPathOrder } from '../algorithms/dijkstra';
import { solve_astar, getNodesInShortestPathOrderAStar } from "../algorithms/AStar";
import { solve_bfs, getNodesInShortestPathOrderBFS } from "../algorithms/BreadthFirstSearch";
import { solve_dfs, getNodesInShortestPathOrderDFS } from "../algorithms/DepthFirstSearch";

// Takes in which nodes have been visited and shortest path, for each node, set the node to visited, if it is the 
// DO NOT UNDERSTAND IF STATEMENT - CONTEXT
animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
        if (i === visitedNodesInOrder.length) {
            setTimeout(() => {
                this.animateShortestPath(nodesInShortestPathOrder);
            }, 10 * i);
            return;
        }
        setTimeout(() => {
            const node = visitedNodesInOrder[i];
            document.getElementById(`node-${node.row}-${node.col}`).className =
                'node node-visited';
        }, 10 * i);
    }
}

//  take the state and apply it to grid, intialise start and finish nodes, find shortest path and animate
visualiseDijkstra() {
    isAnimating = true;
    const { grid } = this.state;
    var startNode = grid[START_NODE_ROW][START_NODE_COL];
    var finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
}


animateAStar(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
        if (i === visitedNodesInOrder.length) {
            setTimeout(() => {
                this.animateShortestPath(nodesInShortestPathOrder);
            }, 10 * i);
            return;
        }
        setTimeout(() => {
            const node = visitedNodesInOrder[i];
            document.getElementById(`node-${node.row}-${node.col}`).className =
                'node node-visited';
        }, 10 * i);
    }
}

//  take the state and apply it to grid, intialise start and finish nodes, find shortest path and animate
visualiseAStar() {
    isAnimating = true;
    const { grid } = this.state;
    var startNode = grid[START_NODE_ROW][START_NODE_COL];
    var finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = solve_astar(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrderAStar(finishNode);
    this.animateAStar(visitedNodesInOrder, nodesInShortestPathOrder);
}

animateBFS(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
        if (i === visitedNodesInOrder.length) {
            setTimeout(() => {
                this.animateShortestPath(nodesInShortestPathOrder);
            }, 10 * i);
            return;
        }
        setTimeout(() => {
            const node = visitedNodesInOrder[i];
            document.getElementById(`node-${node.row}-${node.col}`).className =
                'node node-visited';
        }, 10 * i);
    }
}

//  take the state and apply it to grid, intialise start and finish nodes, find shortest path and animate
visualiseBFS() {
    isAnimating = true;
    const { grid } = this.state;
    var startNode = grid[START_NODE_ROW][START_NODE_COL];
    var finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = solve_bfs(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrderBFS(finishNode);
    this.animateBFS(visitedNodesInOrder, nodesInShortestPathOrder);
}

animateDFS(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
        if (i === visitedNodesInOrder.length) {
            setTimeout(() => {
                this.animateShortestPath(nodesInShortestPathOrder);
            }, 10 * i);
            return;
        }
        setTimeout(() => {
            const node = visitedNodesInOrder[i];
            document.getElementById(`node-${node.row}-${node.col}`).className =
                'node node-visited';
        }, 10 * i);
    }
}

//  take the state and apply it to grid, intialise start and finish nodes, find shortest path and animate
visualiseDFS() {
    isAnimating = true;
    const { grid } = this.state;
    var startNode = grid[START_NODE_ROW][START_NODE_COL];
    var finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = solve_dfs(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrderDFS(finishNode);
    this.animateDFS(visitedNodesInOrder, nodesInShortestPathOrder);
}