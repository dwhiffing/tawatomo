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
    this.showDoor(
      width / 2 - 50,
      height / 2 - 200,
      'tunnel',
      'Tunnel',
      () => (this.data.values.cavePosition = 0),
    )

    const giveFood = () => {
      if (this.hasItem('cookedFish')) {
        this.destroyItem('cookedFish')
        return 'MANY YES'
      } else if (this.hasItem('fish')) {
        return 'NO COLD ME WANT HOT FOOD'
      }
      return 'ME WANT FOOD'
    }
    const bat = new Character(this, width / 2 + 400, height - 350, 'bat', {
      text: 'ME NO HAVE FOOD ME WANT FOOD',
      sound: 'dialog2',
      responses: {
        ...GENERIC_RESPONSES,
        'YOU HAVE FOOD': giveFood,
        'ME GIVE FOOD': giveFood,
      },
    })
    bat.sprite.setScale(0.6)

    if (!this.hasUsedItem('fish')) {
      const fish = new Item(this, 400, height - 250, 'fish', () => {
        bat.respond('YOU GO GIVE ME HOT FOOD')
        this.takeItem('fish', fish)
      })
      fish.sprite.setScale(0.4)
    }

    this.showReturn('Forest', 'trees')
    this.showInventory()
  }
}
