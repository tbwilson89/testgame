import React, { Component } from 'react';

export default class PlayerControls extends Component {
  render(){
    return(
      <div>
        <div className='playerResources'>
          <div>Player One Resources: {this.props.playerOneResource}</div>
          <div>Player Two Resources: {this.props.playerTwoResource}</div>
        </div>
        <button id='warrior' onClick={() => this.props.handleClick('Warrior')}>Warrior</button>
        <button id='mage' onClick={() => this.props.handleClick('Mage')}>Mage</button><br/>
        <button id='deselect' onClick={() => this.props.handleClick('')}>Deselect Unit Type</button>
        <button id='endturn' onClick={() => this.props.handleEndTurn()}>End Turn</button>
      </div>
    )
  }
}
