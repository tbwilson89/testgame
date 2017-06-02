import warriorImage from '../images/warrior.png'
import mageImage from '../images/mage.png'

let State = {
  Warrior: {
    name: 'Warrior',
    cost: 2,
    power: 3,
    damageType: 'physical',
    range: 1,
    movement: 2,
    health: 4,
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
    image: mageImage
  }
}

export default State
