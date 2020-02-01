import Background from '../sprites/Background'
import Character from '../sprites/Character'

const HUNGRY = {
  text: 'I AM HUNGRY',
  responses: {
    default: 'I AM HUNGRY',
  },
}

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'Cave' })
  }

  create() {
    new Background(this, 'cave')
    new Character(this, 1000, 400, 'shark', HUNGRY)

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
