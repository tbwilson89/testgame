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
      selectedTileRow: 1,
      selectedTileCol: 1,
      lastUnitSelected: {},
      unitToPlace: '',
      activeUnitLocation: {
        row: '',
        col: ''
      }
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
    this.clearHighlight()
    this.setState({
      unitToPlace: unit
    })
  }
  //For when the end turn button is pressed.
  handleEndTurn(){
    let changePlayer = this.state.currentPlayer === 1 ? 2 : 1
    let addResource = changePlayer === 1 ? this.state.playerOneInformation.resources + 2 : this.state.playerTwoInformation.resources + 2
    this.clearHighlight()
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
    this.clearHighlight()
    let tempBoardState = this.state.boardState
    if(this.state.action === value){
      this.setState({
        action: 'test'
      })
    } else {
      let currentRow = this.state.selectedTileRow
      let currentCol = this.state.selectedTileCol
      if(value === 'move'){
        this.highlightMoveRange(currentRow, currentCol, tempBoardState)
      } else if(value === 'attack'){
        this.highlightAttackRange(currentRow, currentCol, tempBoardState)
      }
      console.log(tempBoardState[currentRow - 1][currentCol - 1].canMove)
      this.setState({
        boardState: tempBoardState,
        action: value,
        unitToPlace: '',
        activeUnitLocation: {
          row: currentRow,
          col: currentCol
        }
      })
    }
  }

  clearHighlight(){
    let tempBoardState = this.state.boardState
    for(let i = 0; i < this.state.boardRows; i++){
      for(let j = 0; j < this.state.boardColumns; j++){
        tempBoardState[i][j].inRange = false
        tempBoardState[i][j].canMove = false
      }
    }
    this.setState({
      boardState: tempBoardState,
      action: ''
    })
  }

  //When clicking a tile, shows information first click, second click will place units if possible.
  selectTile(curRow, curCol){
    let tempBoardState = this.state.boardState
    let prevRow = this.state.selectedTileRow
    let prevCol = this.state.selectedTileCol
    let sameTileClicked = curRow === this.state.selectedTileRow && curCol === this.state.selectedTileCol ? true : false
    let clickActiveUnit = curRow === this.state.activeUnitLocation.row && curCol === this.state.activeUnitLocation.col ? true : false

    if(tempBoardState[curRow][curCol].canMove === true || tempBoardState[curRow][curCol].inRange === true){

    } else {
      tempBoardState[prevRow][prevCol].selected = false
      tempBoardState[curRow][curCol].selected = true
    }

    if(sameTileClicked){
      if(this.state.action === 'move' && !clickActiveUnit){
        tempBoardState[this.state.activeUnitLocation.row][this.state.activeUnitLocation.col].unitInfo.actions -= 1
        tempBoardState[curRow][curCol] = tempBoardState[this.state.activeUnitLocation.row][this.state.activeUnitLocation.col]
        tempBoardState[this.state.activeUnitLocation.row][this.state.activeUnitLocation.col] = {
          controllingPlayer: '',
          unitInfo: {},
          inRange: false,
        }
        this.clearHighlight()
      } else if(this.state.action === 'attack'){
        //THIS IS WHERE I'M WORKING?!?!?
        tempBoardState[this.state.activeUnitLocation.row][this.state.activeUnitLocation.col].unitInfo.health -= tempBoardState[curRow][curCol].unitInfo.power
        tempBoardState[curRow][curCol].unitInfo.health -= tempBoardState[this.state.activeUnitLocation.row][this.state.activeUnitLocation.col].unitInfo.power
      } else if(tempBoardState[curRow][curCol].unitInfo.name === undefined && this.state.unitToPlace !== '' && tempBoardState[curRow][curCol].controllingPlayer === ''){
        this.updateSectionValue(curRow, curCol)
      }
    } else {
      if(this.state.action === 'move' && tempBoardState[curRow][curCol].canMove === true){
        //move code
        console.log('This is a movable spot! Click again to move unit!')
      } else if (this.state.action === 'attack' && tempBoardState[curRow][curCol].inRange === true){
        //attack code
        console.log('This is in range to attack! Click again to declare attack!')
      } else if(curRow !== this.state.lastUnitSelected.row && curCol !== this.state.lastUnitSelected.col && !clickActiveUnit){
        this.clearHighlight()
        this.setState({
          action: ''
        })
      }
    }
    this.setState({
      selectedTileRow: curRow,
      selectedTileCol: curCol,
      boardState: tempBoardState,
    })
  }

  highlightMoveRange(arrRow, arrCol, boardState){
    let moveRange = UnitInformation[boardState[arrRow][arrCol].unitInfo.name].movement
    let prevHighlights = [[arrRow, arrCol]]
    for(let j=0;j<moveRange;j++){
      let newPrevHighlights = []
      for(let i=0;i<prevHighlights.length;i++){
        let prevRow = prevHighlights[i][0]
        let prevCol = prevHighlights[i][1]
        if(typeof boardState[prevRow + 1] !== 'undefined'){
          if(boardState[prevRow + 1][prevCol].controllingPlayer === ''){
            boardState[prevRow + 1][prevCol].canMove = true
            newPrevHighlights.push([prevHighlights[i][0] + 1, prevCol])
          } else if(boardState[prevRow + 1][prevCol].controllingPlayer === this.state.currentPlayer){
            newPrevHighlights.push([prevHighlights[i][0] + 1, prevCol])
          }
        }
        if(typeof boardState[prevRow][prevCol + 1] !== 'undefined'){
          if(boardState[prevRow][prevCol + 1].controllingPlayer === ''){
            boardState[prevRow][prevCol + 1].canMove = true
            newPrevHighlights.push([prevRow, prevCol + 1])
          } else if(boardState[prevRow][prevCol + 1].controllingPlayer === this.state.currentPlayer){
            newPrevHighlights.push([prevRow, prevCol + 1])
          }
        }
        if(typeof boardState[prevRow - 1] !== 'undefined'){
          if(boardState[prevRow - 1][prevCol].controllingPlayer === ''){
            boardState[prevRow - 1][prevCol].canMove = true
            newPrevHighlights.push([prevRow - 1, prevCol])
          } else if(boardState[prevRow - 1][prevCol].controllingPlayer === this.state.currentPlayer){
            newPrevHighlights.push([prevRow - 1, prevCol])
          }
        }
        if(typeof boardState[prevRow][prevCol - 1] !== 'undefined'){
          if(boardState[prevRow][prevCol - 1].controllingPlayer === ''){
            boardState[prevRow][prevCol - 1].canMove = true
            newPrevHighlights.push([prevRow, prevCol - 1])
          } else if(boardState[prevRow][prevCol - 1].controllingPlayer === this.state.currentPlayer){
            newPrevHighlights.push([prevRow, prevCol - 1])
          }
        }
      }
      prevHighlights = newPrevHighlights
    }
  }

  highlightAttackRange(arrRow, arrCol, boardState){
    let attackRange = UnitInformation[boardState[arrRow][arrCol].unitInfo.name].range
    let prevHighlights = [[arrRow, arrCol]]
    for(let j=0;j<attackRange;j++){
      let newPrevHighlights = []
      for(let i=0;i<prevHighlights.length;i++){
        let prevRow = prevHighlights[i][0]
        let prevCol = prevHighlights[i][1]
        if(typeof boardState[prevRow + 1] !== 'undefined'){
          boardState[prevRow + 1][prevCol].inRange = true
          newPrevHighlights.push([prevHighlights[i][0] + 1, prevCol])
        }
        if(typeof boardState[prevRow][prevCol + 1] !== 'undefined'){
          boardState[prevRow][prevCol + 1].inRange = true
          newPrevHighlights.push([prevRow, prevCol + 1])
        }
        if(typeof boardState[prevRow - 1] !== 'undefined'){
          boardState[prevRow - 1][prevCol].inRange = true
          newPrevHighlights.push([prevRow - 1, prevCol])
        }
        if(typeof boardState[prevRow][prevCol - 1] !== 'undefined'){
          boardState[prevRow][prevCol - 1].inRange = true
          newPrevHighlights.push([prevRow, prevCol - 1])
        }
      }
      prevHighlights = newPrevHighlights
    }
  }

  updateSectionValue(curRow, curCol){
    let tempBoardState = this.state.boardState
    let resourceChange = UnitInformation[this.state.unitToPlace].cost
    let testCopyObj = {...UnitInformation[this.state.unitToPlace]}
    console.log(testCopyObj)
    if(this.checkEnoughResources(this.state.currentPlayer, this.state.unitToPlace)){
      tempBoardState[curRow][curCol].unitName = this.state.unitToPlace
      tempBoardState[curRow][curCol].unitInfo = {...UnitInformation[this.state.unitToPlace]}
      tempBoardState[curRow][curCol].controllingPlayer = this.state.currentPlayer
      let playerInformation = this.state.currentPlayer === 1 ? 'playerOneInformation' : 'playerTwoInformation'
      let updateResource = this.state[playerInformation].resources - resourceChange
      let updatePlayerInformation = this.state[playerInformation]
      updatePlayerInformation.resources = updateResource
      let obj = {}
      obj[playerInformation] = updatePlayerInformation
      this.setState(obj)
      this.setState({
        unitToPlace: ''
      })
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
    let row = parseInt(this.state.selectedTileRow, 10) >= 0 ? parseInt(this.state.selectedTileRow, 10) : 0
    let col = parseInt(this.state.selectedTileCol, 10) >= 0 ? parseInt(this.state.selectedTileCol, 10) : 0
    let information = this.state.boardState[row][col]

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
            playerOneResource={this.state.playerOneInformation.resources}
            playerTwoResource={this.state.playerTwoInformation.resources}
          /><br/>
          <TileInformation
            information={information}
            currentPlayer={this.state.currentPlayer}
            handleAction={this.handleActionChoice}
            currentAction={this.state.action}
          />
        </div>
      </div>
    )
  }
}
