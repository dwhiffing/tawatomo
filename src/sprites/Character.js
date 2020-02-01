import Dialog from './Dialog'

export default class Character {
  constructor(scene, x, y, image, dialog) {
    this.scene = scene
    this.sprite = this.scene.add.image(x, y, image)
    this.sprite.setInteractive()
    this.sprite.on('pointerdown', (pointer, localX, localY, event) => {
      event.stopPropagation()
      if (dialog) {
        new Dialog(scene, dialog)
      }
    })
  }
}
