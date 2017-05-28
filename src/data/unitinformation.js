import React, { Component } from 'react'

export default class UnitInformation extends Component {

  constructor(){
    super()
    this.state = {
      warrior: {
        cost: 2,
        physPower: 3,
        spellPower: 0,
        health: 4
      },
      mage: {
        cost: 2,
        physPower: 1,
        spellPower: 3,
        health: 3
      }
    }
  }
  render(){
    switch(this.props.unit){
      case 'warrior':
        return(this.state.warrior)
      case 'mage':
        return(this.state.mage)
      default:
        break;
    }
  }
}
