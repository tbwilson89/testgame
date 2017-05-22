import React, { Component } from 'react';

export default class TileInformation extends Component {
  render(){
    return(
      <div className='tileInformation'>
        Testing:
        <p>
          Unit Name: {this.props.information.unitName}
        </p>
        <p>
          Space Value: {this.props.information.spaceValue}
        </p>
      </div>
    )
  }
}
