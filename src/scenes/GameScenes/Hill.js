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
      this.takeItem('turtleSmall', turtle.sprite)
      return 'ME GO YOU'
    }
    if (!this.hasUsedItem('turtleSmall')) {
      turtle = new Character(this, width / 2 - 350, height / 2 - 60, 'turtle', {
        text: 'ME NO GO HOME',
        sound: 'turtleSound',
        responses: {
          'YOU GO HOME': 'ME NO GO HOME',
          'YOU GO ME': goHome,
          ...GENERIC_RESPONSES,
        },
      })
      turtle.sprite.setScale(0.4)
    }

    this.showReturn('Forest', 'trees')
    this.showInventory()
  }
}
