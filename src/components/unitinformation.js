import React, { Component } from 'react';

export default class UnitInformation extends component {
  render(){
    return(
      <div>
        <h1>{this.props.unitInfo.name}</h1>
        <p>{this.props.unitInfo.basicDesc}</p>
        <p>{this.props.unitInfo.currentHealth}/{this.props.unitInfo.maxHealth}</p>
      </div>
    )
  }
}
