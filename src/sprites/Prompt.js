import { WORDS, IS_ENGLISH } from '../index'

const NUM_PER_ROW = 7
const X_ITEM_BUFFER = 145
const Y_ITEM_BUFFER = 145
const PADDING = 20
let displayText
let responseGlyphs
let disableSound, submitSound, typeSound

export default class Prompt {
  constructor(scene, callback = () => {}) {
    this.scene = scene
    this.cursor = 0
    const width = scene.game.config.width
    const height = scene.game.config.height

    const x = 261
    const y = height - 450
    this.rect = scene.add.sprite(x, y, 'keyboard-bg')
    this.rect.setOrigin(0, 0)
    this.shadow = scene.add.sprite(0, y - 180, 'shadow')
    this.shadow.setOrigin(0, 0)
    this.rect2 = scene.add.sprite(x + 38, y - 140, 'keyboard-input')
    this.rect2.setOrigin(0, 0)
    this.textObjects = []
    this.callback = callback
    responseGlyphs = []

    disableSound = this.scene.sound.add('disable')
    submitSound = this.scene.sound.add('submitSound')
    typeSound = this.scene.sound.add('typeSound')

    this.submitButton = scene.add
      .sprite(width - 370, y + 210, 'glyph')
      .setFrame(21)
      .setInteractive()
      .on('pointerdown', (p, lx, ly, event) => {
        event.stopPropagation()
        this.submit()
      })

    this.backButton = scene.add
      .sprite(370, y + 210, 'glyph')
      .setFrame(22)
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
          x + X_ITEM_BUFFER * (index % NUM_PER_ROW) + PADDING + 170,
          y + Math.floor(index / NUM_PER_ROW) * Y_ITEM_BUFFER,
          'glyph',
        )
        text.setFrame(WORDS.indexOf(word))
        text.setOrigin(0, 0)
        text.setScale(0.6)
        text.word = word
      }
      this.textObjects[index] = text
      text.setInteractive()
      text.on('pointerdown', function(pointer, localX, localY, event) {
        event.stopPropagation()
        if (text.alpha === 0.5 || responseGlyphs.length === 3) {
          disableSound.play()
          return
        }
        typeSound.play()
        if (IS_ENGLISH) {
          responseGlyphs.push(this._text)
          displayText.setText(responseGlyphs.join(' '))
        } else {
          const responseGlyph = scene.add.sprite(
            x + (X_ITEM_BUFFER - 20) * responseGlyphs.length + 115,
            y - 130,
            'glyph',
          )
          text.setAlpha(0.5)
          responseGlyph.setFrame(WORDS.indexOf(this.word))
          responseGlyph.setScale(0.6)
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
    disableSound.play()
    let thing = responseGlyphs.pop()
    const text = this.textObjects.find(t => t.word === thing.word)
    text.setAlpha(1)
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
    submitSound.play()
    if (!IS_ENGLISH) {
      responseGlyphs.forEach(r => r.destroy())
    }
    this.destroy()
  }

  destroy() {
    this.textObjects
      .concat([
        this.rect,
        this.rect2,
        this.shadow,
        displayText,
        this.backButton,
        this.submitButton,
      ])
      .forEach(text => {
        text.destroy()
      })
  }
}
