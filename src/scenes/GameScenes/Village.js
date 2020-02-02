import Background from '../../sprites/Background'
import Character from '../../sprites/Character'
import GameScene from './GameScene'
import Item from '../../sprites/Item'
import { GENERIC_RESPONSES } from '../..'

export default class extends GameScene {
  constructor() {
    super({ key: 'Village' })
  }

  create() {
    const { height, width } = this.game.config
    const cookFood = () => {
      if (this.hasItem('fish')) {
        this.destroyItem('fish')
        this.takeItem('cookedFish')
        return 'YES'
      }
      return 'YOU NO HAVE FOOD'
    }

    new Background(this, 'village')
    new Item(this, width / 2 - 200, height / 1.5, 'fire', () => {
      monster.respond('YOU NO HAVE HOT')
    })
    const monster = new Character(
      this,
      width / 2 + 200,
      height - 200,
      'monster',
      {
        text: 'ME SMALL PERSON GO',
        responses: {
          ...GENERIC_RESPONSES,
          'YOU HOT FOOD': cookFood,
        },
      },
    )

    this.showReturn('Forest')
    this.showInventory()
  }
}
