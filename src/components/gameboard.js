import React, { Component } from 'react';

import BoardRow from './boardRow'
import TileInformation from './tileinformation'

export default class Gameboard extends Component {

  constructor(){
    super()

    this.state = {
      boardRows: 15,
      boardColumns: 15,
      boardState: [],
      selectedTileRow: 0,
      selectedTileCol: 0,
      tileInformation: [],
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
        tempInsideArray.push([])
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
    tempBoardState[curRow - 1][curCol - 1].unitName = 'Test Unit 01'

    //Create array of tile object to display
    let tempTileInformation = []
    tempTileInformation.push(tempBoardState[curRow - 1][curCol - 1])
    console.log(tempTileInformation)

    this.setState({
      boardState: tempBoardState,
      selectedTileRow: curRow,
      selectedTileCol: curCol
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

    let row = parseInt(this.state.selectedTileRow, 10) - 1 >= 0 ? parseInt(this.state.selectedTileRow, 10) - 1 : 0
    let col = parseInt(this.state.selectedTileCol, 10) - 1 >= 0 ? parseInt(this.state.selectedTileCol, 10) - 1 : 0
    console.log(this.state.boardState)
    console.log(this.state.boardState[row][col])
    let information
    if (this.state.boardState[row][col]){
      console.log('test')
      information = this.state.boardState[row][col]
    } else {
      information = "Please Select a Tile"
    }
    console.log(information)

    return(
      <div className='gameBoard'>
        {currentGameBoard}
        <TileInformation information={information}/>
      </div>
    )
  }
}
