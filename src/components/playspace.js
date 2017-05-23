import React, { Component } from 'react';

import BoardRow from './boardRow'

export default class PlaySpace extends Component {
  render(){
    let currentGameBoard = []
    let currentRow = 1
    while(currentRow <= this.props.boardRows){
      currentGameBoard.push(
        <BoardRow
          key={currentRow}
          currentRow={currentRow}
          rowSize={this.props.boardColumns}
          currentRowValues={this.props.boardState[currentRow-1]}
          handleClick={this.props.handleClick}
        />
      )
      currentRow++
    }
    return(
      <div className='playSpace'>
        {currentGameBoard}
      </div>
    )
  }
}
