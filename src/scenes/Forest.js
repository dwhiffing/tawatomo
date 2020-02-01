import Background from '../sprites/Background'
import Character from '../sprites/Character'

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'Forest' })
  }

  create() {
    this.exits = ['Ship', 'Village', 'Cave', 'Hill']

    new Background(this, 'forest')
    new Character(this, 1000, 400, 'merchant', 'I want shiny. give me shiny')

    this.input.on(
      'pointerdown',
      function(pointer) {
        if (!this.data.values.talking) {
          this.scene.start(this.getExitFromPointer(pointer))
        }
      },
      this,
    )
  }

  getExitFromPointer(pointer) {
    const touchX = pointer.x
    const touchY = pointer.y
    let exit = this.exits[0]
    if (touchY > this.game.config.height / 1.3) {
      exit = this.exits[0]
    } else if (touchX < this.game.config.width / 3) {
      exit = this.exits[1]
    } else if (touchX < (this.game.config.width / 3) * 2) {
      exit = this.exits[2]
    } else {
      exit = this.exits[3]
    }
    return exit
  }
}
