import Background from '../../sprites/Background'
import Character from '../../sprites/Character'
import GameScene from './GameScene'
import Item from '../../sprites/Item'
import { GENERIC_RESPONSES } from '../..'

export default class extends GameScene {
  constructor() {
    super({ key: 'Village' })
  }

  create() {
    const cookFood = () => {
      if (this.hasItem('fish')) {
        this.destroyItem('fish')
        this.takeItem('cookedFish')
        return 'YES'
      }
      return 'YOU NO HAVE FOOD'
    }

    new Background(this, 'village')
    const monster = new Character(this, 1000, 400, 'monster', {
      text: 'ME SMALL PERSON GO',
      responses: {
        ...GENERIC_RESPONSES,
        'YOU HOT FOOD': cookFood,
        default: 'ME SMALL PERSON GO',
      },
    })
    new Item(this, 500, 400, 'fire', () => {
      monster.respond('YOU NO HAVE HOT')
    })

    this.input.on('pointerdown', () => this.goto('Forest'), this)
    this.showInventory()
  }
}
