import Background from '../../sprites/Background'
import Character from '../../sprites/Character'
import Item from '../../sprites/Item'
import GameScene from './GameScene'
import { GENERIC_RESPONSES } from '../..'

const MAP = [0, 1, 2, 0, 1, 2]

export default class extends GameScene {
  constructor() {
    super({ key: 'Tunnel' })
  }
  create() {
    const { height, width } = this.game.config
    new Background(this, 'cave')
    const index = this.data.values.cavePosition

    if (index === MAP.length) {
      if (!this.hasUsedItem('shiny')) {
        const shiny = new Item(this, width / 2, height / 2, 'shiny', () => {
          this.takeItem('shiny', shiny)
        })
        shiny.sprite.setScale(0.7)
      }
    } else {
      this.showDoor(
        width / 2,
        height / 2 - 150,
        'tunnel',
        'Tunnel',
        () => {
          if (MAP[index] === 0) {
            this.data.values.cavePosition += 1
          } else {
            this.data.values.cavePosition = 0
          }
        },
        0.8,
      )
      this.showDoor(
        width / 2 - 700,
        height / 2 + 200,
        'tunnel',
        'Tunnel',
        () => {
          if (MAP[index] === 1) {
            this.data.values.cavePosition += 1
          } else {
            this.data.values.cavePosition = 0
          }
        },
        1.2,
      )
      this.showDoor(
        width / 2 + 700,
        height / 2 + 170,
        'tunnel',
        'Tunnel',
        () => {
          if (MAP[index] === 2) {
            this.data.values.cavePosition += 1
          } else {
            this.data.values.cavePosition = 0
          }
        },
        0.5,
      )
    }

    this.showReturn('Cave', 'caveDoor')
    this.showInventory()
  }
}
