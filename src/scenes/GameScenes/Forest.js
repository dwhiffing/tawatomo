import Background from '../../sprites/Background'
import Character from '../../sprites/Character'
import Item from '../../sprites/Item'
import GameScene from './GameScene'

const MERCHANT = {
  text: 'I WANT SHINY',
  responses: {
    'GIVE ME SHINY': 'NO GIVE ME SHINY',
    default: 'NO I WANT SHINY',
  },
}

export default class extends GameScene {
  constructor() {
    super({ key: 'Forest' })
  }
  create() {
    this.exits = ['Ship', 'Village', 'Cave', 'Hill']

    new Background(this, 'forest')
    const merchant = new Character(this, 1000, 400, 'merchant', MERCHANT)
    new Item(this, 500, 400, 'part', () => {
      merchant.respond('NO TAKE MY SHINY')
    })

    this.showInventory()

    this.input.on(
      'pointerdown',
      pointer => this.goto(this.getExitFromPointer(pointer)),
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
