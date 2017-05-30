import React, { Component } from 'react';

export default class RowSection extends Component {
  render(){
    if(this.props.currentValue.controllingPlayer !== 1 && this.props.currentValue.controllingPlayer !== 2){
      let tileStyle = this.props.currentValue.selected === true ? 'selectedTile' : this.props.currentValue.inRange === true ? 'tileInRange' : ''
      let controlClass = this.props.currentValue.controllingPlayer === 1 ? 'playerOneControls' : this.props.currentValue.controllingPlayer === 2 ? 'playerTwoControls' : ''
      return(
        <div id={'row'+this.props.curRow+'col'+this.props.curCol} className={'boardSection '+ tileStyle +' '+ controlClass} onClick={() => this.props.handleClick(this.props.curRow, this.props.curCol)}>

        </div>
      )
    } else {
      return(
        <div id={'row'+this.props.curRow+'col'+this.props.curCol} className={'boardSection '} onClick={() => this.props.handleClick(this.props.curRow, this.props.curCol)}>
          <img src={this.props.currentValue.unitImage} alt='unit'></img>
        </div>
      )
    }
  }
}
