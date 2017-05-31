import React, { Component } from 'react';

export default class PlayerControls extends Component {
  render(){
    let moveButtonText = this.props.currentAction === 'move' ? 'Cancel Move' : 'Move Unit'
    let attackButtonText = this.props.currentAction === 'attack' ? 'Cancel Attack' : 'Attack'
    return(
      <div>
        <div className='playerResources'>
          <div>Player One Resources: {this.props.playerOneResource}</div>
          <div>Player Two Resources: {this.props.playerTwoResource}</div>
          <div>Current Selected Action: {this.props.currentAction}</div>
        </div>
        <button id='warrior' onClick={() => this.props.handleClick('Warrior')}>Warrior</button>
        <button id='mage' onClick={() => this.props.handleClick('Mage')}>Mage</button><br/>
        <button id='deselect' onClick={() => this.props.handleClick('')}>Deselect Unit Type</button>
        <button id='endturn' onClick={() => this.props.handleEndTurn()}>End Turn</button><br/>
        <button id='moveCommand' onClick={() => this.props.handleAction('move')}>{moveButtonText}</button>
        <button id='attackCommand' onClick={() => this.props.handleAction('attack')}>{attackButtonText}</button>
      </div>
    )
  }
}
