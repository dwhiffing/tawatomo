import Background from '../../sprites/Background'
import Character from '../../sprites/Character'
import Item from '../../sprites/Item'
import GameScene from './GameScene'
import { GENERIC_RESPONSES } from '../..'

export default class extends GameScene {
  constructor() {
    super({ key: 'Hill' })
  }
  create() {
    new Background(this, 'hill')
    new Character(this, 1000, 400, 'orange', {
      text: 'ME NO GO HOME',
      responses: {
        ...GENERIC_RESPONSES,
        default: 'ME NO GO HOME',
      },
    })

    const ladder = new Item(this, 500, 400, 'ladder', () => {
      this.takeItem('ladder', ladder)
    })

    this.input.on('pointerdown', () => this.goto('Forest'), this)
    this.showInventory()
  }
}
