import Background from '../sprites/Background'

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'Ship' })
  }

  create() {
    new Background(this, 'ship')

    this.input.once(
      'pointerdown',
      function() {
        this.scene.start('Forest')
      },
      this,
    )
  }
}
