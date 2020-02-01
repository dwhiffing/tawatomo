import Dialog from './Dialog'

export default class Character {
  constructor(scene, x, y, image, data) {
    this.scene = scene
    this.data = data
    this.sprite = this.scene.add.image(x, y, image)
    this.sprite.setInteractive()
    this.sprite.on('pointerdown', (pointer, localX, localY, event) => {
      event.stopPropagation()
      if (data.text) {
        this.respond(data.text)
      }
    })
  }

  respond(text) {
    new Dialog(this.scene, text, response => {
      const nextThingToSay = this.data.responses[response]
      if (nextThingToSay) {
        this.respond(nextThingToSay)
      } else {
        new Dialog(this.scene, this.data.responses.default)
      }
    })
  }
}
