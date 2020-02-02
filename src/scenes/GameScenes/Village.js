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
    this.cookSound = this.sound.add('cook')

    const giveTurtle = () => {
      if (this.hasItem('turtleSmall')) {
        this.destroyItem('turtleSmall')
        this.data.values.savedTurtle = true
        const turt = new Character(
          this,
          width / 2 - 590,
          height / 2 + 380,
          'turtle',
        )
        turt.sprite.setScale(0.5)
        terry.respond('BIG YES ! YOU HAVE HOT ! !', false, 1)
        return
      }
      terry.respond('GIVE ME LITTLE PERSON', false, 2)
    }

    const cookFood = () => {
      if (this.data.values.savedTurtle) {
        if (this.hasItem('fish')) {
          this.destroyItem('fish')
          this.takeItem('cookedFish')
          this.cookSound.play()
          terry.respond('YES ! ME HOT YOU FOOD', false, 1)
          return
        }
        terry.respond('YOU HAVE NO FOOD', false, 2)
        return
      } else {
        terry.respond('GIVE ME SMALL PERSON', false, 2)
      }
    }

    new Background(this, 'village')
    const fire = new Item(this, width / 2 - 200, height / 1.5, 'fire', () => {
      terry.respond('ME HOT ! YOU NO HAVE !', false, 2)
    })

    fire.sprite.setScale(0.3)

    const anim = this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNumbers('fire'),
      frameRate: 12,
      repeat: -1,
    })
    fire.sprite.play('walk')

    const terry = new Character(this, width / 2 + 300, height - 50, 'terry', {
      text: ['ME SMALL PERSON GO HILL ! ME LOVE SMALL PERSON !', 2],
      sound: 'terryDialog',
      responses: {
        ...GENERIC_RESPONSES,
        'YOU HOT FOOD': cookFood,
        'ME HOT FOOD': cookFood,
        'HOT FOOD': cookFood,
        'YOU HAVE PERSON': giveTurtle,
        'ME GIVE PERSON': giveTurtle,
        'ME GO PERSON': ['YES ! ME LOVE SMALL PERSON ! GO HILL !', 2],
        'GO HILL': ['ME NO GO ! YOU GO !', 2],
        'YOU GO HILL': ['ME NO GO ! YOU GO !', 2],
        HILL: ['YES HILL ! ME LOVE PERSON GO HILL !', 1],
        'ME GO HILL': ['YES ! ! YOU GO HILL ! HAVE SMALL PERSON', 1],
        WEALTH: ['ME NO WANT WEALTH ! ME WANT LOVE PERSON', 2],
        WANT: ['ME WANT LOVE PERSON ! YOU GO HILL !', 2],
        'WANT WEALTH': ['ME NO WANT WEALTH ! ME WANT LOVE PERSON', 2],
        'WANT FOOD': ['ME NO WANT FOOD ! ME WANT LOVE PERSON', 2],
      },
    })

    if (this.data.values.savedTurtle) {
      const turt = new Character(
        this,
        width / 2 - 590,
        height / 2 + 380,
        'turtle',
      )
      turt.sprite.setScale(0.5)
    }

    terry.sprite.setScale(0.8)

    this.showReturn('Forest', 'trees')
    this.showInventory()
    super.create()
  }
}
