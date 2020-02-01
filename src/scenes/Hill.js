import Background from '../sprites/Background'
import Character from '../sprites/Character'

const STUCK = {
  text: 'I AM STUCK',
  responses: {
    default: 'I AM STUCK',
  },
}
export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'Hill' })
  }

  create() {
    new Background(this, 'hill')
    new Character(this, 1000, 400, 'orange', STUCK)

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
