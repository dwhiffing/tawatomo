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

    const x = 100
    const y = height - 250
    this.x = x
    this.y = y
    const rectWidth = width - 200
    const rectHeight = 200
    this.glyphs = []
    this.rect = scene.add.rectangle(x, y, rectWidth, rectHeight, 0x000000)
    this.rect.setOrigin(0, 0)
    this.textObject = scene.add.text(x + 50, y + 60, this.displayString, {
      fontFamily: 'Arial',
      fontSize: 64,
      align: 'center',
    })
    this.updateText = this.updateText.bind(this)
    this.updateText()
    this.rect.setInteractive()
    this.rect.on('pointerdown', (pointer, localX, localY, event) => {
      event.stopPropagation()

      if (this.cursor === this.text.split(' ').length - 1) {
        this.rect.destroy()
        this.textObject.destroy()
        this.glyphs.forEach(g => g.destroy())
        if (callback) {
          new Prompt(this.scene, () => {
            this.scene.data.values.talking = false
            callback()
          })
        } else {
          this.scene.data.values.talking = false
        }
      }
    })
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
          this.x + this.cursor * 100,
          this.y,
          'glyph',
        )
        glyph.setFrame(WORDS.indexOf(nextText))
        glyph.setOrigin(0, 0)
        this.glyphs.push(glyph)
      }
    }
    if (wordArray[this.cursor + 1]) {
      this.cursor += 1
      setTimeout(this.updateText, 100)
    }
  }
}
