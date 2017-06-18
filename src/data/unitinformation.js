import warriorImage from '../images/warrior.png'
import mageImage from '../images/mage.png'
//import ninjaImage from '../images/ninja.png'

let State = {
  Warrior: {
    name: 'Warrior',
    cost: 2,
    power: 3,
    damageType: 'physical',
    range: 1,
    movement: 2,
    health: 4,
    actions: 1,
    image: warriorImage
  },
  Mage: {
    name: 'Mage',
    cost: 2,
    power: 3,
    damageType: 'spell',
    range: 2,
    movement: 2,
    health: 3,
    actions: 1,
    image: mageImage
  },
  Ninja: {
    name: 'Ninja',
    cost: 3,
    power: 2,
    damageType: 'physical',
    range: 1,
    movement: 3,
    health: 2,
    actions: 1,
    //image: ninjaImage
  },
  Sniper: {
    name: 'Sniper',
    cost: 4,
    power: 4,
    damageType: 'physical',
    range: 4,
    movement: 1,
    health: 2,
    actions: 1,
  }
}

export default State
