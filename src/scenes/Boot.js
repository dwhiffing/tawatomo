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
    this.load.audio('terryDialog', 'assets/audio/terry.wav')

    this.load.audio('eat', 'assets/audio/eat.wav')
    this.load.audio('fish', 'assets/audio/fish.wav')
    this.load.audio('angry3', 'assets/audio/angry3.wav')
    this.load.audio('angry', 'assets/audio/angry.wav')
    this.load.audio('cook', 'assets/audio/cook.wav')
    this.load.audio('shinySound', 'assets/audio/shiny.wav')
    this.load.audio('move', 'assets/audio/move.wav')
    this.load.audio('good', 'assets/audio/good.wav')
    this.load.audio('bad', 'assets/audio/bad.wav')
    this.load.audio('turtleSound', 'assets/audio/turtle.wav')
    this.load.audio('repairShip', 'assets/audio/repair-ship.wav')

    this.load.spritesheet('glyph', 'assets/images/glyphs.png', {
      frameWidth: 200,
      frameHeight: 200,
    })

    this.load.image('title', 'assets/images/title.png')
    this.load.image('keyboard-bg', 'assets/images/keyboard-bg.png')
    this.load.image('item-bg', 'assets/images/item-bg.png')
    this.load.image('character-bg', 'assets/images/character-bg.png')
    this.load.image('keyboard-input', 'assets/images/keyboard-input.png')
    this.load.image('shadow', 'assets/images/shadow.png')
    this.load.image('return', 'assets/images/return.png')
    this.load.image('shipLogo', 'assets/images/ship.png')
    this.load.image('trees', 'assets/images/trees.png')

    this.load.spritesheet('bat', 'assets/images/bat.png', {
      frameWidth: 1000,
      frameHeight: 1000,
    })
    this.load.spritesheet('weasel', 'assets/images/weasel.png', {
      frameWidth: 1000,
      frameHeight: 1000,
    })
    this.load.spritesheet('terry', 'assets/images/terry.png', {
      frameWidth: 1000,
      frameHeight: 1000,
    })
    this.load.spritesheet('turtle', 'assets/images/turtle.png', {
      frameWidth: 1000,
      frameHeight: 1000,
    })
    this.load.image('turtleSmall', 'assets/images/turtleSmall.png')

    this.load.image('fish', 'assets/images/fish.png')
    this.load.image('gear', 'assets/images/gear.png')
    this.load.image('shiny', 'assets/images/shiny.png')
    this.load.spritesheet('fire', 'assets/images/fire.png', {
      frameWidth: 1000,
      frameHeight: 1000,
    })
    this.load.image('batterySlot', 'assets/images/batterySlot.png')
    this.load.image('cookedFish', 'assets/images/cookedFish.png')

    this.load.image('menu', 'assets/images/menu.jpg')
    this.load.image('ship', 'assets/images/ship.jpg')
    this.load.image('hill', 'assets/images/hill.jpg')
    this.load.image('cave', 'assets/images/cave.jpg')
    this.load.image('village', 'assets/images/village.jpg')
    this.load.image('forest', 'assets/images/forest.jpg')

    this.load.image('tunnel', 'assets/images/tunnel.png')
    this.load.image('smallTunnel', 'assets/images/small-tunnel.png')
    this.load.image('hillDoor', 'assets/images/hillDoor.png')
    this.load.image('caveDoor', 'assets/images/caveDoor.png')
    this.load.image('villageDoor', 'assets/images/villageDoor.png')

    this.load.on('complete', () => {
      progress.destroy()
      this.scene.start('Menu')
    })
  }
}
