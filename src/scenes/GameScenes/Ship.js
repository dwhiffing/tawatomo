import Background from '../../sprites/Background'
import GameScene from './GameScene'
import Item from '../../sprites/Item'

export default class extends GameScene {
  constructor() {
    super({ key: 'Ship' })
  }
  create() {
    const { height, width } = this.game.config
    if (!this.data.values.inventory) {
      this.data.values.usedItems = []
      this.data.values.inventory = []
    }
    new Background(this, 'ship')
    this.repairSound = this.sound.add('repairShip')
    this.shipDeadSound = this.sound.add('shipDead')

    this.shipDeadSound.play()

    const shipAnim = this.add.sprite(width / 2 - 300, height / 2, 'ship-anim')
    this.anims.create({
      key: 'ship-crash-anim',
      frames: this.anims.generateFrameNumbers('ship-anim', {
        prefix: 'ship_',
        end: 6,
      }),
      frameRate: 8,
      repeat: 3,
    })

    this.anims.create({
      key: 'gear-crash-anim',
      frames: this.anims.generateFrameNumbers('ship-anim', {
        prefix: 'gear_',
        start: 7,
      }),
      frameRate: 8,
      repeat: 6,
    })

    shipAnim.play('ship-crash-anim')
    shipAnim.anims.chain('gear-crash-anim')
    shipAnim.anims.chain('ship-crash-anim')
    shipAnim.anims.chain('gear-crash-anim')
    shipAnim.anims.chain('ship-crash-anim')
    shipAnim.anims.chain('gear-crash-anim')

    this.add
      .sprite(width / 2 + 500, height / 2 - 200, 'trees')
      .setScale(2.5)
      .setAlpha(0.0001)
      .setInteractive()
      .on('pointerdown', () => this.goto('Forest'))

    const batterySlot = new Item(
      this,
      width / 2 + 620,
      height / 2 + 330,
      'batterySlot',
      () => {
        if (this.hasItem('gear')) {
          this.repairSound.play()
          this.destroyItem('gear')
          this.game.music.stop()
          setTimeout(() => {
            this.scene.start('Menu', { win: true })
          }, 1000)
        }
      },
    )

    this.showInventory()
    this.showReturn('Forest', 'trees')
    super.create()
  }
}
