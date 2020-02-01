export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'Boot' })
  }

  preload() {
    const progress = this.add.graphics()
    this.load.on('progress', value => {
      progress.clear()
      progress.fillStyle(0xffffff, 1)
      progress.fillRect(
        0,
        this.sys.game.config.height / 2,
        this.sys.game.config.width * value,
        60,
      )
    })

    this.load.image('shark', 'assets/images/shark.png')
    this.load.image('merchant', 'assets/images/merchant.png')
    this.load.image('monster', 'assets/images/monster.png')
    this.load.image('orange', 'assets/images/orange.png')

    this.load.image('ship', 'assets/images/ship.jpg')
    this.load.image('hill', 'assets/images/mountain.jpg')
    this.load.image('cave', 'assets/images/cave.jpg')
    this.load.image('village', 'assets/images/village.jpg')
    this.load.image('forest', 'assets/images/forest.jpg')

    this.load.on('complete', () => {
      progress.destroy()
      this.scene.start('Menu')
    })
  }
}
