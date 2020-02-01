import Background from '../../sprites/Background'
import Character from '../../sprites/Character'
import Item from '../../sprites/Item'
import GameScene from './GameScene'

const STUCK = {
  text: 'I AM STUCK',
  responses: {
    default: 'I AM STUCK',
  },
}
export default class extends GameScene {
  constructor() {
    super({ key: 'Hill' })
  }
  create() {
    new Background(this, 'hill')
    new Character(this, 1000, 400, 'orange', STUCK)

    const ladder = new Item(this, 500, 400, 'ladder', () => {
      this.takeItem('ladder', ladder)
    })

    this.input.on('pointerdown', () => this.goto('Forest'), this)
    this.showInventory()
  }
}
