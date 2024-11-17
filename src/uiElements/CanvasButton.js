import { UISprites } from '../globals/Images.js'

export default class GiftButton {
  constructor (config) {
    Object.assign(this, config)

    this.rect = {
      top: this.container.top + this.container.height - 2 * this.height - 20,
      left: this.container.left + this.container.width - 2 * this.width - 20,
      width: 2 * this.width,
      height: 2 * this.height
    }
  }

  draw () {
    this.scene.game.ctx.drawImage(
      this.scene.imageManager.getImageWithSrc(UISprites),
      this.sourceX,
      this.sourceY,
      this.width,
      this.height,
      this.rect.left,
      this.rect.top,
      this.rect.width,
      this.rect.height
    )
  }

  checkClicked (x, y) {
    return (x >= this.rect.left &&
      x <= this.rect.left + this.rect.width &&
      y >= this.rect.top &&
      y <= this.rect.top + this.rect.height)
  }

  activate () {
    // Override this method in subclasses
  }
}