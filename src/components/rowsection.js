import React, { Component } from 'react';

export default class RowSection extends Component {
  render(){
    if(this.props.currentValue.controllingPlayer !== 1 && this.props.currentValue.controllingPlayer !== 2){
      if(this.props.currentValue.selected === true){
        return(
          <div id={'row'+this.props.curRow+'col'+this.props.curCol} className='boardSection selectedTile' onClick={() => this.props.handleClick(this.props.curRow, this.props.curCol)}>

          </div>
        )
      } else {
        return(
          <div id={'row'+this.props.curRow+'col'+this.props.curCol} className='boardSection' onClick={() => this.props.handleClick(this.props.curRow, this.props.curCol)}>

          </div>
        )
      }
    } else {
      if (this.props.currentValue.controllingPlayer === 1) {
        return(
          <div id={'row'+this.props.curRow+'col'+this.props.curCol} className='boardSection playerOneControls' onClick={() => this.props.handleClick(this.props.curRow, this.props.curCol)}>
            <img src={this.props.currentValue.unitImage} alt='unit'></img>
          </div>
        )
      } else {
        return(
          <div id={'row'+this.props.curRow+'col'+this.props.curCol} className='boardSection playerTwoControls' onClick={() => this.props.handleClick(this.props.curRow, this.props.curCol)}>
            <img src={this.props.currentValue.unitImage} alt='unit'></img>
          </div>
        )
      }
    }
  }
}
