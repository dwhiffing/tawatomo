import Background from '../../sprites/Background'
import GameScene from './GameScene'
import Item from '../../sprites/Item'

export default class extends GameScene {
  constructor() {
    super({ key: 'Ship' })
  }
  create() {
    const { height, width } = this.game.config
    if (!this.data.values.inventory) {
      this.data.values.usedItems = []
      this.data.values.inventory = []
    }
    new Background(this, 'ship')

    const batterySlot = new Item(
      this,
      width / 2 - 200,
      height / 2,
      'batterySlot',
      () => {
        if (this.hasItem('battery')) {
          this.destroyItem('battery')
          this.scene.start('Win')
        }
      },
    )

    this.input.once('pointerdown', () => this.goto('Forest'), this)
    this.showInventory()
  }
}
