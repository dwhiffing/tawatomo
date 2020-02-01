const WORDS = [
  'ME',
  'YOU',
  'YES',
  'NO',
  'GIVE',
  'TAKE',
  'TINY',
  'BIG',
  'FOOD',
  'SHINY',
  'KID',
  'ROPE',
]

const NUM_PER_ROW = 4
const X_ITEM_BUFFER = 125
const Y_ITEM_BUFFER = 60
const PADDING = 20
let displayText

export default class Prompt {
  constructor(scene) {
    this.scene = scene
    this.cursor = 0
    const width = scene.game.config.width
    const height = scene.game.config.height
    this.scene.data.values.talking = true

    const x = 400
    const y = height - 250
    const rectWidth = width - 800
    const rectHeight = 200
    this.rect = scene.add.rectangle(x, y, rectWidth, rectHeight, 0x000000)
    this.rect.setOrigin(0, 0)
    this.textObjects = []
    let numWords = 0
    displayText = scene.add.text(x, y - 100, '', {
      fontFamily: 'Arial',
      fontSize: 60,
      color: 'black',
    })
    const destroy = this.destroy.bind(this)
    WORDS.forEach((word, index) => {
      const text = scene.add.text(
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
      this.textObjects[index] = text
      text.setInteractive()
      text.on('pointerdown', function(pointer, localX, localY, event) {
        event.stopPropagation()
        numWords++
        displayText.setText(displayText.text + this._text + ' ')
        if (numWords === 3) {
          setTimeout(() => {
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
