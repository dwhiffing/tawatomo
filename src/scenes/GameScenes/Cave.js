import Background from '../../sprites/Background'
import Character from '../../sprites/Character'
import Item from '../../sprites/Item'
import GameScene from './GameScene'
import { GENERIC_RESPONSES } from '../../'

export default class extends GameScene {
  constructor() {
    super({ key: 'Cave' })
  }
  create() {
    const { height, width } = this.game.config
    new Background(this, 'cave')
    const giveFood = () => {
      if (this.hasItem('cookedFish')) {
        this.destroyItem('cookedFish')
        return 'MANY YES'
      } else if (this.hasItem('fish')) {
        return 'NO COLD ME WANT HOT FOOD'
      }
      return 'ME WANT FOOD'
    }
    const shark = new Character(this, width - 400, height - 300, 'shark', {
      text: 'ME NO HAVE FOOD ME WANT FOOD',
      sound: 'dialog2',
      responses: {
        ...GENERIC_RESPONSES,
        'YOU HAVE FOOD': giveFood,
        'ME GIVE FOOD': giveFood,
      },
    })

    if (!this.hasUsedItem('fish')) {
      const fish = new Item(this, 400, height / 2, 'fish', () => {
        this.takeItem('fish', fish)
      })
    }

    this.showReturn('Forest')
    this.showInventory()
  }
}
