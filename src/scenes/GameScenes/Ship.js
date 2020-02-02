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
    this.repairSound = this.sound.add('repairShip')

    const batterySlot = new Item(
      this,
      width / 2 + 620,
      height / 2 + 330,
      'batterySlot',
      () => {
        if (this.hasItem('gear')) {
          this.repairSound.play()
          this.destroyItem('gear')
          setTimeout(() => {
            this.scene.start('Menu')
          }, 1000)
        }
      },
    )

    this.showInventory()
    this.showReturn('Forest', 'trees')
  }
}
