export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'Credits' })
  }

  create() {
    this.add.text(100, 100, 'Credits')
    this.input.once(
      'pointerdown',
      function() {
        this.scene.start('Menu')
      },
      this,
    )
  }
}
