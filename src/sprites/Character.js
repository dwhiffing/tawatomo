import Dialog from './Dialog'

export default class Character {
  constructor(scene, x, y, image, data) {
    this.scene = scene
    this.data = data
    this.sprite = this.scene.add.image(x, y, image)
    this.sprite.setInteractive()
    this.sprite.setOrigin(0.5, 1)
    this.angrySound = this.scene.sound.add('angry')
    this.happySound = this.scene.sound.add('good')
    this.confusedSound = this.scene.sound.add('bad')

    this.sprite.on('pointerdown', (pointer, localX, localY, event) => {
      event.stopPropagation()
      if (!this.scene.data.values.talking && data.text) {
        this.respond(data.text, true)
      }
    })
  }

  respond(text, shouldPrompt, react = 1) {
    if (typeof text === 'function') {
      text = text()
    }
    if (Array.isArray(text)) {
      react = text[1]
      text = text[0]
    }
    this.react(react)
    if (shouldPrompt) {
      new Dialog(this.scene, text, this.data.sound, response => {
        if (!response) {
          return
        }

        let nextThingToSay = this.data.responses[response]
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
    this.scene.tweens.add({
      targets: this.sprite,
      scale: this.sprite.scale * 1.04,
      duration: 150,
      yoyo: true,
      repeat: 1,
      easing: 'BounceInOut',
    })
    if (frame === 1) {
      this.happySound.play()
    }
    if (frame === 2) {
      this.angrySound.play()
    }
    if (frame === 3) {
      this.confusedSound.play()
    }
    this.sprite.setFrame(frame)
    setTimeout(() => {
      this.sprite.setFrame(0)
    }, 2000)
  }
}
