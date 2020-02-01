import { WORDS, IS_ENGLISH } from '../index'

const NUM_PER_ROW = 6
const X_ITEM_BUFFER = 125
const Y_ITEM_BUFFER = 70
const PADDING = 20
let displayText
let responseGlyphs

export default class Prompt {
  constructor(scene, callback = () => {}) {
    this.scene = scene
    this.cursor = 0
    const width = scene.game.config.width
    const height = scene.game.config.height

    const x = 275
    const y = height - 350
    const rectWidth = width - 550
    const rectHeight = 300
    this.rect = scene.add.rectangle(x, y, rectWidth, rectHeight, 0x000000)
    this.rect.setOrigin(0, 0)
    this.textObjects = []
    this.callback = callback
    responseGlyphs = []
    let numWords = 0

    this.submitButton = scene.add
      .text(x + 670, y + 300, 'O', {
        fontFamily: 'Arial',
        fontSize: 20,
      })
      .setInteractive()
      .on('pointerdown', (p, lx, ly, event) => {
        event.stopPropagation()
        this.submit()
      })

    this.backButton = scene.add
      .text(300, y + 300, 'X', {
        fontFamily: 'Arial',
        fontSize: 20,
      })
      .setInteractive()
      .on('pointerdown', (p, lx, ly, event) => {
        event.stopPropagation()
        this.back()
      })

    displayText = scene.add.text(x, y - 100, '', {
      fontFamily: 'Arial',
      fontSize: 60,
      color: 'black',
    })

    this.destroy = this.destroy.bind(this)

    WORDS.forEach((word, index) => {
      let text
      if (IS_ENGLISH) {
        text = scene.add.text(
          x + X_ITEM_BUFFER * (index % NUM_PER_ROW) + PADDING,
          y + Math.floor(index / NUM_PER_ROW) * Y_ITEM_BUFFER + PADDING,
          word,
          {
            fontFamily: 'Arial',
            fontSize: 30,
            fixedWidth: X_ITEM_BUFFER,
            fixedHeight: 30,
          },
        )
      } else {
        text = scene.add.sprite(
          x + X_ITEM_BUFFER * (index % NUM_PER_ROW) + PADDING,
          y + Math.floor(index / NUM_PER_ROW) * Y_ITEM_BUFFER,
          'glyph',
        )
        text.setFrame(WORDS.indexOf(word))
        text.setOrigin(0, 0)
        text.setScale(0.7)
        text.word = word
      }
      this.textObjects[index] = text
      text.setInteractive()
      text.on('pointerdown', function(pointer, localX, localY, event) {
        event.stopPropagation()
        if (responseGlyphs.length === 3) {
          return
        }
        if (IS_ENGLISH) {
          responseGlyphs.push(this._text)
          displayText.setText(responseGlyphs.join(' '))
        } else {
          const responseGlyph = scene.add.sprite(
            x + X_ITEM_BUFFER * responseGlyphs.length + 200,
            y - 100,
            'glyph-dark',
          )
          responseGlyph.setFrame(WORDS.indexOf(this.word))
          responseGlyph.word = this.word
          responseGlyph.setOrigin(0, 0)
          responseGlyphs.push(responseGlyph)
        }
      })
    })
  }

  back() {
    if (responseGlyphs.length === 0) {
      this.submit()
      return
    }
    let thing = responseGlyphs.pop()
    if (IS_ENGLISH) {
      displayText.setText(responseGlyphs.join(' '))
    } else {
      thing.destroy()
    }
  }

  submit() {
    if (IS_ENGLISH) {
      this.callback(displayText.text.trim())
    } else {
      this.callback(responseGlyphs.map(r => r.word).join(' '))
    }
    if (!IS_ENGLISH) {
      responseGlyphs.forEach(r => r.destroy())
    }
    this.destroy()
  }

  destroy() {
    this.textObjects
      .concat([this.rect, displayText, this.backButton, this.submitButton])
      .forEach(text => {
        text.destroy()
      })
  }
}
