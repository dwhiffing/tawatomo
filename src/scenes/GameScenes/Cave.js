import Background from '../../sprites/Background'
import Character from '../../sprites/Character'
import Item from '../../sprites/Item'
import GameScene from './GameScene'

export default class extends GameScene {
  constructor() {
    super({ key: 'Cave' })
  }
  create() {
    new Background(this, 'cave')
    const shark = new Character(this, 1000, 400, 'shark', {
      text: 'I AM HUNGRY',
      responses: {
        'YOU TAKE FOOD': () => {
          if (this.hasItem('cookedFish')) {
            this.destroyItem('cookedFish')
            return 'THANKS COMBO IS LITTLE BIG LITTLE'
          } else if (this.hasItem('fish')) {
            return 'COOK IT'
          }
          return 'NO FOOD'
        },
        default: 'I AM HUNGRY',
      },
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
