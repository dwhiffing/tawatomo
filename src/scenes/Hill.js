import Background from '../sprites/Background'
import Character from '../sprites/Character'

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'Hill' })
  }

  create() {
    new Background(this, 'hill')
    new Character(this, 1000, 400, 'orange', 'I am stuck')

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
