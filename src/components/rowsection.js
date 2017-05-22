import React, { Component } from 'react';

export default class RowSection extends Component {
  render(){
    return(
      <div className='boardSection' onClick={() => this.props.onClick(this.props.curRow, this.props.curCol)}>
        {this.props.currentValue.spaceValue}
      </div>
    )
  }
}
