import Background from '../sprites/Background'

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'Hill' })
  }

  create() {
    new Background(this, 'hill')

    this.add.image(1000, 400, 'orange')

    this.input.once(
      'pointerdown',
      function() {
        this.scene.start('Forest')
      },
      this,
    )
  }
}
