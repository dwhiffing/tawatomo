export default class GameScene extends Phaser.Scene {
  constructor({ key }) {
    super({ key })
  }

  init(data) {
    this.data.values = data
    this.inventorySprites = []
  }

  hasItem(item) {
    return this.data.values.inventory.includes(item)
  }

  destroyItem(item) {
    this.data.values.inventory = this.data.values.inventory.filter(
      i => i !== item,
    )
    this.showInventory()
  }

  takeItem(item, sprite) {
    this.data.values.usedItems = [...this.data.values.usedItems, item]
    this.data.values.inventory = [...this.data.values.inventory, item]
    this.showInventory()
    sprite && sprite.destroy()
  }

  hasUsedItem(item) {
    return this.data.values.usedItems.includes(item)
  }

  showInventory() {
    this.inventorySprites.forEach(sprite => sprite.destroy())
    this.inventorySprites = []
    this.data.values.inventory.forEach((item, index) => {
      const sprite = this.add
        .sprite(20 + index * 100, 70, item)
        .setScale(0.25)
        .setOrigin(0, 0.5)
      this.inventorySprites.push(sprite)
    })
  }

  goto(place) {
    if (!this.data.values.talking) {
      this.scene.start(place, { ...this.data.values })
    }
  }
}
