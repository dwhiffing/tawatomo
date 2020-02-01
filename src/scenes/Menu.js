export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'Menu' })
  }

  create() {
    this.add.text(100, 100, 'Menu')

    this.input.once(
      'pointerdown',
      function() {
        this.scene.start('Ship')
      },
      this,
    )
  }
}
