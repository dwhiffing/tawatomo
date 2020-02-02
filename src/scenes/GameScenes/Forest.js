import Background from '../../sprites/Background'
import Character from '../../sprites/Character'
import Item from '../../sprites/Item'
import GameScene from './GameScene'
import { GENERIC_RESPONSES } from '../..'

export default class extends GameScene {
  constructor() {
    super({ key: 'Forest' })
  }
  create() {
    const { height, width } = this.game.config
    new Background(this, 'forest')
    const merchant = new Character(
      this,
      width - 500,
      height - 100,
      'merchant',
      {
        text: 'ME WANT WEALTH',
        responses: {
          ...GENERIC_RESPONSES,
          'GIVE ME WEALTH': 'NO YOU GIVE ME WEALTH',
          'YOU GOOD': 'ME NO GOOD',
        },
      },
    )

    new Item(this, 500, height / 1.5, 'part', () => {
      merchant.respond('YOU NO HAVE THAT WEALTH ME')
    })

    this.showInventory()
    this.showReturn('Ship')
    this.showDoor(200, height / 2, 'villageDoor', 'Village')
    this.showDoor(width / 2, height / 2, 'caveDoor', 'Cave')
    this.showDoor(width - 200, height / 2, 'hillDoor', 'Hill')

    // this.input.on(
    //   'pointerdown',
    //   pointer => this.goto(this.getExitFromPointer(pointer)),
    //   this,
    // )
  }

  getExitFromPointer(pointer) {
    const touchX = pointer.x
    const touchY = pointer.y
    let exit
    if (touchX < this.game.config.width / 3) {
      exit = 'Village'
    } else if (touchX < (this.game.config.width / 3) * 2) {
      exit = 'Cave'
    } else {
      exit = 'Hill'
    }
    return exit
  }
}
