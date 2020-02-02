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
    this.width = scene.game.config.width
    const height = scene.game.config.height
    this.height = height

    const x = 261
    const y = height - 450
    this.x = x
    this.y = y
    this.shadow = scene.add.sprite(0, height + 500, 'shadow')
    this.shadow.setOrigin(0, 0)
    this.rect = scene.add.sprite(x, height + 200, 'keyboard-bg')
    this.rect.setOrigin(0, 0)
    this.rect2 = scene.add.sprite(x + 38, height + 200, 'keyboard-input')
    this.rect2.setOrigin(0, 0)
    this.textObjects = []
    this.callback = callback
    responseGlyphs = []

    disableSound = this.scene.sound.add('disable')
    submitSound = this.scene.sound.add('submitSound')
    typeSound = this.scene.sound.add('typeSound')

    displayText = scene.add.text(x, y - 100, '', {
      fontFamily: 'Arial',
      fontSize: 60,
      color: 'black',
    })

    this.destroy = this.destroy.bind(this)
    this.drawKeyboard = this.drawKeyboard.bind(this)
    setTimeout(this.drawKeyboard, 500)

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

    this.scene.tweens.add({
      targets: [this.rect2],
      y: y - 140,
      duration: 500,
      ease: 'Power2',
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

    if (!IS_ENGLISH) {
      responseGlyphs.forEach(r => r.destroy())
    }
    this.destroy()
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
      targets: [this.rect2],
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

    this.scene.tweens.add({
      targets: this.textObjects.concat([this.backButton, this.submitButton]),
      alpha: 0,
      duration: 250,
      ease: 'Power2',
    })

    setTimeout(() => {
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
    }, 250)
  }

  drawKeyboard() {
    const { x, y, width, height } = this
    WORDS.forEach((word, index) => {
      let text
      if (IS_ENGLISH) {
        text = this.scene.add.text(
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
        text = this.scene.add.sprite(
          x + X_ITEM_BUFFER * (index % NUM_PER_ROW) + PADDING + 170,
          y + Math.floor(index / NUM_PER_ROW) * Y_ITEM_BUFFER,
          'glyph',
        )
        text.setFrame(WORDS.indexOf(word))
        text.setAlpha(0)
        text.setOrigin(0, 0)
        text.setScale(0.6)
        text.word = word
        this.scene.tweens.add({
          targets: text,
          alpha: 1,
          duration: 100,
          delay: index * 20,
        })
      }
      this.textObjects[index] = text
      text.setInteractive()
      text.on('pointerdown', function(pointer, localX, localY, event) {
        // event.stopPropagation()
        if (text.alpha === 0.5 || responseGlyphs.length === 3) {
          disableSound.play()
          return
        }
        typeSound.play()
        if (IS_ENGLISH) {
          responseGlyphs.push(this._text)
          displayText.setText(responseGlyphs.join(' '))
        } else {
          const responseGlyph = this.scene.add.sprite(
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

    this.submitButton = this.scene.add
      .sprite(width - 370, y + 210, 'glyph')
      .setFrame(21)
      .setAlpha(0)
      .setInteractive()
      .on('pointerdown', (p, lx, ly, event) => {
        // event.stopPropagation()
        this.submit()
      })

    this.backButton = this.scene.add
      .sprite(370, y + 210, 'glyph')
      .setAlpha(0)
      .setFrame(22)
      .setInteractive()
      .on('pointerdown', (p, lx, ly, event) => {
        // event.stopPropagation()
        this.back()
      })

    this.scene.tweens.add({
      targets: [this.submitButton, this.backButton],
      alpha: 1,
      duration: 100,
      delay: 300,
    })
  }
}
