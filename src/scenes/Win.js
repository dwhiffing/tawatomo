export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'Win' })
  }

  create() {
    this.add.text(100, 100, 'Win')

    this.input.once(
      'pointerdown',
      function() {
        this.scene.start('Menu')
      },
      this,
    )
  }
}
