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
    responseGlyphs = []
    let numWords = 0

    displayText = scene.add.text(x, y - 100, '', {
      fontFamily: 'Arial',
      fontSize: 60,
      color: 'black',
    })

    const destroy = this.destroy.bind(this)
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
            fixedHeight: 100,
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
        if (IS_ENGLISH) {
          displayText.setText(displayText.text + this._text + ' ')
        } else {
          const responseGlyph = scene.add.sprite(
            x + X_ITEM_BUFFER * numWords + 200,
            y - 100,
            'glyph-dark',
          )
          responseGlyph.setFrame(WORDS.indexOf(this.word))
          responseGlyph.setOrigin(0, 0)
          responseGlyphs[numWords] = responseGlyph
        }
        numWords++
        if (numWords === 3) {
          setTimeout(() => {
            callback(displayText.text.trim())
            responseGlyphs.forEach(r => r.destroy())
            destroy()
          }, 500)
        }
      })
    })
  }

  destroy() {
    this.textObjects.concat([this.rect, displayText]).forEach(text => {
      text.destroy()
    })
  }
}
