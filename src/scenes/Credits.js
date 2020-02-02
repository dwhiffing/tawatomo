import Background from '../sprites/Background'

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'Credits' })
  }

  create() {
    const { height, width } = this.game.config
    new Background(this, 'menu')
    this.add.sprite(width / 2, height / 2 - 300, 'title').setScale(1.5)
    this.add.text(
      width / 2 - 150,
      height / 2 - 100,
      'Daniel Whiffing\nSteph Braithwaite\nSam Braithwaite\nPeter Li\nAshley Dadoun',
      { align: 'center', fontSize: 34 },
    )

    this.add
      .sprite(width / 2, height - 150, 'keyboard-bg')
      .setScale(0.4)
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.start('Ship')
      })
    this.add.sprite(width / 2, height - 150, 'glyph').setFrame(6)
  }
}
