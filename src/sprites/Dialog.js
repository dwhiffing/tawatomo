import Prompt from './Prompt'
import { WORDS, IS_ENGLISH } from '..'

export default class Dialog {
  constructor(scene, text, sound = 'dialog', callback) {
    this.scene = scene
    this.text = text
    this.displayString = ''
    this.cursor = 0
    const width = scene.game.config.width
    const height = scene.game.config.height
    this.scene.data.values.talking = true
    this.dialogSound = this.scene.sound.add(sound)

    const x = 340
    const y = height - 250
    this.x = x
    this.y = y
    this.glyphs = []
    this.shadow = scene.add.sprite(0, height, 'shadow')
    this.shadow.setOrigin(0, 0)
    this.rect = scene.add.sprite(x, height, 'character-bg')
    this.rect.setOrigin(0, 0)
    this.textObject = scene.add.text(x + 50, y + 60, this.displayString, {
      fontFamily: 'Arial',
      fontSize: 64,
      align: 'center',
    })
    this.updateText = this.updateText.bind(this)
    this.rect.setInteractive()
    this.rect.on('pointerdown', (pointer, localX, localY, event) => {
      event.stopPropagation()

      if (this.cursor === this.text.split(' ').length - 1) {
        this.destroy()
        if (callback) {
          new Prompt(this.scene, response => {
            this.scene.data.values.talking = false
            response = response.replace(' !', '')
            callback(response)
          })
        } else {
          this.scene.data.values.talking = false
        }
      }
    })

    this.scene.tweens.add({
      targets: [this.rect],
      y: y,
      duration: 500,
      ease: 'Power2',
    })

    this.scene.tweens.add({
      targets: [this.shadow],
      y: y - 100,
      duration: 500,
      ease: 'Power2',
    })
    setTimeout(this.updateText, 500)
  }

  updateText() {
    const wordArray = this.text.split(' ')
    const nextText = wordArray[this.cursor]

    if (nextText) {
      this.displayString += ` ${nextText}`
      this.dialogSound.play()
      if (IS_ENGLISH) {
        this.textObject.setText(this.displayString)
      } else {
        const glyph = this.scene.add.sprite(
          this.x + this.cursor * 100 + 30,
          this.y + 30,
          'glyph',
        )
        glyph.setFrame(WORDS.indexOf(nextText))
        glyph.setOrigin(0, 0)
        glyph.setScale(0.5)
        this.glyphs.push(glyph)
      }
    }
    if (wordArray[this.cursor + 1]) {
      this.cursor += 1
      setTimeout(this.updateText, 180)
    }
  }

  destroy() {
    const height = this.scene.game.config.height
    this.scene.tweens.add({
      targets: [this.rect],
      y: height,
      duration: 250,
      ease: 'Power2',
    })

    this.scene.tweens.add({
      targets: [this.shadow],
      y: height,
      duration: 250,
      ease: 'Power2',
    })

    this.glyphs.forEach(g => g.destroy())

    setTimeout(() => {
      this.rect.destroy()
      this.textObject.destroy()
      this.shadow.destroy()
    }, 250)
  }
}
