import React, { Component } from 'react';

import PlaySpace from './playspace'
import TileInformation from './tileinformation'
import PlayerControls from './playercontrols'

import UnitInformation from '../data/unitinformation'

import warriorImage from '../images/warrior.png'
import mageImage from '../images/mage.png'


export default class Gameboard extends Component {

  constructor(){
    super()

    this.state = {
      boardRows: 5,
      boardColumns: 15,
      currentPlayer: 1,
      playerOneInformation: {
        resources: 1
      },
      playerTwoInformation: {
        resources: 1
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
  }
  componentWillMount(){
    this.setBoardState()
  }
  setBoardState(){
    let tempArray = []
    for(let i=0;i<this.state.boardRows; i++){
      let tempInsideArray = []
      for(let i=0;i<this.state.boardColumns; i++){
        tempInsideArray.push({controllingPlayer: ''})
      }
      tempArray.push(tempInsideArray)
    }
    this.setState({
      boardState: tempArray
    })
  }

  handleControls(unit){
    console.log(<UnitInformation unit={this.state.unitToPlace}/>)
    this.setState({
      unitToPlace: unit
    })
  }
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

  selectTile(curRow, curCol){
    let arrayRow = curRow - 1
    let arrayCol = curCol - 1
    let tempBoardState = this.state.boardState
    if(this.state.selectedTileRow !== 0 && this.state.selectedTileCol !== 0){
      tempBoardState[parseInt(this.state.selectedTileRow, 10) - 1][parseInt(this.state.selectedTileCol, 10) - 1].selected = false
    }
    tempBoardState[arrayRow][arrayCol].selected = true
    if(this.state.selectedTileRow === curRow && this.state.selectedTileCol === curCol && this.state.unitToPlace !== '' && tempBoardState[arrayRow][arrayCol].controllingPlayer === ''){
      this.updateSectionValue(curRow, curCol)
    } else {
      this.setState({
        selectedTileRow: curRow,
        selectedTileCol: curCol
      })
    }
  }

  checkEnoughResources(curPlayer, unit){
    if(curPlayer === 1){
      
    }
  }
  updateSectionValue(curRow, curCol){
    let tempBoardState = this.state.boardState
    let arrayRow = curRow - 1
    let arrayCol = curCol - 1
    let resourceChange = 0
    if(this.checkEnoughResources(this.state.currentPlayer, this.state.unitToPlace)){

    }
    tempBoardState[arrayRow][arrayCol].unitName = this.state.unitToPlace
    tempBoardState[arrayRow][arrayCol].controllingPlayer = this.state.currentPlayer
    switch(this.state.unitToPlace){
      case 'Warrior':
      resourceChange = 2
      tempBoardState[arrayRow][arrayCol].unitImage = warriorImage
      break;
      case 'Mage':
      resourceChange = 3
      tempBoardState[arrayRow][arrayCol].unitImage = mageImage
      break;
      default:
      break;
    }
    if(this.state.currentPlayer === 1){
      let updateResource = this.state.playerOneInformation.resources - resourceChange
      let updatePlayerInformation = this.state.playerOneInformation
      updatePlayerInformation.resources = updateResource
      this.setState({
        playerOneInformation: updatePlayerInformation
      })
    } else {
      let updateResource = this.state.playerTwoInformation.resources - resourceChange
      let updatePlayerInformation = this.state.playerTwoInformation
      updatePlayerInformation.resources = updateResource
      this.setState({
        playerTwoInformation: updatePlayerInformation
      })
    }


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

    this.setState({
      boardState: tempBoardState,
      selectedTileRow: curRow,
      selectedTileCol: curCol,
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
          handleClick={this.selectTile}
        />
        <div className='playerControls'>
          <TileInformation
            information={information}
            currentPlayer={this.state.currentPlayer}
          />
          <PlayerControls
            handleClick={this.handleControls}
            handleEndTurn={this.handleEndTurn}
            playerOneResource={this.state.playerOneInformation.resources}
            playerTwoResource={this.state.playerTwoInformation.resources}
          />
          <img src={warriorImage} alt='this'></img>
        </div>
      </div>
    )
  }
}
