import React, { Component } from 'react';

import PlaySpace from './playspace'
import TileInformation from './tileinformation'
import PlayerControls from './playercontrols'

import UnitInformation from '../data/unitinformation'


export default class Gameboard extends Component {

  constructor(){
    super()

    this.state = {
      boardRows: 5,
      boardColumns: 15,
      currentPlayer: 1,
      playerOneInformation: {
        resources: 6
      },
      playerTwoInformation: {
        resources: 6
      },
      boardState: [],
      selectedTileRow: 0,
      selectedTileCol: 0,
      unitToPlace: '',
    }
    this.setBoardState = this.setBoardState.bind(this)
    this.updateSectionValue = this.updateSectionValue.bind(this)
    this.handleControls = this.handleControls.bind(this)
    this.handleEndTurn = this.handleEndTurn.bind(this)
    this.selectTile = this.selectTile.bind(this)
    this.checkEnoughResources = this.checkEnoughResources.bind(this)
    this.handleActionChoice = this.handleActionChoice.bind(this)

  }
  componentWillMount(){
    this.setBoardState()
  }
  setBoardState(){
    let tempArray = []
    for(let i=0;i<this.state.boardRows; i++){
      let tempInsideArray = []
      for(let i=0;i<this.state.boardColumns; i++){
        tempInsideArray.push({
          controllingPlayer: '',
          unitInfo: {},
          inRange: false,
          action: ''
        })
      }
      tempArray.push(tempInsideArray)
    }
    this.setState({
      boardState: tempArray
    })
  }
  //For when a button is pressed to set the unit to be placed by a player
  handleControls(unit){
    this.setState({
      unitToPlace: unit
    })
  }
  //For when the end turn button is pressed.
  handleEndTurn(){
    let changePlayer = this.state.currentPlayer === 1 ? 2 : 1
    let addResource = changePlayer === 1 ? this.state.playerOneInformation.resources + 2 : this.state.playerTwoInformation.resources + 2
    if(changePlayer === 1){
      this.setState({
        currentPlayer: changePlayer,
        playerOneInformation: {resources: addResource}
      })
    } else {
      this.setState({
        currentPlayer: changePlayer,
        playerTwoInformation: {resources: addResource}
      })
    }
  }
  handleActionChoice(value){
    if(this.state.action === value){
      this.setState({
        action: ''
      })
    } else {
      this.setState({
        action: value
      })
    }
  }


  //When clicking a tile, shows information first click, second click will place units if possible.
  selectTile(curRow, curCol){
    let arrayRow = curRow - 1
    let arrayCol = curCol - 1
    let tempBoardState = this.state.boardState
    if(this.state.action === 'move'){
      //moveUnitAction()
    }
    if(this.state.selectedTileRow !== 0 && this.state.selectedTileCol !== 0){
      tempBoardState[parseInt(this.state.selectedTileRow, 10) - 1][parseInt(this.state.selectedTileCol, 10) - 1].selected = false
    }
    tempBoardState[arrayRow][arrayCol].selected = true
    // remove range indicators from previous unit selections
    for(let i = 0; i < this.state.boardRows; i++){
      for(let j = 0; j < this.state.boardColumns; j++){
        tempBoardState[i][j].inRange = false
      }
    }
    if(this.state.selectedTileRow === curRow && this.state.selectedTileCol === curCol && this.state.unitToPlace !== '' && tempBoardState[arrayRow][arrayCol].controllingPlayer === ''){
      this.updateSectionValue(curRow, curCol)
    } else {
      if(tempBoardState[arrayRow][arrayCol].unitInfo.name){
        tempBoardState = this.attackRangeHighlight(arrayRow, arrayCol, tempBoardState)
      }
    }
    this.setState({
      selectedTileRow: curRow,
      selectedTileCol: curCol,
      boardState: tempBoardState
    })
  }

