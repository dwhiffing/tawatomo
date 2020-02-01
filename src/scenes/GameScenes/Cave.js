import Background from '../../sprites/Background'
import Character from '../../sprites/Character'
import Item from '../../sprites/Item'
import GameScene from './GameScene'

const HUNGRY = {
  text: 'I AM HUNGRY',
  responses: {
    default: 'I AM HUNGRY',
  },
}

export default class extends GameScene {
  constructor() {
    super({ key: 'Cave' })
  }
  create() {
    new Background(this, 'cave')
    const shark = new Character(this, 1000, 400, 'shark', HUNGRY)

    const fish = new Item(this, 500, 400, 'fish', () => {
      this.takeItem(fish)
    })

    this.input.on('pointerdown', () => this.goto('Forest'), this)
    this.showInventory()
  }
}
