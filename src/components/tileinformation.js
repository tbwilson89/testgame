import React, { Component } from 'react';

export default class TileInformation extends Component {
  render(){
    return(
      <div className='tileInformation'>
        Testing:
        <p>
          {this.props.information.unitName}
          {this.props.information.spaceValue}
        </p>
      </div>
    )
  }
}
