import React, { Component } from 'react';

import BoardRow from './boardRow'

export default class Gameboard extends Component {

  constructor(){
    super()

    this.state = {
      boardRows: 15,
      boardColumns: 15,
      boardState: [],
      testValue: ''
    }
    this.setBoardState = this.setBoardState.bind(this)
    this.updateSectionValue = this.updateSectionValue.bind(this)
  }
  componentWillMount(){
    this.setBoardState()
  }

  setBoardState(){
    let tempArray = []
    for(let i=0;i<this.state.boardRows; i++){
      let tempInsideArray = []
      for(let i=0;i<this.state.boardColumns; i++){
        tempInsideArray.push({})
      }
      tempArray.push(tempInsideArray)
    }
    this.setState({
      boardState: tempArray
    })
  }

  updateSectionValue(curRow, curCol){
    let tempBoardState = this.state.boardState
    console.log(curRow, curCol)
    tempBoardState[curRow - 1][curCol - 1].spaceValue = 'X'
    this.setState({
      boardState: tempBoardState
    })
    console.log(this.state.boardState[curRow - 1][curCol - 1])
  }

  render(){
    let currentGameBoard = []
    let currentRow = 1
    while(currentRow <= this.state.boardRows){
      currentGameBoard.push(
        <BoardRow
          key={currentRow}
          currentRow={currentRow}
          rowSize={this.state.boardColumns}
          currentRowValues={this.state.boardState[currentRow-1]}
          onClick={this.updateSectionValue}
        />
      )
      currentRow++
    }
    return(
      <div className='gameBoard'>
        {currentGameBoard}
      </div>
    )
  }
}
