import Background from '../../sprites/Background'
import Character from '../../sprites/Character'
import GameScene from './GameScene'
import Item from '../../sprites/Item'

const MOTHER = {
  text: 'ME SMALL PERSON GO',
  responses: {
    default: 'ME SMALL PERSON GO',
  },
}

export default class extends GameScene {
  constructor() {
    super({ key: 'Village' })
  }

  create() {
    new Background(this, 'village')
    new Character(this, 1000, 400, 'monster', MOTHER)
    new Item(this, 500, 400, 'fire', () => {
      if (this.hasItem('fish')) {
        this.destroyItem('fish')
        this.takeItem('cookedFish')
      }
    })

    this.input.on('pointerdown', () => this.goto('Forest'), this)
    this.showInventory()
  }
}
