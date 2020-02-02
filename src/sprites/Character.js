import Dialog from './Dialog'

export default class Character {
  constructor(scene, x, y, image, data) {
    this.scene = scene
    this.data = data
    this.sprite = this.scene.add.image(x, y, image)
    this.sprite.setInteractive()
    this.sprite.setOrigin(0.5, 1)
    this.sprite.on('pointerdown', (pointer, localX, localY, event) => {
      event.stopPropagation()
      if (!this.scene.data.values.talking && data.text) {
        this.respond(data.text, true)
      }
    })
  }

  respond(text, shouldPrompt, react = 1) {
    this.react(react)
    if (shouldPrompt) {
      new Dialog(this.scene, text, this.data.sound, response => {
        if (!response) {
          return
        }

        let nextThingToSay = this.data.responses[response]
        if (typeof nextThingToSay === 'function') {
          nextThingToSay = nextThingToSay()
        }
        if (nextThingToSay) {
          this.respond(nextThingToSay, true)
        } else {
          this.react(3)
          new Dialog(this.scene, '? ? ?', this.data.sound)
        }
      })
    } else {
      new Dialog(this.scene, text, this.data.sound)
    }
  }

  react(frame) {
    this.sprite.setFrame(frame)
    setTimeout(() => {
      this.sprite.setFrame(0)
    }, 2000)
  }
}
