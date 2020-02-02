import Background from '../sprites/Background'

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'Win' })
  }

  create() {
    const { height, width } = this.game.config
    new Background(this, 'menu')
    this.add.sprite(width / 2, height / 2 - 300, 'title').setScale(1.5)
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

    this.input.once(
      'pointerdown',
      function() {
        this.scene.start('Ship')
      },
      this,
    )
  }
}
