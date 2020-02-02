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
      0.4,
    )

    const fire = this.add
      .sprite(width / 2 - 50, height / 2 - 40, 'fire')
      .setScale(0.1)
    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNumbers('fire'),
      frameRate: 10,
      repeat: -1,
    })
    fire.play('walk')

    this.fishSound = this.sound.add('fish')
    this.eatSound = this.sound.add('eat')
    this.angrySound = this.sound.add('angry')

    const giveFood = () => {
      if (this.hasItem('cookedFish')) {
        this.data.values.fedBat = true
        this.destroyItem('cookedFish')
        this.eatSound.play()
        return ['YOU GO COLD HILL ! HOT BIG SMALL HOT BIG SMALL !', 1]
      } else if (this.hasItem('fish')) {
        this.angrySound.play()
        return ['NO COLD ! ME WANT HOT FOOD !', 2]
      }
      return ['ME WANT FOOD !', 2]
    }
    const bat = new Character(this, width / 2 + 400, height - 350, 'bat', {
      text: this.data.values.fedBat
        ? ['YOU GO COLD HILL ! HOT BIG SMALL HOT BIG SMALL !', 1]
        : ['ME WANT FOOD !', 2],
      sound: 'dialog2',
      responses: {
        ...GENERIC_RESPONSES,

        WANT: ['ME WANT FOOD !', 2],
        WEALTH: ['NO WEALTH ! ME WANT FOOD !', 2],
        'WANT WEALTH': ['YOU GIVE FOOD ! ME GIVE WEALTH!', 1],
        'YOU WANT WEALTH': ['YOU GIVE FOOD ! ME GIVE WEALTH!', 1],
        'ME WANT WEALTH': ['YOU GIVE FOOD ! ME GIVE WEALTH!', 1],

        FOOD: ['YES ! ME WANT FOOD !', 1],
        'ME WANT FOOD': ['NO ! GIVE ME FOOD !', 2],
        'YOU WANT FOOD': ['YES ! ME WANT FOOD !', 1],
        'WANT FOOD': ['YES ! ME WANT FOOD !', 1],
        'WANT HOT FOOD': ['YES ! ME WANT HOT FOOD !', 1],
        'HOT FOOD': ['YES ! ME WANT HOT FOOD !', 1],
        'WANT COLD FOOD': ['NO COLD FOOD ! ME WANT HOT FOOD !', 2],
        'COLD FOOD': ['NO COLD FOOD ! ME WANT HOT FOOD !', 2],

        LOVE: 'ME LOVE FOOD !',
        'WANT LOVE': 'ME WANT FOOD !',

        'HAVE FOOD': giveFood,
        EAT: giveFood,
        'EAT FOOD': giveFood,
        'YOU EAT FOOD': giveFood,
        'YOU EAT': giveFood,
        'YOU HAVE FOOD': giveFood,
        'ME GIVE FOOD': giveFood,
        'GIVE FOOD': giveFood,
      },
    })
    bat.sprite.setScale(0.6)

    if (!this.hasUsedItem('fish')) {
      const fish = new Item(this, 400, height - 250, 'fish', () => {
        bat.respond('YOU GO HOT FOOD !')
        this.fishSound.play()
        this.takeItem('fish', fish)
      })
      fish.sprite.setScale(0.4)
    }

    this.showReturn('Forest', 'trees')
    this.showInventory()
  }
}
