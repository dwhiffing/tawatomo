import Background from '../../sprites/Background'
import Character from '../../sprites/Character'
import Item from '../../sprites/Item'
import GameScene from './GameScene'
import { GENERIC_RESPONSES } from '../..'

export default class extends GameScene {
  constructor() {
    super({ key: 'Hill' })
  }
  create() {
    const { height, width } = this.game.config
    new Background(this, 'hill')
    let turtle
    const goHome = () => {
      turtle.respond('YES ! ME GO YOU !', false, 1)
      setTimeout(() => {
        this.takeItem('turtleSmall', turtle.sprite)
      }, 500)
    }
    if (!this.hasUsedItem('turtleSmall') && !this.data.values.savedTurtle) {
      turtle = new Character(this, width / 2 - 350, height / 2 + 50, 'turtle', {
        text: ['ME NO GO HOME', 2],
        sound: 'turtleSound',
        responses: {
          HOME: ['ME NO GO HOME', 2],
          'GO HOME': ['ME NO GO HOME', 2],
          'YOU GO HOME': ['ME NO GO HOME', 2],
          'YOU GO ME': ['ME NO GO YOU', 2],
          WANT: ['ME NO WANT GO HOME', 2],
          'WANT HOME': ['ME NO WANT GO HOME', 2],
          'PERSON LOVE YOU': goHome,
          'YOU LOVE PERSON': goHome,
          'YOU LOVE HOME': goHome,
          ...GENERIC_RESPONSES,
        },
      })
      turtle.sprite.setScale(0.7)
    }

    this.showReturn('Forest', 'trees')
    this.showInventory()
    super.create()
  }
}
