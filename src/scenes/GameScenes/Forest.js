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

    this.showDoor(200, height / 2, 'villageDoor', 'Village')
    this.showDoor(width / 2 - 100, height / 2, 'caveDoor', 'Cave')
    this.showDoor(width - 200, height / 2, 'hillDoor', 'Hill')
    let battery
    if (!this.hasItem('battery')) {
      battery = new Item(this, width / 2 - 200, height - 200, 'battery', () => {
        weasel.respond('YOU NO HAVE THAT WEALTH ME', false, 2)
      })
      battery.sprite.setScale(0.5)
    }

    const giveWealth = () => {
      if (this.hasItem('shiny')) {
        this.destroyItem('shiny')
        this.takeItem('battery', battery)
        return 'MANY YES HAVE THAT'
      }
      return 'YOU NO HAVE WEALTH'
    }

    const weasel = new Character(
      this,
      width / 2 + 300,
      height - 150,
      'weasel',
      {
        text: 'ME WANT WEALTH',
        responses: {
          ...GENERIC_RESPONSES,
          'GIVE ME WEALTH': 'NO YOU GIVE ME WEALTH',
          'YOU GOOD': 'ME NO GOOD',
          'ME GIVE WEALTH': giveWealth,
        },
      },
    )
    weasel.sprite.setScale(0.65)

    this.showInventory()
    this.showReturn('Ship', 'shipLogo')
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
