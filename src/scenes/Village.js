import Background from '../sprites/Background'
import Character from '../sprites/Character'

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'Village' })
  }

  create() {
    new Background(this, 'village')
    new Character(this, 1000, 400, 'monster', 'My child is gone help')

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
