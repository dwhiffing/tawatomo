import Background from '../../sprites/Background'
import GameScene from './GameScene'

export default class extends GameScene {
  constructor() {
    super({ key: 'Ship' })
  }
  create() {
    if (!this.data.values.inventory) {
      this.data.values.inventory = []
    }
    new Background(this, 'ship')

    this.input.once('pointerdown', () => this.goto('Forest'), this)
    this.showInventory()
  }
}