  moveUnitAction(){
    //Needs to check if unit is selected and the move action has been chosen, then if a space within move range is selected after that.
    //if(unit selected is controlled by current player and move action has been chosen and a space within range is selected){
      //move tile information to selected space
    //}
  }

  attackRangeHighlight(arrRow, arrCol, boardState){
    let unitRange = UnitInformation[boardState[arrRow][arrCol].unitInfo.name].range
    console.log('start!')
    for(var i=1; i<=unitRange; i++){
      if(typeof boardState[arrRow + i] !== 'undefined'){
        boardState[arrRow + i][arrCol].inRange = true
      }
      if(typeof boardState[arrRow][arrCol + i] !== 'undefined'){
        boardState[arrRow][arrCol + i].inRange = true
      }
      if(typeof boardState[arrRow - i] !== 'undefined'){
        boardState[arrRow - i][arrCol].inRange = true
      }
      if(typeof boardState[arrRow][arrCol - i] !== 'undefined'){
        boardState[arrRow][arrCol - i].inRange = true
      }
      if(unitRange >= 2 && i !== unitRange){
        if(typeof boardState[arrRow + i] !== 'undefined' && typeof boardState[arrRow + i][arrCol + i] !== 'undefined'){
          boardState[arrRow + i][arrCol + i].inRange = true
        }
        if(typeof boardState[arrRow - i] !== 'undefined' && typeof boardState[arrRow - i][arrCol - i] !== 'undefined'){
          boardState[arrRow - i][arrCol - i].inRange = true
        }
        if(typeof boardState[arrRow - i] !== 'undefined' && typeof boardState[arrRow - i][arrCol + i] !== 'undefined'){
          boardState[arrRow - i][arrCol + i].inRange = true
        }
        if(typeof boardState[arrRow + i] !== 'undefined' && typeof boardState[arrRow + i][arrCol - i] !== 'undefined'){
          boardState[arrRow + i][arrCol - i].inRange = true
        }
      }
    }
    return boardState
  }

  updateSectionValue(curRow, curCol){
    let tempBoardState = this.state.boardState
    let arrayRow = curRow - 1
    let arrayCol = curCol - 1
    let resourceChange = UnitInformation[this.state.unitToPlace].cost
    if(this.checkEnoughResources(this.state.currentPlayer, this.state.unitToPlace)){
      tempBoardState[arrayRow][arrayCol].unitName = this.state.unitToPlace
      tempBoardState[arrayRow][arrayCol].unitInfo = UnitInformation[this.state.unitToPlace]
      tempBoardState[arrayRow][arrayCol].controllingPlayer = this.state.currentPlayer
      tempBoardState[arrayRow][arrayCol].unitImage = UnitInformation[this.state.unitToPlace].image
      let playerInformation = this.state.currentPlayer === 1 ? 'playerOneInformation' : 'playerTwoInformation'
      let updateResource = this.state[playerInformation].resources - resourceChange
      let updatePlayerInformation = this.state[playerInformation]
      updatePlayerInformation.resources = updateResource
      let obj = {}
      obj[playerInformation] = updatePlayerInformation
      this.setState(obj)
    }
  }
  checkEnoughResources(curPlayer, unit){
    let playerInformation = curPlayer === 1 ? 'playerOneInformation' : 'playerTwoInformation'
    if(this.state[playerInformation].resources >= UnitInformation[this.state.unitToPlace].cost){
      return true
    } else {
      return false
    }
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
          handleClick={this.selectTile}
        />
        <div className='playerControls'>
          <PlayerControls
            handleClick={this.handleControls}
            handleEndTurn={this.handleEndTurn}
            handleAction={this.handleActionChoice}
            currentAction={this.state.action}
            playerOneResource={this.state.playerOneInformation.resources}
            playerTwoResource={this.state.playerTwoInformation.resources}
          /><br/>
          <TileInformation
            information={information}
            currentPlayer={this.state.currentPlayer}
          />
        </div>
      </div>
    )
  }
}
