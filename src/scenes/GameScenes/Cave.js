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
    new Background(this, 'cave')
    const giveFood = () => {
      if (this.hasItem('cookedFish')) {
        this.destroyItem('cookedFish')
        return 'MANY YES'
      } else if (this.hasItem('fish')) {
        return 'NO COLD. ME WANT HOT FOOD'
      }
      return 'ME WANT FOOD'
    }
    const shark = new Character(this, 1000, 400, 'shark', {
      text: 'ME NO HAVE FOOD ME WANT FOOD',
      responses: {
        ...GENERIC_RESPONSES,
        'YOU HAVE FOOD': giveFood,
        'ME GIVE FOOD': giveFood,
        default: 'ME WANT FOOD',
      },
    })

    new Item(this, 200, 200, 'lock', () => {
      this.goto('Cage')
    })

    if (!this.hasUsedItem('fish')) {
      const fish = new Item(this, 500, 400, 'fish', () => {
        this.takeItem('fish', fish)
      })
    }

    this.input.on('pointerdown', () => this.goto('Forest'), this)
    this.showInventory()
  }
}
