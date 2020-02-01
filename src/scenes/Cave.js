import Background from '../sprites/Background'
import Character from '../sprites/Character'

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'Cave' })
  }

  create() {
    new Background(this, 'cave')
    new Character(this, 1000, 400, 'shark', 'I am hungry feed me')

    this.input.on(
      'pointerdown',
      function() {
        if (!this.data.values.talking) {
          this.scene.start('Forest')
        }
      },
      this,
    )
  }
}
