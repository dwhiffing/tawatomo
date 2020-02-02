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

    this.load.audio('dialog', 'assets/audio/dialog.wav')
    this.load.audio('dialog2', 'assets/audio/dialog2.wav')

    this.load.spritesheet('glyph', 'assets/images/glyphs.png', {
      frameWidth: 200,
      frameHeight: 200,
    })

    this.load.image('keyboard-bg', 'assets/images/keyboard-bg.png')
    this.load.image('character-bg', 'assets/images/character-bg.png')
    this.load.image('keyboard-input', 'assets/images/keyboard-input.png')
    this.load.image('shadow', 'assets/images/shadow.png')
    this.load.image('return', 'assets/images/return.png')

    this.load.image('shark', 'assets/images/shark.png')
    this.load.image('merchant', 'assets/images/merchant.png')
    this.load.image('monster', 'assets/images/monster.png')
    this.load.image('orange', 'assets/images/orange.png')

    this.load.image('fish', 'assets/images/fish.png')
    this.load.image('part', 'assets/images/part.png')
    this.load.image('shiny', 'assets/images/shiny.png')
    this.load.image('fire', 'assets/images/fire.png')
    this.load.image('cookedFish', 'assets/images/cooked-fish.png')

    this.load.image('ship', 'assets/images/ship.jpg')
    this.load.image('hill', 'assets/images/mountain.jpg')
    this.load.image('cave', 'assets/images/cave.jpg')
    this.load.image('village', 'assets/images/village.jpg')
    this.load.image('forest', 'assets/images/forest.jpg')

    this.load.image('door', 'assets/images/door.png')
    this.load.image('hillDoor', 'assets/images/mountainDoor.png')
    this.load.image('caveDoor', 'assets/images/caveDoor.png')
    this.load.image('villageDoor', 'assets/images/villageDoor.png')

    this.load.on('complete', () => {
      progress.destroy()
      this.scene.start('Ship')
    })
  }
}
