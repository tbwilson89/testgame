import React, { Component } from 'react';

export default class TileInformation extends Component {
  render(){
    let moveButtonText = this.props.currentAction === 'move' ? 'Cancel Move' : 'Move Unit'
    let attackButtonText = this.props.currentAction === 'attack' ? 'Cancel Attack' : 'Attack'
    if(this.props.information.controllingPlayer === this.props.currentPlayer){
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
          <button id='moveCommand' onClick={() => this.props.handleAction('move')}>{moveButtonText}</button>
          <button id='attackCommand' onClick={() => this.props.handleAction('attack')}>{attackButtonText}</button>
        </div>
      )
    } else if(this.props.information.controllingPlayer){
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
