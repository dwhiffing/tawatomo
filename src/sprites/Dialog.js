import Prompt from './Prompt'

export default class Dialog {
  constructor(scene, text) {
    this.scene = scene
    this.text = text
    this.displayString = ''
    this.cursor = 0
    const width = scene.game.config.width
    const height = scene.game.config.height
    this.scene.data.values.talking = true

    const x = 100
    const y = height - 250
    const rectWidth = width - 200
    const rectHeight = 200
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
        this.rect.setActive(false)
        this.rect.setVisible(false)
        this.textObject.setActive(false)
        this.textObject.setVisible(false)
        new Prompt(this.scene)
      }
    })
  }

  updateText() {
    const wordArray = this.text.split(' ')
    const nextText = wordArray[this.cursor]
    if (nextText) {
      this.displayString += ` ${nextText}`
      this.textObject.setText(this.displayString)
    }
    if (wordArray[this.cursor + 1]) {
      this.cursor += 1
      setTimeout(this.updateText, 100)
    } else {
      setTimeout(() => {
        this.scene.data.values.talking = false
      }, 100)
    }
  }
}
