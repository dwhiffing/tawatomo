import Background from '../sprites/Background'

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'Forest' })
  }

  create() {
    this.exits = ['Ship', 'Village', 'Cave', 'Hill']

    new Background(this, 'forest')

    this.add.image(1000, 400, 'merchant')

    this.input.once(
      'pointerdown',
      function(pointer) {
        this.scene.start(this.getExitFromPointer(pointer))
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
