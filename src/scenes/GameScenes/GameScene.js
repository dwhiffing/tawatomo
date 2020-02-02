export default class GameScene extends Phaser.Scene {
  constructor({ key }) {
    super({ key })
  }

  init(data) {
    this.data.values = data
    this.inventorySprites = []
    this.moveSound = this.sound.add('move')
  }

  create() {
    const rect = this.add
      .rectangle(0, 0, this.game.config.width, this.game.config.height, 0x000)
      .setOrigin(0, 0)
    this.tweens.add({
      targets: rect,
      alpha: 0,
      duration: 300,
    })
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

  showReturn(destination, decal, scale = 0.3) {
    if (decal) {
      this.add.sprite(80, this.game.config.height - 120, decal).setScale(scale)
    }
    this.add
      .sprite(200, this.game.config.height - 120, 'return')
      .setScale(0.5)
      .setInteractive()
      .on(
        'pointerdown',
        (p, lx, ly, e) => {
          e.stopPropagation()
          this.goto(destination)
        },
        this,
      )
  }

  showDoor(x, y, sprite, destination, callback, scale = 0.5) {
    this.add
      .sprite(x, y, sprite)
      .setScale(scale)
      .setInteractive()
      .on(
        'pointerdown',
        (p, lx, ly, e) => {
          e.stopPropagation()
          callback && callback()
          this.goto(destination)
        },
        this,
      )
  }

  hasUsedItem(item) {
    return this.data.values.usedItems.includes(item)
  }

  showInventory() {
    this.inventorySprites.forEach(sprite => sprite.destroy())
    this.inventorySprites = []
    this.data.values.inventory.forEach((item, index) => {
      const bgsprite = this.add
        .sprite(100 + index * 100, 70, 'item-bg')
        .setScale(1)
      const sprite = this.add.sprite(100 + index * 100, 70, item).setScale(0.25)
      this.inventorySprites.push(sprite)
      this.inventorySprites.push(bgsprite)
    })
  }

  goto(place) {
    if (!this.data.values.talking) {
      const rect = this.add
        .rectangle(0, 0, this.game.config.width, this.game.config.height, 0x000)
        .setOrigin(0, 0)
        .setAlpha(0)
      this.tweens.add({
        targets: rect,
        alpha: 1,
        duration: 300,
      })
      this.moveSound.play()
      setTimeout(() => {
        this.scene.start(place, { ...this.data.values })
      }, 500)
    }
  }
}
