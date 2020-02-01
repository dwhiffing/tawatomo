import Background from '../sprites/Background'

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'Village' })
  }

  create() {
    new Background(this, 'village')

    this.add.image(1000, 400, 'monster')

    this.input.once(
      'pointerdown',
      function() {
        this.scene.start('Forest')
      },
      this,
    )
  }
}
