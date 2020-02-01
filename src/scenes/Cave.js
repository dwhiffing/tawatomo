import Background from '../sprites/Background'

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'Cave' })
  }

  create() {
    new Background(this, 'cave')

    this.add.image(1000, 400, 'shark')

    this.input.once(
      'pointerdown',
      function() {
        this.scene.start('Forest')
      },
      this,
    )
  }
}
