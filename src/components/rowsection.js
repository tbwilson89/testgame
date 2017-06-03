import React, { Component } from 'react';

export default class RowSection extends Component {
  render(){
    let tileSelected = this.props.currentValue.selected === true ? 'selectedTile' : ''
    let rangeIndicator = this.props.currentValue.inRange === true ? 'tileInRange' : this.props.currentValue.canMove === true ? 'canMoveTo' : ''
    let controlClass = this.props.currentValue.controllingPlayer === 1 ? 'playerOneControls' : this.props.currentValue.controllingPlayer === 2 ? 'playerTwoControls' : ''
    if(this.props.currentValue.controllingPlayer !== 1 && this.props.currentValue.controllingPlayer !== 2){
      return(
        <div id={'row'+this.props.curRow+'col'+this.props.curCol} className={'boardSection '+ tileSelected+' '+rangeIndicator} onClick={() => this.props.handleClick(this.props.curRow, this.props.curCol)}>

        </div>
      )
    } else {
      return(
        <div id={'row'+this.props.curRow+'col'+this.props.curCol} className={'boardSection '+tileSelected +' '+rangeIndicator+' '+ controlClass} onClick={() => this.props.handleClick(this.props.curRow, this.props.curCol)}>
          <img src={this.props.currentValue.unitInfo.image} alt='unit'></img>
          <span className='unitStats'>{this.props.currentValue.unitInfo.power +'/'+this.props.currentValue.unitInfo.health}</span>
        </div>
      )
    }
  }
}
