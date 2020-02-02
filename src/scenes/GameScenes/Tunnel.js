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

    this.goodSound = this.sound.add('good')
    this.badSound = this.sound.add('bad')
    this.shinySound = this.sound.add('shinySound')
    const makeOnDoor = n => () => {
      if (MAP[index] === n) {
        this.goodSound.play()
        this.data.values.cavePosition += 1
      } else {
        this.badSound.play()
        this.data.values.cavePosition = 0
      }
    }

    if (index === MAP.length) {
      if (!this.hasUsedItem('shiny')) {
        const shiny = new Item(this, width / 2, height / 2, 'shiny', () => {
          this.shinySound.play()
          this.takeItem('shiny', shiny)
        })
        shiny.sprite.setScale(0.7)
      }
    } else {
      this.showDoor(
        width / 2 - 50,
        height / 2 - 200,
        'tunnel',
        'Tunnel',
        makeOnDoor(0),
        0.4,
      )

      this.showDoor(
        width / 2 - 700,
        height / 2 + 120,
        'tunnel',
        'Tunnel',
        makeOnDoor(1),
        0.3,
      )
      const fire = this.add
        .sprite(width / 2 - 500, height / 2 + 150, 'fire')
        .setScale(0.2)
      this.anims.create({
        key: 'walk',
        frames: this.anims.generateFrameNumbers('fire'),
        frameRate: 10,
        repeat: -1,
      })
      fire.play('walk')
      this.showDoor(
        width / 2 + 700,
        height / 2 + 120,
        'smallTunnel',
        'Tunnel',
        makeOnDoor(2),
        1,
      )
    }

    this.showReturn('Cave', 'caveDoor', 0.15)
    this.showInventory()
  }
}
