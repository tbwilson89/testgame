import React, { Component } from 'react';

import PlaySpace from './playspace'
import TileInformation from './tileinformation'
import PlayerControls from './playercontrols'

export default class Gameboard extends Component {

  constructor(){
    super()

    this.state = {
      boardRows: 10,
      boardColumns: 15,
      currentPlayer: 1,
      boardState: [],
      selectedTileRow: 0,
      selectedTileCol: 0,
      tileInformation: [],
      testValue: ''
    }
    this.setBoardState = this.setBoardState.bind(this)
    this.updateSectionValue = this.updateSectionValue.bind(this)
    this.handleControls = this.handleControls.bind(this)
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
  handleControls(unit){
    this.setState({
      unitToPlace: unit
    })
  }

  updateSectionValue(curRow, curCol){
    let tempBoardState = this.state.boardState
    tempBoardState[curRow - 1][curCol - 1].spaceValue = 'X'
    tempBoardState[curRow - 1][curCol - 1].unitName = this.state.unitToPlace

    //Highlight Selection on click
    if('row'+this.state.selectedTileRow !== 0 && this.state.selectedTileCol !== 0){
      document.getElementById('row'+this.state.selectedTileRow+'col'+this.state.selectedTileCol).style.boxShadow = '0px 0px 0px 0px'
    }
    switch(this.state.currentPlayer){
      case 1:
        document.getElementById('row'+curRow+'col'+curCol).style.boxShadow = '0 0 8px green'
        break;
      case 2:
        document.getElementById('row'+curRow+'col'+curCol).style.boxShadow = '0 0 8px red'
        break;
      default:
        document.getElementById('row'+curRow+'col'+curCol).style.boxShadow = '0 0 8px black'
        break;
    }

    let changePlayer = this.state.currentPlayer === 1 ? 2 : 1
    this.setState({
      boardState: tempBoardState,
      selectedTileRow: curRow,
      selectedTileCol: curCol,
      currentPlayer: changePlayer
    })
  }

  render(){
    let row = parseInt(this.state.selectedTileRow, 10) - 1 >= 0 ? parseInt(this.state.selectedTileRow, 10) - 1 : 0
    let col = parseInt(this.state.selectedTileCol, 10) - 1 >= 0 ? parseInt(this.state.selectedTileCol, 10) - 1 : 0
    let information
    information = this.state.boardState[row][col]

    return(
      <div className='gameBoard'>
        <PlaySpace
          boardRows={this.state.boardRows}
          boardColumns={this.state.boardColumns}
          boardState={this.state.boardState}
          handleClick={this.updateSectionValue}
        />
        <div className='playerControls'>
          <TileInformation information={information}/>
          <PlayerControls handleClick={this.handleControls} handleEndTurn={this.handleEndTurn}/>
          
        </div>
      </div>
    )
  }
}
