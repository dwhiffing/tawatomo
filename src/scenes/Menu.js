import Background from '../sprites/Background'
let win
export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'Menu' })
  }

  init(data) {
    if (data.win) {
      win = true
    }
  }

  create() {
    const { height, width } = this.game.config
    new Background(this, 'menu')
    this.add.sprite(width / 2, height / 2 - 300, 'title').setScale(1.5)
    const music = this.sound.add('introMusic', { loop: true })
    const gameMusic = this.sound.add('gameMusic', { volume: 0.2, loop: true })
    music.play()
    this.game.music = gameMusic

    const fire = this.add
      .sprite(width / 2 - 180, height / 2, 'fire')
      .setScale(0.15)
      .setAngle(-90)
    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNumbers('fire'),
      frameRate: 10,
      repeat: -1,
    })
    fire.play('walk')
    this.add.sprite(width / 2, height / 2, 'shipLogo').setAngle(90)

    this.add
      .sprite(150, height - 150, 'item-bg')
      .setScale(1.5)
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.start('Credits')
      })
    this.add
      .sprite(150, height - 150, 'glyph')
      .setFrame(1)
      .setScale(0.5)
    if (win) {
      this.add
        .sprite(width / 2, height - 150, 'you-win')
        .setInteractive()
        .on('pointerdown', () => {
          music.stop()
          gameMusic.play()
          this.scene.start('Ship')
        })
    } else {
      this.add
        .sprite(width / 2, height - 150, 'keyboard-bg')
        .setScale(0.4)
        .setInteractive()
        .on('pointerdown', () => {
          music.stop()
          gameMusic.play()
          this.scene.start('Ship')
        })
      this.add.sprite(width / 2, height - 150, 'glyph').setFrame(6)
    }
  }
}
