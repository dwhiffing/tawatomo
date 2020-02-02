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
    const { height, width } = this.game.config
    new Background(this, 'hill')
    new Character(this, width - 400, height / 1.3, 'orange', {
      text: 'ME NO GO HOME',
      responses: {
        ...GENERIC_RESPONSES,
      },
    })

    this.input.on('pointerdown', () => this.goto('Forest'), this)
    this.showReturn('Forest')
    this.showInventory()
  }
}
