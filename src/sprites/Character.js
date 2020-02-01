import Dialog from './Dialog'

export default class Character {
  constructor(scene, x, y, image, data) {
    this.scene = scene
    this.data = data
    this.sprite = this.scene.add.image(x, y, image)
    this.sprite.setInteractive()
    this.sprite.on('pointerdown', (pointer, localX, localY, event) => {
      event.stopPropagation()
      if (!this.scene.data.values.talking && data.text) {
        this.respond(data.text, true)
      }
    })
  }

  respond(text, shouldPrompt) {
    if (shouldPrompt) {
      new Dialog(this.scene, text, this.data.sound, response => {
        let nextThingToSay = this.data.responses[response]
        if (typeof nextThingToSay === 'function') {
          nextThingToSay = nextThingToSay()
        }
        if (nextThingToSay) {
          this.respond(nextThingToSay, true)
        } else {
          new Dialog(this.scene, this.data.responses.default, this.data.sound)
        }
      })
    } else {
      new Dialog(this.scene, text, this.data.sound)
    }
  }
}
