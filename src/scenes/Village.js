import Background from '../sprites/Background'
import Character from '../sprites/Character'

const MOTHER = {
  text: 'MY CHILD GONE',
  responses: {
    default: 'MY CHILD GONE',
  },
}

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'Village' })
  }

  create() {
    new Background(this, 'village')
    new Character(this, 1000, 400, 'monster', MOTHER)

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
