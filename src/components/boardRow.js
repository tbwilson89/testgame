import React, { Component } from 'react';

import RowSection from './rowsection'

export default class BoardRow extends Component {


  render(){
    let thisRow = []
    let currentNum = 0
    while(currentNum < this.props.rowSize){
      thisRow.push(
        <RowSection
          key={this.props.currentRow.toString() +'-'+ currentNum.toString()}
          curRow={this.props.currentRow}
          curCol={currentNum}
          currentValue={this.props.currentRowValues[currentNum]}
          handleClick={this.props.handleClick}
        />
      )
      currentNum++
    }
    return(
      <div className='boardRow'>
        {thisRow}
      </div>
    )
  }
}
