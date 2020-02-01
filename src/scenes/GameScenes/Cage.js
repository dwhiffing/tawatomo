import Background from '../../sprites/Background'
import Character from '../../sprites/Character'
import Item from '../../sprites/Item'
import GameScene from './GameScene'

export default class extends GameScene {
  constructor() {
    super({ key: 'Cage' })
  }
  create() {
    new Background(this, 'cave')

    this.input.on('pointerdown', () => this.goto('Cave'), this)
    this.showInventory()
  }
}
