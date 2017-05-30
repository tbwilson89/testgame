import React, { Component } from 'react';

export default class TileInformation extends Component {
  render(){
    if(this.props.information.controllingPlayer){
      return(
        <div className='tileInformation'>
          Tile Information:
          <p>
            Unit Type: {this.props.information.unitInfo.name}<br/>
            Unit Health: {this.props.information.unitInfo.health}<br/>
            Unit Power: {this.props.information.unitInfo.power} {this.props.information.unitInfo.damageType}<br/>
          </p>
          <p>
            Controlling Player: {this.props.information.controllingPlayer}
          </p>
          <p>
            Current Player: {this.props.currentPlayer}
          </p>
        </div>
      )
    } else {
      return(
        <div>
          
        </div>
      )
    }
  }
}
