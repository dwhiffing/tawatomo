export default class Item {
  constructor(scene, x, y, image, callback = () => {}) {
    this.scene = scene
    this.sprite = this.scene.add.image(x, y, image)
    this.name = image
    this.sprite.setInteractive()
    this.sprite.on('pointerdown', (pointer, localX, localY, event) => {
      event.stopPropagation()
      if (!this.scene.data.values.talking) {
        callback()
      }
    })
  }
  destroy() {
    this.sprite.destroy()
  }
}
