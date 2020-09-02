import React, { Component } from 'react';
import './PathfindingVisualiser.css';


import Node from './Node/Node';

import { solveDijkstra, getNodesInShortestPathOrderDijkstra } from '../algorithms/Dijkstra';
import { solveAStar, getNodesInShortestPathOrderAStar } from "../algorithms/AStar";
import { solveBFS, getNodesInShortestPathOrderBFS } from "../algorithms/BreadthFirstSearch";
import { solveDFS, getNodesInShortestPathOrderDFS } from "../algorithms/DepthFirstSearch";

var START_NODE_ROW = 10;
var START_NODE_COL = 15;
var FINISH_NODE_ROW = 10;
var FINISH_NODE_COL = 35;
var isAnimating = false;
var holdingFinish = false;
var holdingStart = false;
var placingWeights = [];
var visitedNodesInOrder, nodesInShortestPathOrder;

// const N = 20;
// const M = 50;
// let current_row = -1;
// let current_col = -1;
// var workIsDone = false;

// Initialise this into PathfindingVisualiser component
export default class PathfindingVisualiser extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
    };
  }
  // Initialise DOM content with grid
  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({ grid });

    if (!localStorage.getItem("visted")) {
      overlayOn();
      localStorage.setItem("visted", true);
    }
  }

  handleMouseDown(row, col) {
    if (!isAnimating) {
      const newGrid = augmentGrid(this.state.grid, row, col);
      this.setState({ grid: newGrid, mouseIsPressed: true });
    }
  }
  // When the mouse is no longer pressed DO NOT FULLY UNDERSTAND
  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    var newGrid = augmentGrid(this.state.grid, row, col);
    this.setState({ grid: newGrid });
  }
  // When mouse is lifted, set mouseIsPressed to false
  handleMouseUp() {
    this.setState({ mouseIsPressed: false });
    holdingFinish = false;
    holdingStart = false;
  }

  // Takes in which nodes have been visited and shortest path, for each node, set the node to visited, if it is the 
  animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        if (!node.isWeight) {
          document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited';
        }
        else {
          document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited node-weight';
        }

        // if (document.getElementById(`node-${node.row}-${node.col}`).className === 'node') {
        //   document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited';
        // }
        // if (document.getElementById(`node-${node.row}-${node.col}`).className === 'node node-finish') {
        //   document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited node-finish'
        // }




      }, 10 * i);
    }
  }

  visualise(algorithm) {
    if (!isAnimating) {
      isAnimating = true;
      const { grid } = this.state;
      // clearBoard(grid);
      var startNode = grid[START_NODE_ROW][START_NODE_COL];
      var finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
      if (algorithm === 'dijkstra') {
        visitedNodesInOrder = solveDijkstra(grid, startNode, finishNode);
        nodesInShortestPathOrder = getNodesInShortestPathOrderDijkstra(finishNode);
      } else if (algorithm === 'AStar') {
        visitedNodesInOrder = solveAStar(grid, startNode, finishNode);
        nodesInShortestPathOrder = getNodesInShortestPathOrderAStar(finishNode);
      } else if (algorithm === 'BFS') {
        visitedNodesInOrder = solveBFS(grid, startNode, finishNode);
        nodesInShortestPathOrder = getNodesInShortestPathOrderBFS(finishNode);
      } else if (algorithm === 'DFS') {
        visitedNodesInOrder = solveDFS(grid, startNode, finishNode);
        nodesInShortestPathOrder = getNodesInShortestPathOrderDFS(finishNode);
      }
      this.animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];

        if (document.getElementById(`node-${node.row}-${node.col}`).className === 'node node-visited') {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            'node node-shortest-path'
        }


        // document.getElementById(`node-${node.row}-${node.col}`).className =
        //   'node node-shortest-path';




      }, 20 * i);
    }
  }

  addWeights = (placingWeights) => {
    if (placingWeights.pop()) {
      placingWeights.push(false);
    } else {
      placingWeights.push(true);
    }

    console.log(placingWeights);
    console.log(placingWeights[0])
  }

  render() {
    const { grid, mouseIsPressed } = this.state;
    // HTML to render:
    return (
      <div>
        {/* button  to trigger visualise function */}
        <div class="full-panel">
          <div class="panel">
            <button onClick={() => this.visualise('dijkstra')} class="btn btn-primary"
              title="Dijkstra's algorithm is a weighted search algorithm which guarantees the shortest path between two nodes. Press the 'Deforest' button to 
              remove parts of the forest (essentially adding weights to the search algorithm). Dijkstra's algorithm is a good visual representation of 
              a forest-fire especially since deforested nodes (weights) can slow down the spread of fire.">
              Dijkstra's Algorithm
            </button>
          </div>
          <div class="panel">
            <button onClick={() => this.visualise('AStar')} class="btn btn-warning" title="A* Search is a weighted search algorithm which guarantees the shortest path between two nodes. A* is a version of Dijkstra's 
            algorithm, but with a heuristic that moves in the direction of the finish node. Press the 'Deforest' button to 
              remove parts of the forest (essentially adding weights to the search algorithm).">
              A* Search
            </button>
          </div>
          <div class="panel">
            <button onClick={() => this.visualise('BFS')} class="btn btn-danger" title="Breadth-first-search is an unweighted search algorithm, it will therefore ignore
            any deforested nodes placed on the map. It guarantees the shortest path between two points and is a good model for the spread of fire.">
              Breadth-first search
            </button>
          </div>
          <div class="panel">
            <button onClick={() => this.visualise('DFS')} class="btn btn-info" title="Depth-first-search is an unweighted search algorithm, it will therefore ignore
            any deforested nodes placed on the map. It does not guarantee the shortest path between two points and is not analagous to the spread of fire.">
              Depth-first search
            </button>
          </div>
          <div class="panel">
            <button onClick={() => this.addWeights(placingWeights)} class="btn btn-success" title="The deforest button can be toggled on and off. When toggle on it allows you to place
            weighted nodes which are analgous to deforesting the map. When toggled off, it allows you to place wall nodes. Have a go!">
              Deforest
            </button>
          </div>
          <div class="panel">
            <button onClick={() => { window.location.reload() }} class="btn btn-light" title="Resets the board entirely.">
              Reset Board
            </button>
          </div>
          <div class="panel">
            <button onClick={() => overlayOn()} class="btn btn-default" title="Open the information window.">
              Info
            </button>
          </div>
        </div>



        {/* OVERLAY */}
        <div id="overlay">
          <div id="navigator">
            <div>
              <h1>Hello! Welcome to Kevin Cai's Forest Fire Simulator!</h1>
              <p>
                This simulator uses different Pathfinding Algorithms including: Dijkstra's algorithm, A* Search, Breadth-first-search and Depth-first-search. Each with varying levels of
                accuracy at simulating forest fires. I shall walk you through the functionality of this web application.
            </p>
            </div>
            <div>
              <h1>What is a Pathfinding Algorithm?</h1>
              <p>
                A pathfinding algorithm seeks to find the shortest path between two points, this application aims to visualise different algorithms and apply them
                towards simulating the spread of fire within a forest. These algorithms have been applied to a 2 dimensional grid.
              </p>
            </div>


            <div>
              <h1>Different Nodes:</h1>
              <div>
                <img src="https://i.pinimg.com/originals/af/ab/26/afab26f2c1d6ef0cd3402dd5ef77e2de.jpg" alt="Flame"></img>
                <p class="p-node">This is the <strong>Start Node</strong>, where the fire will start. Click and drag it to move its position.</p>
              </div>
              <div>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Checkerboard_pattern.svg/1024px-Checkerboard_pattern.svg.png" alt="Checkerboard"></img>
                <p class="p-node">This is the <strong>Finish Node</strong>, where the simulation will end. Click and drag it to move its position.</p>
              </div>
              <div>
                <img src="https://www.htmlcsscolor.com/preview/gallery/008000.png" alt="Green Square"></img>
                <p class="p-node">This is a <strong>Tree Node</strong>, these nodes can be burned down and allow the spread of fire.</p>
              </div>
              <div>
                <img src="https://lh3.googleusercontent.com/PGDDIlrdxLg8-6jGX-O_fw2xcV6fO1PcRcm1cbxMrmtrUODDtkZC9Hl05G2KAAkbcub39SUinulK6NKZmnN9=s400" alt="Clay Brick Square"></img>
                <p class="p-node">This is a <strong>Wall Node</strong>, fire cannot pass through this node. Click and drag on the map to create walls!</p>
              </div>
              <div>
                <img src="https://www.jordanreflectors.co.uk/wp-content/uploads/2016/05/Opallite-Recessed-LED-Luminaires-black-border-670px.jpg" alt="White Square"></img>
                <p class="p-node">This is a <strong>Deforested/Weighted Node</strong>, this increases the difficulty for the fire to spread (affects weighted algorithms - Dijkstra's algorithm and A* Search). Click the "Deforest" button to toggle on deforestation - then click and drag on the map to deforest.</p>
              </div>
              <div>
                <img src="https://i.pinimg.com/originals/b6/e1/44/b6e14486d7b5930471fabad8aa2cab19.jpg" alt="Yellow Brick Square"></img>
                <p class="p-node">This is a <strong>Shortest-path Node</strong>, which maps out the shortest path between the Start Node and the Finish Node. Follow the yellow brick road! (Note: for Depth-first-search, this path is certainly not the shortest path!)</p>
              </div>
            </div>

            <div>
              <h1>Search algorithms:</h1>
              <ul>
                <li><strong>Dijkstra's Algorithm:</strong> a weighted search algorithm which guarantees the shortest path between two nodes. Dijkstra's algorithm is a good visual representation of
              a forest-fire especially since deforested nodes (weights) can slow down the spread of fire.</li>
                <li><strong>A* Search:</strong> a weighted search algorithm which guarantees the shortest path between two nodes. A* is a version of Dijkstra's
                algorithm, but with a heuristic that moves in the direction of the finish node. A* Search is a poor visual representation of
                the spread of fire, however, has other fascinating use cases - it is the algorithm Google use for Google Maps! </li>
                <li><strong>Breadth-first-search:</strong> an unweighted search algorithm, it will therefore ignore
            any deforested nodes placed on the map. It does not guarantee the shortest path between two points and follows a similar path as the spread of fire, however, it ignores any deforestation. A common application of this search algorithm is in Peer to Peer networks to
            find neighbouring nodes.</li>
                <li><strong>Depth-first-search:</strong> an unweighted search algorithm, it will therefore ignore
            any deforested nodes placed on the map. It does not guarantee the shortest path between two points and is not analagous to the spread of fire.
            Depth first search can be used to solve puzzles with only one solution, e.g. solve a maze.</li>
              </ul>
            </div>


          </div>
          <button onClick={() => overlayOff()} class="btn btn-default" id="overlay-button">
            Hide Window
            </button>


        </div>



        {/* Display grid of nodes */}
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const { row, col, isFinish, isStart, isWall, isWeight, isVisited, isVisitedWeight, } = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      isWeight={isWeight}
                      isVisited={isVisited}
                      isVisitedWeight={isVisitedWeight}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                      row={row}></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

// creates an initial 20 x 50 grid using a nested for loop
const getInitialGrid = () => {
  let grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

// creates a node, using column and row positions
const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    // isVisited2: false,
    isWall: false,
    // isShortest: false,
    previousNode: null,
    isWeight: false,
    // src: 0,
  };
};

// newGrid is a copy of grid, changes the node and updates grid
const augmentGrid = (grid, row, col) => {

  const newGrid = grid.slice();
  const node = newGrid[row][col];
  var newNode = newGrid[row][col];
  if (!node.isFinish && !node.isStart && !holdingFinish && !placingWeights[0] && !holdingStart && !holdingFinish) {
    console.log("WALLS")
    newNode = {
      ...node,
      isWall: !node.isWall,
    }
  }

  //CORRECTLY TOGGLES PLACING WEIGHTS
  // CONDITIONAL WORKING, NOW WE NEED TO MAKE IT TURN NODE INTO WEIGHT

  else if (placingWeights[0]) {
    console.log("WEIGHTS")
    newNode = {
      ...node,
      isWeight: true,
    }
  }

  //MOVE FINISH NODE
  else if (newGrid[row][col].row === FINISH_NODE_ROW && newGrid[row][col].col === FINISH_NODE_COL) {
    holdingFinish = true;
  }
  else if (holdingFinish) {
    console.log("FINISH")
    newNode = {
      ...node,
      isFinish: true,
    }
    FINISH_NODE_ROW = newGrid[row][col].row;
    FINISH_NODE_COL = newGrid[row][col].col;

    for (var i = 0; i < 20; i++) {
      for (var j = 0; j < 50; j++) {
        if (newGrid[i][j].isFinish) {
          document.getElementById(`node-${i}-${j}`).className = "node";
        }
      }
    }
  }

  //MOVE START NODE
  else if (newGrid[row][col].isStart) {
    holdingStart = true;
  }
  else if (holdingStart) {
    console.log("START")
    newNode = {
      ...node,
      isStart: true,
    }
    START_NODE_ROW = newGrid[row][col].row;
    START_NODE_COL = newGrid[row][col].col;

    for (var k = 0; k < 20; k++) {
      for (var l = 0; l < 50; l++) {
        if (newGrid[k][l].isStart) {
          document.getElementById(`node-${k}-${l}`).className = "node";
        }
      }
    }
  }
  newGrid[row][col] = newNode;
  return newGrid;
};

function overlayOn() {
  document.getElementById("overlay").style.display = "block";
}

function overlayOff() {
  document.getElementById("overlay").style.display = "none";
}

// //CLEAR BOARD WHEN NEW ALGO CALLED
// function clearBoard(grid) {
//   for (var k = 0; k < 20; k++) {
//     for (var l = 0; l < 50; l++) {
//       // reset all nodes that arent finish node, start node, wall or weights back to a normal node
//       // !(((grid[k][l].row === FINISH_NODE_ROW)) && ((grid[k][l].col === FINISH_NODE_COL))) && !grid[k][l].isWall && !grid[k][l].isWeight

//       // FOR ALL NODES
//       // if node is visited and isn't start or finish node
//       if (((document.getElementById(`node-${k}-${l}`).className === "node node-visited") && (!(((grid[k][l].row === FINISH_NODE_ROW)) && ((grid[k][l].col === FINISH_NODE_COL))))) || (document.getElementById(`node-${k}-${l}`).className === "node node-shortest-path")) {
//         document.getElementById(`node-${k}-${l}`).className = "node";
//       }
//       if ((grid[k][l].row === FINISH_NODE_ROW) && (grid[k][l].col === FINISH_NODE_COL)) {
//         document.getElementById(`node-${k}-${l}`).className = "node node-finish";
//       }
//       if ((grid[k][l].row === START_NODE_ROW) && (grid[k][l].col === START_NODE_COL)) {
//         document.getElementById(`node-${k}-${l}`).className = "node node-start";
//       }
//       if ((grid[k][l].isWeight)) {
//         document.getElementById(`node-${k}-${l}`).className = "node node-weight";
//       }
//     }
//   }
// }

// function refreshTextures(grid) {
//   for (var k = 0; k < 20; k++) {
//     for (var l = 0; l < 50; l++) {
//       if ((grid[k][l].row === FINISH_NODE_ROW) && (grid[k][l].col === FINISH_NODE_COL)) {
//         document.getElementById(`node-${k}-${l}`).className = "node node-finish";
//       }
//       if ((grid[k][l].row === START_NODE_ROW) && (grid[k][l].col === START_NODE_COL)) {
//         document.getElementById(`node-${k}-${l}`).className = "node node-start";
//       }
//       if ((grid[k][l].isWeight)) {
//         document.getElementById(`node-${k}-${l}`).className = "node node-weight";
//       }
//     }
//   }
// }

// function getCookieVal(offset) {
//   var endstr = document.cookie.indexOf(";", offset);
//   if (endstr == -1)
//     endstr = document.cookie.length;
//   return unescape(document.cookie.substring(offset, endstr));
// }
// function GetCookie(name) {
//   var arg = name + "=";
//   var alen = arg.length;
//   var clen = document.cookie.length;
//   var i = 0;
//   while (i < clen) {
//     var j = i + alen;
//     if (document.cookie.substring(i, j) == arg)
//       return getCookieVal(j);
//     i = document.cookie.indexOf(" ", i) + 1;
//     if (i == 0)
//       break;
//   }
//   return null;
// }
// function SetCookie(name, value) {
//   var argv = SetCookie.arguments;
//   var argc = SetCookie.arguments.length;
//   var expires = (2 < argc) ? argv[2] : null;
//   var path = (3 < argc) ? argv[3] : null;
//   var domain = (4 < argc) ? argv[4] : null;
//   var secure = (5 < argc) ? argv[5] : false;
//   document.cookie = name + "=" + escape(value) +
//     ((expires == null) ? "" : ("; expires=" + expires.toGMTString())) +
//     ((path == null) ? "" : ("; path=" + path)) +
//     ((domain == null) ? "" : ("; domain=" + domain)) +
//     ((secure == true) ? "; secure" : "");
// }
// function DisplayInfo() {
//   var expdate = new Date();
//   var visit;
//   expdate.setTime(expdate.getTime() + (24 * 60 * 60 * 1000 * 365));
//   if (!(visit = GetCookie("visit")))
//     visit = 0;
//   visit++;
//   SetCookie("visit", visit, expdate, "/", null, false);
//   var message;
//   if (visit == 1)
//     message = "         Welcome to my page!";
//   if (visit == 2)
//     message = "           I see you came back !";
//   if (visit == 3)
//     message = "               Oh, it's you again!";
//   if (visit == 4)
//     message = "            You must be curious!";
//   if (visit == 5)
//     message = "      You're practically a regular!";
//   if (visit == 6)
//     message = "              You need a hobby!";
//   if (visit == 7)
//     message = "             Nothing better to do?";
//   if (visit == 8)
//     message = "            Don't you ever sleep?";
//   if (visit == 9)
//     message = "                      Get a life!!!";
//   if (visit >= 10)
//     message = "  Rent is due on the 1st of the month!";
//   alert("\n" + "Your browser has visited this page               \n"
//     + "                              " + visit + "\n"
//     + "                          time(s)." + "\n" + "\n"
//     + message);
// }