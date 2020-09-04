import React, { Component } from 'react';

import './Node.css';

export default class Node extends Component {
  render() {
    const {
      row,
      col,
      isStart,
      isFinish,
      isWall,
      onMouseDown,
      onMouseEnter,
      onMouseUp,
      isWeight,
      isVisited,
      isVisitedWeight,
    } = this.props;
    const addedClassName =
      (isVisited && isWeight) ? 'node-visited node-weight'
        : isFinish ? 'node-finish'
          : isStart ? 'node-start'
            : isWall ? 'node-wall'
              : isWeight ? 'node-weight'
                : isVisited ? 'node-visited'
                  : '';

    return (
      <div
        id={`node-${row}-${col}`}
        className={`node ${addedClassName}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}></div>
    );
  }
}
