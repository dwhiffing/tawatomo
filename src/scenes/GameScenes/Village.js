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
    this.angrySound = this.sound.add('angry3')
    this.cookSound = this.sound.add('cook')

    const giveTurtle = () => {
      if (this.hasItem('turtleSmall')) {
        this.destroyItem('turtleSmall')
        // TODO: Save turtle sound
        this.data.values.savedTurtle = true
        const turt = new Character(
          this,
          width / 2 - 590,
          height / 2 - 180,
          'turtle',
        )
        turt.sprite.setScale(0.5)
        return 'YES'
      }

      return 'GIVE ME LITTLE PERSON'
    }

    const cookFood = () => {
      if (this.game.data.values.savedTurtle) {
        if (this.hasItem('fish')) {
          this.destroyItem('fish')
          this.takeItem('cookedFish')
          this.cookSound.play()
          return 'YES'
        }
        this.angrySound.play()
        return 'YOU HAVE NO FOOD'
      } else {
        this.angrySound.play()
        return 'GIVE ME LITTLE PERSON'
      }
    }

    new Background(this, 'village')
    const fire = new Item(this, width / 2 - 200, height / 1.5, 'fire', () => {
      this.angrySound.play()
      terry.respond('YOU NO HAVE HOT')
    })
    fire.sprite.setScale(0.3)
    const anim = this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNumbers('fire'),
      frameRate: 12,
      repeat: -1,
    })
    fire.sprite.play('walk')

    const terry = new Character(this, width / 2 + 270, height - 100, 'terry', {
      text: 'ME SMALL PERSON GO',
      sound: 'terryDialog',
      responses: {
        ...GENERIC_RESPONSES,
        'YOU HOT FOOD': cookFood,
        'YOU HAVE PERSON': giveTurtle,
      },
    })

    this.showReturn('Forest', 'trees')
    this.showInventory()
  }
}
