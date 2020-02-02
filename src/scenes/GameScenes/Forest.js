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

    this.angrySound = this.sound.add('angry')
    this.showDoor(
      250,
      height / 2 + 100,
      'villageDoor',
      'Village',
      () => {},
      0.4,
    )
    this.showDoor(
      width / 2 - 100,
      height / 2 + 110,
      'caveDoor',
      'Cave',
      () => {},
      0.2,
    )
    this.showDoor(
      width - 150,
      height / 2 - 50,
      'hillDoor',
      'Hill',
      () => {},
      0.4,
    )
    let gear
    if (!this.hasItem('gear')) {
      gear = new Item(this, width / 2 - 200, height - 200, 'gear', () => {
        this.angrySound.play()
        weasel.respond('YOU NO HAVE ME WEALTH ! ! !', false, 2)
      })
      gear.sprite.setScale(0.7)
    }

    const giveWealth = () => {
      if (this.hasItem('shiny')) {
        this.destroyItem('shiny')
        this.takeItem('gear', gear)
        weasel.respond('BIG YES ! ! YOU HAVE WEALTH ! !', false, 1)
        return
      }
      weasel.respond('YOU NO HAVE WEALTH', false, 2)
    }

    const weasel = new Character(
      this,
      width / 2 + 300,
      height - 100,
      'weasel',
      {
        text: 'YOU WANT ME WEALTH ? YOU NO HAVE ME WEALTH',
        responses: {
          ...GENERIC_RESPONSES,
          LOVE: 'ME LOVE WEALTH',
          HOME: 'ME HOME COLD HILL !',
          HILL: 'HILL NO WEALTH',
          'GIVE ME WEALTH': 'NO YOU GIVE ME WEALTH',
          'YOU GIVE WEALTH': 'NO YOU GIVE WEALTH',
          'ME LOVE YOU': 'ME LOVE WEALTH NO YOU',
          'YOU LOVE ME': 'ME LOVE WEALTH NO YOU',
          'LOVE PERSON': 'ME NO LOVE PERSON ! ME LOVE WEALTH',
          'YOU HOME': 'ME HOME COLD HILL !',
          'SMALL PERSON': 'SMALL PERSON GO HILL',

          WANT: 'ME WANT WEALTH !',
          FOOD: 'ME NO WANT FOOD !',
          'WANT FOOD': 'ME NO WANT FOOD !',
          'YOU WANT FOOD': 'ME NO WANT FOOD !',
          WEALTH: 'ME LOVE WEALTH !',
          'YOU WANT': 'ME WANT WEALTH !',
          'YOU WANT WEALTH': 'YES ! ! !',
          BIG: 'ME WANT BIG WEALTH !',
          'BIG WEALTH': 'ME WANT BIG WEALTH !',
          'SMALL WEALTH': 'NO SMALL WEALTH ! ME WANT BIG WEALTH !',
          'WANT BIG WEALTH': 'ME WANT BIG WEALTH !',
          'WANT SMALL WEALTH': 'NO SMALL WEALTH ! ME WANT BIG WEALTH !',

          COLD: 'COLD HILL ?',
          'COLD HILL': 'GO COLD HILL ! HAVE WEALTH !',
          'ME HAVE WEALTH': 'GIVE ME WEALTH ! GIVE ME !',
          'HAVE WEALTH': giveWealth,
          'GIVE WEALTH': giveWealth,
          'ME GIVE WEALTH': giveWealth,
          'YOU HAVE WEALTH': giveWealth,
        },
      },
    )
    weasel.sprite.setScale(0.65)

    this.showInventory()
    this.showReturn('Ship', 'shipLogo')
    super.create()
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
