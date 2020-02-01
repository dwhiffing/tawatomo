export default class Background {
  constructor(scene, image) {
    this.scene = scene
    this.sprite = this.scene.add.image(0, 0, image)
    this.sprite.setDisplaySize(
      this.scene.game.config.width,
      this.sprite.height * (this.scene.game.config.width / this.sprite.width),
    )
    this.sprite.y =
      (this.scene.game.config.height - this.sprite.displayHeight) / 2
    this.sprite.setOrigin(0, 0)
  }
}
