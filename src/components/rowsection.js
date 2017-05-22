import React, { Component } from 'react';

export default class RowSection extends Component {
  render(){
    return(
      <div id={'row'+this.props.curRow+'col'+this.props.curCol} className='boardSection' onClick={() => this.props.onClick(this.props.curRow, this.props.curCol)}>
        {this.props.currentValue.spaceValue}
      </div>
    )
  }
}
